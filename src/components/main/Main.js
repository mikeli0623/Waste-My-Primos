import "../../css/main.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropdownBanner from "./DropdownBanner";
import MainBanner from "./MainBanner";
import MiniBanners from "./MiniBanners";
import WishButtons from "./WishButtons";
import CloseButton from "../CloseButton";
import WishModal from "./WishModal";
import WishSingle from "./WishSingle";
import Checkbox from "../Checkbox";
import Stats from "./Stats";
import { CalcWish } from "../../classes/CalcWish";
import { allBanners } from "../../classes/Banner";
import WishVideo from "./WishVideo";
import History from "../../classes/History";
import Button from "../Button";

const bodyStyle = {
  background:
    "url(../assets/img/misc/background.webp) no-repeat center center fixed",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  height: "100vh",
  width: "100vw",
};

const Main = () => {
  Object.assign(document.body.style, bodyStyle);
  let nav = document.querySelector(".navbar");
  let footer = document.querySelector("#footer");
  if (nav) nav.style.visibility = "visible";
  if (footer) footer.style.visibility = "visible";

  const [state, setState] = useState({
    isModalOpen: false,
    wishes: 0,
    primos: parseInt(sessionStorage.getItem("primos")) || 0,
    currentWish: [],
    animating: false,
    skipVideo: sessionStorage.getItem("skipVideo") === "true",
    skipSingle: sessionStorage.getItem("skipSingle") === "true",
  });

  const [hasFive, setHasFive] = useState(false);
  const [hasFour, setHasFour] = useState(false);

  const [currentBannerIndex, setCurrentBannerIndex] = useState(
    parseInt(sessionStorage.getItem("bannerIndex")) || 0
  );

  const [activeBanners, setActiveBanners] = useState([
    "ganyu",
    "ganyu_ei",
    "standard",
  ]);

  const [prevBanner, setPrevBanner] = useState(undefined);

  const [bannerContent, setBannerContent] = useState([
    {
      banner: allBanners[0],
      rateFive: 0.006,
      rateFour: 0.051,
      guaranteeFive: sessionStorage.getItem("charGuaranteeFive") === "true",
      guaranteeFour: sessionStorage.getItem("charGuaranteeFour") === "true",
      pityFive: parseInt(sessionStorage.getItem("charPityFive")) || 0,
      pityFour: parseInt(sessionStorage.getItem("charPityFour")) || 0,
    },
    {
      banner: allBanners[6],
      rateFive: 0.007,
      rateFour: 0.06,
      guaranteeFive: sessionStorage.getItem("weaponGuaranteeFive") === "true",
      guaranteeFour: sessionStorage.getItem("weaponGuaranteeFour") === "true",
      pityFive: parseInt(sessionStorage.getItem("weaponPityFive")) || 0,
      pityFour: parseInt(sessionStorage.getItem("weaponPityFour")) || 0,
    },
    {
      banner: allBanners[allBanners.length - 1],
      rateFive: 0.006,
      rateFour: 0.051,
      guaranteeFive: sessionStorage.getItem("standardGuaranteeFive") === "true",
      guaranteeFour: sessionStorage.getItem("standardGuaranteeFour") === "true",
      pityFive: parseInt(sessionStorage.getItem("standardPityFive")) || 0,
      pityFour: parseInt(sessionStorage.getItem("standardPityFour")) || 0,
    },
  ]);

  const [history, setHistory] = useState([
    JSON.parse(sessionStorage.getItem("charHistory")) || [],
    JSON.parse(sessionStorage.getItem("weaponHistory")) || [],
    JSON.parse(sessionStorage.getItem("standardHistory")) || [],
  ]);

  const [direction, setDirection] = useState("right");

  const [content, setContent] = useState("main");

  const sessionStore = (suffix, value) => {
    switch (currentBannerIndex) {
      case 0:
        sessionStorage.setItem("char" + suffix, value);
        break;
      case 1:
        sessionStorage.setItem("weapon" + suffix, value);
        break;
      default:
        sessionStorage.setItem("standard" + suffix, value);
        break;
    }
  };

  const lockables = (wishResults) => {
    let unlocked = JSON.parse(sessionStorage.getItem("unlocked")) || [];
    wishResults.map((item) => {
      if (!unlocked.includes(item)) unlocked.push(item);
      return item;
    });
    sessionStorage.setItem("unlocked", JSON.stringify(unlocked));
  };

  const handleWish = (wishes) => {
    if (!state.skipVideo) setContent("video");
    else if (state.skipVideo && state.skipSingle) setContent("main");
    else setContent("single");
    let wishResults = [];
    const currentBanner = activeBanners[currentBannerIndex];
    setHasFive(false);
    setHasFour(false);
    for (let i = 0; i < wishes; i++)
      wishResults.push(
        CalcWish(currentBanner, bannerContent, setHasFive, setHasFour)
      );
    lockables(wishResults);
    sessionStorage.setItem("primos", state.primos + wishes * 160);
    sessionStore("PityFive", bannerContent[currentBannerIndex].pityFive);
    sessionStore("PityFour", bannerContent[currentBannerIndex].pityFour);
    sessionStore(
      "GuaranteeFive",
      bannerContent[currentBannerIndex].guaranteeFive
    );
    sessionStore(
      "GuaranteeFour",
      bannerContent[currentBannerIndex].guaranteeFour
    );
    let historyClone = [...history];
    historyClone[currentBannerIndex] = historyClone[currentBannerIndex].concat(
      new History(wishResults).getHistory()
    );
    sessionStore("History", JSON.stringify(historyClone[currentBannerIndex]));
    setHistory([...historyClone]);
    setState({
      ...state,
      isModalOpen: true,
      wishes: wishes,
      primos: state.primos + wishes * 160,
      currentWish: wishResults,
    });
  };

  const setActiveBanner = (index) => {
    if (state.animating) return;
    let edgeBanner =
      (currentBannerIndex === 0 && index === activeBanners.length - 1) ||
      (currentBannerIndex === activeBanners.length - 1 && index === 0)
        ? true
        : false;
    if (currentBannerIndex - index < 0) {
      if (edgeBanner) setDirection("left");
      else setDirection("right");
    } else {
      if (edgeBanner) setDirection("right");
      else setDirection("left");
    }
    setCurrentBannerIndex(index);
  };

  const toggleModal = () => {
    setState({ ...state, isModalOpen: false });
  };

  const changeBanner = (banner) => {
    if (state.animating) return;
    let bannersClone = [...activeBanners];
    let bannerContentClone = [...bannerContent];
    bannersClone[0] = banner;
    bannersClone[1] = banner + "_ei";
    allBanners.map((item) => {
      if (item.abbr === banner) bannerContentClone[0].banner = item;
      else if (item.abbr === banner + "_ei")
        bannerContentClone[1].banner = item;
      return item;
    });
    setActiveBanners((prevBanners) => {
      setPrevBanner(prevBanners[currentBannerIndex]);
      return bannersClone;
    });
    setBannerContent(bannerContentClone);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const getWidth = (width) =>
    window.innerWidth > 1280 ? width : windowWidth / (1280 / width);
  const getHeight = (height, width) =>
    window.innerWidth > 1280 ? height : (getWidth(width) * height) / width;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resize = {
    windowWidth,
    height: (window.innerHeight / window.innerWidth) * windowWidth,
    getWidth,
    getHeight,
  };

  const handleContent = () => {
    if (content === "main") {
      return (
        <>
          <section id="top-section-main">
            {windowWidth <= 425 ? (
              <></>
            ) : (
              <DropdownBanner
                changeBanner={changeBanner}
                bannersActive={activeBanners}
                animating={state.animating}
                resize={resize}
              />
            )}
            {windowWidth <= 425 ? (
              <div id="top-top-section-main">
                <DropdownBanner
                  changeBanner={changeBanner}
                  bannersActive={activeBanners}
                  animating={state.animating}
                  resize={resize}
                />
                <Stats primos={state.primos} resize={resize} />
              </div>
            ) : (
              <></>
            )}
            <MiniBanners
              bannersActive={activeBanners}
              setActive={setActiveBanner}
              activeIndex={currentBannerIndex}
              changeBanner={changeBanner}
              resize={resize}
            />
            {windowWidth <= 425 ? (
              <></>
            ) : (
              <Stats primos={state.primos} resize={resize} />
            )}
          </section>
          <MainBanner
            props={state}
            setProps={setState}
            banners={activeBanners}
            setActive={setActiveBanner}
            prevBanner={prevBanner}
            activeIndex={currentBannerIndex}
            direction={direction}
            resize={resize}
          />
          <section id="bottom-section-main">
            <div id="bottom-top-section-main">
              <Link
                to={{
                  pathname: "/history",
                  state: {
                    history: history,
                    bannerIndex: currentBannerIndex,
                  },
                }}
                style={{ textDecoration: "none" }}
                onClick={() => {
                  sessionStorage.setItem("bannerIndex", currentBannerIndex);
                  sessionStorage.setItem("skipVideo", state.skipVideo);
                  sessionStorage.setItem("skipSingle", state.skipSingle);
                }}
              >
                <Button context="History" resize={resize} />
              </Link>
              <WishButtons
                onWish={handleWish}
                activeIndex={currentBannerIndex}
                resize={resize}
              />
            </div>
            <div id="checkbox-container">
              <Checkbox
                checked={state.skipVideo}
                id={"skip-video"}
                text={"Skip Video"}
                onChange={() =>
                  setState({ ...state, skipVideo: !state.skipVideo })
                }
                resize={resize}
              />
              <Checkbox
                checked={state.skipSingle}
                id={"skip-single"}
                text={"Skip Single"}
                onChange={() =>
                  setState({ ...state, skipSingle: !state.skipSingle })
                }
                resize={resize}
              />
            </div>
          </section>
        </>
      );
    } else
      return (
        <section>
          <CloseButton
            onClick={() => {
              setState({ ...state, animating: false });
              content === "video"
                ? state.skipSingle
                  ? setContent("main")
                  : setContent("single")
                : setContent("main");
            }}
            type="close"
            style={{
              top: `${getWidth(50)}px`,
              right: `${getWidth(50)}px`,
              position: "absolute",
              zIndex: "1052",
            }}
            resize={resize}
          />
          {content === "video" ? (
            <WishVideo
              src={
                state.currentWish.length > 1
                  ? hasFive
                    ? "/assets/img/misc/5_star.webm"
                    : "/assets/img/misc/4_star.webm"
                  : hasFive
                  ? "/assets/img/misc/5_star_single.webm"
                  : hasFour
                  ? "/assets/img/misc/4_star_single.webm"
                  : "/assets/img/misc/3_star.webm"
              }
              onEnded={() =>
                state.skipSingle ? setContent("main") : setContent("single")
              }
              resize={resize}
            />
          ) : (
            <WishSingle
              currentWish={state.currentWish}
              setContent={setContent}
              resize={resize}
            />
          )}
        </section>
      );
  };

  return (
    <div className="content-section">
      {
        handleContent()
        // <div id="test"></div>
      }
      <WishModal
        props={state}
        toggle={toggleModal}
        isMain={content === "main"}
        skipAll={state.skipVideo && state.skipSingle}
        resize={resize}
      />
    </div>
  );
};

export default Main;

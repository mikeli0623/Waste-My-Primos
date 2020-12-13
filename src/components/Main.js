import React, { useEffect, useState, Suspense, lazy } from "react";
import {
  mainBannerPath,
  multiPath,
  baseThreeStar,
  allMiniBanners,
  allMainBanners,
} from "../classes/Constants";
import NavBar from "./NavBar";
import MiniBanners from "./MiniBanners";
import WishButtons from "./WishButtons";
import WishModal from "./WishModal";
import WishSingle from "./WishSingle";
import Stats from "./Stats";
import Footer from "./Footer";
import History from "../classes/History";
import { allBanners } from "../classes/Banner";
const MainBanner = lazy(() => import("./MainBanner"));

let history = [];

const Main = () => {
  const [state, setState] = useState({
    isModalOpen: false,
    wishes: 0,
    primos: 0,
  });

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const [currentWish, setCurrentWish] = useState([]);

  const [miniBannersActive, setMiniBannersActive] = useState([
    "./img/misc/mini-banners/zhongli.webp",
    "./img/misc/mini-banners/zhongli_ei.webp",
    "./img/misc/mini-banners/standard.webp",
  ]);

  const [mainBannersActive, setMainBanner] = useState([
    "./img/banner/zhongli.webp",
    "./img/banner/zhongli_ei.webp",
    "./img/banner/standard.webp",
  ]);

  const [activeBanners, setActiveBanners] = useState([
    {
      bannerType: "char",
      banner: allBanners[0],
      rateFive: 0.006,
      rateFour: 0.051,
      guaranteeFive: false,
      guaranteeFour: false,
      pityFive: 0,
      pityFour: 0,
    },
    {
      bannerType: "weapon",
      banner: allBanners[1],
      rateFive: 0.007,
      rateFour: 0.06,
      guaranteeFive: false,
      guaranteeFour: false,
      pityFive: 0,
      pityFour: 0,
    },
    {
      bannerType: "standard",
      banner: allBanners[allBanners.length - 1],
      rateFive: 0.006,
      rateFour: 0.051,
      guaranteeFive: false,
      guaranteeFour: false,
      pityFive: 0,
      pityFour: 0,
    },
  ]);

  const [direction, setDirection] = useState("right");

  const [animating, setAnimating] = useState(false);

  const [content, setContent] = useState("main");

  const [currentBannerEventName, setCurrentBannerEventName] = useState(
    "Character Event Wish"
  );

  const [skipVideo, setSkipVideo] = useState(false);
  const [skipSingle, setSkipSingle] = useState(false);

  const itemPath = (items) =>
    multiPath + items[Math.floor(Math.random() * items.length)];

  const calcWish = () => {
    const wishChance = Math.random();
    const rateUp = Math.random() < 0.5 ? true : false;
    const currentBanner = miniBannersActive[currentBannerIndex];
    let wishPath;
    activeBanners.map((banner) => {
      if (currentBanner.includes(banner.banner.name)) {
        // matches banner
        if (wishChance < banner.rateFive || banner.pityFive >= 89) {
          // 5 star
          banner.pityFive = 0;
          banner.pityFour++;
          if (!currentBanner.includes("standard")) {
            // non-standard banner
            if (rateUp || banner.guaranteeFive) {
              // draw from rateUp
              banner.guaranteeFive = false;
              wishPath = itemPath(banner.banner.rateUpFive);
            } else {
              // drawing from normal pile
              wishPath = itemPath(banner.banner.poolFive);
              banner.guaranteeFive = true;
            }
          } else {
            // standard banner
            if (wishChance < banner.rateFive / 2)
              wishPath = itemPath(
                banner.banner.poolFive.filter((item) => item.includes("Char_"))
              );
            else
              wishPath = itemPath(
                banner.banner.poolFive.filter((item) =>
                  item.includes("Weapon_")
                )
              );
          }
        } else if (wishChance < banner.rateFour || banner.pityFour >= 9) {
          // 4 star
          banner.pityFour = 0;
          banner.pityFive++;
          if (!currentBanner.includes("standard")) {
            // not standard banner
            if (rateUp || banner.guaranteeFour) {
              // draw from rateUp
              banner.guaranteeFour = false;
              wishPath = itemPath(banner.banner.rateUpFour);
            } else {
              // draw from non rate up
              banner.guaranteeFour = true;
              if (wishChance < banner.rateFour / 2)
                wishPath = itemPath(
                  banner.banner.poolFour.filter((item) =>
                    item.includes("Char_")
                  )
                );
              else
                wishPath = itemPath(
                  banner.banner.poolFour.filter((item) =>
                    item.includes("Weapon_")
                  )
                );
            }
          } else {
            // standard banner
            if (wishChance < banner.rateFour / 2)
              wishPath = itemPath(
                banner.banner.poolFour.filter((item) => item.includes("Char_"))
              );
            else
              wishPath = itemPath(
                banner.banner.poolFour.filter((item) =>
                  item.includes("Weapon_")
                )
              );
          }
        } else {
          // 3 stars
          banner.pityFive++;
          banner.pityFour++;
          wishPath = itemPath(baseThreeStar);
        }
      }
      return banner;
    });
    handleHistory(wishPath);
    return wishPath;
  };

  const handleWish = (wishes) => {
    if (!skipVideo) setContent("video");
    else if (skipVideo && skipSingle) setContent("main");
    else setContent("single");
    let wishResults = [];
    for (let i = 0; i < wishes; i++) {
      wishResults.push(calcWish());
    }
    setCurrentWish(wishResults);
    setState({
      ...state,
      isModalOpen: true,
      wishes: wishes,
      primos: state.primos + wishes * 160,
    });
  };

  const handleHistory = (path) => {
    const split = path.split("/")[path.split("/").length - 1].split("_");
    const type = split[0];
    let item = "";
    for (let i = 1; i < split.length - 1; i++) {
      item += split[i];
      if (i < split.length - 2) item += " ";
    }
    const stars = split[split.length - 1].slice(0, 1);
    history.push(new History(item, type, stars, new Date()));
  };

  const setActiveBanner = (index) => {
    if (animating) return;
    let edgeBanner =
      (currentBannerIndex === 0 && index === mainBannersActive.length - 1) ||
      (currentBannerIndex === mainBannersActive.length - 1 && index === 0)
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

  const convertedIndex = (array1, array2, index) => {
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] === array2[index]) return i;
    }
  };

  const changeBanner = (banner, index) => {
    let miniBannersClone = miniBannersActive;
    let mainBannersClone = mainBannersActive;
    let currentBannersClone = activeBanners;
    let nextBannerName = banner.split("/").pop().slice(0, -5);
    const newIndex = convertedIndex(mainBannersActive, allMainBanners, index);
    miniBannersClone[newIndex] = banner;
    mainBannersClone[newIndex] = mainBannerPath + banner.split("/").pop();
    if (currentBannersClone[newIndex].banner.name !== nextBannerName) {
      allBanners.map((item) => {
        if (item.name === nextBannerName)
          currentBannersClone[newIndex].banner = item;
        return item;
      });
    }
    setMiniBannersActive([...miniBannersClone]);
    setMainBanner([...mainBannersClone]);
    setActiveBanners([...currentBannersClone]);
  };

  useEffect(() => {
    if (currentBannerIndex === 0) {
      setCurrentBannerEventName("Character Event Wish");
    } else if (currentBannerIndex === 1) {
      setCurrentBannerEventName("Weapon Event Wish");
    } else {
      setCurrentBannerEventName("Standard Wish");
    }
  }, [currentBannerIndex]);

  const handleContent = () => {
    if (content === "main") {
      return (
        <>
          <NavBar />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h4
              style={{
                position: "absolute",
                marginRight: "70%",
              }}
            >
              {currentBannerEventName}
            </h4>
            <MiniBanners
              activeMinis={miniBannersActive}
              setActive={setActiveBanner}
              activeIndex={currentBannerIndex}
              allMinis={allMiniBanners}
              changeBanner={changeBanner}
              convertedIndex={convertedIndex}
            />
            <Stats
              currentBanner={activeBanners[currentBannerIndex]}
              primos={state.primos}
            />
          </div>
          <Suspense
            fallback={
              <div
                style={{
                  height: "570px",
                }}
              />
            }
          >
            <MainBanner
              setActive={setActiveBanner}
              activeIndex={currentBannerIndex}
              activeMain={mainBannersActive}
              mainBanners={mainBannersActive}
              allMain={allMainBanners}
              direction={direction}
              convertedIndex={convertedIndex}
              animating={animating}
              setAnimating={setAnimating}
            />
          </Suspense>
          <WishButtons onWish={handleWish} activeIndex={currentBannerIndex} />
          <section id="checkbox-container">
            <div className="checkbox">
              <input
                type="checkbox"
                id="skip-video"
                name="skip-video"
                checked={skipVideo}
                onChange={() => setSkipVideo(!skipVideo)}
              />
              <label htmlFor="skip-video" style={{ margin: "0.4rem" }}>
                Skip Video
              </label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="skip-single"
                name="skip-single"
                checked={skipSingle}
                onChange={() => setSkipSingle(!skipSingle)}
              />
              <label htmlFor="skip-single" style={{ margin: "0.4rem" }}>
                Skip Single Items
              </label>
            </div>
          </section>
          <WishModal
            images={currentWish}
            modal={state.isModalOpen}
            toggle={toggleModal}
            wishes={state.wishes}
          />
          <Footer />
        </>
      );
    } else
      return (
        <>
          <input
            className="skip-button"
            type="image"
            src="./img/misc/close.png"
            alt="skip"
            onClick={() => {
              content === "video"
                ? skipSingle
                  ? setContent("main")
                  : setContent("single")
                : setContent("main");
            }}
          />
          {content === "video" ? (
            <div
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                zIndex: "0",
                backgroundColor: "white",
              }}
            >
              <video
                id="wish-video"
                autoPlay
                onEnded={() =>
                  skipSingle ? setContent("main") : setContent("single")
                }
              >
                <source src="/img/misc/5_star.mp4" type="video/mp4" />
              </video>
            </div>
          ) : (
            <WishSingle currentWish={currentWish} setContent={setContent} />
          )}
        </>
      );
  };

  return <div className="App">{handleContent()}</div>;
};

export default Main;

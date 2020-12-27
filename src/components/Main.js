import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import DropdownBanner from "./DropdownBanner";
import MainBanner from "./MainBanner";
import MiniBanners from "./MiniBanners";
import WishButtons from "./WishButtons";
import WishModal from "./WishModal";
import WishSingle from "./WishSingle";
import SkipCheckboxes from "./SkipCheckboxes";
import Stats from "./Stats";
import Footer from "./Footer";
import { allBanners } from "../classes/Banner";
import { CalcWish } from "../classes/Constants";

const Main = () => {
  const [state, setState] = useState({
    isModalOpen: false,
    wishes: 0,
    primos: 0,
  });

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const [currentWish, setCurrentWish] = useState([]);

  const [activeBannersAbbr, setActiveBannersAbbr] = useState([
    "albedo",
    "albedo_ei",
    "standard",
  ]);

  const [activeBanners, setActiveBanners] = useState([
    {
      banner: allBanners[0],
      rateFive: 0.006,
      rateFour: 0.051,
      guaranteeFive: false,
      guaranteeFour: false,
      pityFive: 0,
      pityFour: 0,
    },
    {
      banner: allBanners[5],
      rateFive: 0.007,
      rateFour: 0.06,
      guaranteeFive: false,
      guaranteeFour: false,
      pityFive: 0,
      pityFour: 0,
    },
    {
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

  const [skipVideo, setSkipVideo] = useState(false);
  const [skipSingle, setSkipSingle] = useState(false);

  const [hasFive, setHasFive] = useState(false);
  const [hasFour, setHasFour] = useState(false);

  const [currentBanner, setCurrentBanner] = useState(
    activeBannersAbbr[currentBannerIndex]
  );
  const [prevBanner, setPrevBanner] = useState(undefined);

  const handleWish = (wishes) => {
    if (!skipVideo) setContent("video");
    else if (skipVideo && skipSingle) setContent("main");
    else setContent("single");
    let wishResults = [];
    setHasFive(false);
    setHasFour(false);
    for (let i = 0; i < wishes; i++)
      wishResults.push(
        CalcWish(currentBanner, activeBanners, setHasFive, setHasFour)
      );
    setCurrentWish(wishResults);
    setState({
      ...state,
      isModalOpen: true,
      wishes: wishes,
      primos: state.primos + wishes * 160,
    });
  };

  const setActiveBanner = (index) => {
    if (animating) return;
    let edgeBanner =
      (currentBannerIndex === 0 && index === activeBannersAbbr.length - 1) ||
      (currentBannerIndex === activeBannersAbbr.length - 1 && index === 0)
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
    let bannersClone = activeBannersAbbr;
    let activeBannersClone = activeBanners;
    bannersClone[0] = banner;
    bannersClone[1] = banner + "_ei";
    allBanners.map((item) => {
      if (item.abbr === banner) activeBannersClone[0].banner = item;
      else if (item.abbr === banner + "_ei")
        activeBannersClone[1].banner = item;
      return item;
    });
    setActiveBannersAbbr(bannersClone);
    setActiveBanners([...activeBannersClone]);
    setCurrentBanner((previousBanner) => setPrevBanner(previousBanner));
    setCurrentBanner(activeBannersAbbr[currentBannerIndex]);
  };

  useEffect(() => {
    setCurrentBanner((prevBanner) => setPrevBanner(prevBanner));
    setCurrentBanner(activeBannersAbbr[currentBannerIndex]);
  }, [activeBannersAbbr, currentBannerIndex]);

  const handleContent = () => {
    if (content === "main") {
      return (
        <>
          <NavBar />
          <section id="top-section">
            <DropdownBanner
              changeBanner={changeBanner}
              bannersActive={activeBannersAbbr}
            />
            <MiniBanners
              bannersActive={activeBannersAbbr}
              setActive={setActiveBanner}
              activeIndex={currentBannerIndex}
              changeBanner={changeBanner}
            />
            <Stats primos={state.primos} />
          </section>
          <MainBanner
            setActive={setActiveBanner}
            activeIndex={currentBannerIndex}
            banners={activeBannersAbbr}
            direction={direction}
            animating={animating}
            setAnimating={setAnimating}
            prevBanner={prevBanner}
          />
          <section>
            <WishButtons onWish={handleWish} activeIndex={currentBannerIndex} />
            <SkipCheckboxes
              skipVideo={skipVideo}
              setSkipVideo={setSkipVideo}
              skipSingle={skipSingle}
              setSkipSingle={setSkipSingle}
            />
          </section>
          <Footer />
        </>
      );
    } else
      return (
        <>
          <div id="skip-button">
            <div
              id="skip-button-crosses"
              style={{
                backgroundImage: "url(./assets/img/misc/close.png)",
              }}
              onClick={() => {
                setAnimating(false);
                content === "video"
                  ? skipSingle
                    ? setContent("main")
                    : setContent("single")
                  : setContent("main");
              }}
            ></div>
          </div>
          {content === "video" ? (
            <section id="video-container">
              <video
                id="wish-video"
                autoPlay
                onEnded={() =>
                  skipSingle ? setContent("main") : setContent("single")
                }
              >
                <source
                  src={
                    currentWish.length > 1
                      ? hasFive
                        ? "/assets/img/misc/5_star.webm"
                        : "/assets/img/misc/4_star.webm"
                      : hasFive
                      ? "/assets/img/misc/5_star_single.webm"
                      : hasFour
                      ? "/assets/img/misc/4_star_single.webm"
                      : "/assets/img/misc/3_star.webm"
                  }
                  type="video/webm"
                />
              </video>
            </section>
          ) : (
            <WishSingle
              currentWish={currentWish}
              setContent={setContent}
              animating={animating}
              setAnimating={setAnimating}
            />
          )}
        </>
      );
  };

  return (
    <div className="App">
      {
        handleContent()
        // <div id="test"></div>
      }
      <WishModal
        images={currentWish}
        modalState={state.isModalOpen}
        toggle={toggleModal}
        wishes={state.wishes}
        isMain={content === "main"}
        skipAll={skipVideo && skipSingle}
      />
    </div>
  );
};

export default Main;

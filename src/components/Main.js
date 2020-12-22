import React, { useEffect, useState } from "react";
import { baseThreeStar } from "../classes/Constants";
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
// import History from "../classes/History";
import { allBanners } from "../classes/Banner";

// let history = [];

const Main = () => {
  const [state, setState] = useState({
    isModalOpen: false,
    wishes: 0,
    primos: 0,
  });

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const [currentWish, setCurrentWish] = useState([]);

  const [activeBannersAbbr, setActiveBannersAbbr] = useState([
    "zhongli",
    "zhongli_ei",
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
      banner: allBanners[4],
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

  const [currentBannerEventName, setCurrentBannerEventName] = useState(
    "Character Event Wish"
  );

  const [skipVideo, setSkipVideo] = useState(false);
  const [skipSingle, setSkipSingle] = useState(false);

  const [hasFive, setHasFive] = useState(false);
  const [hasFour, setHasFour] = useState(false);

  const randItem = (pool) => pool[Math.floor(Math.random() * pool.length)];

  const calcWish = () => {
    const wishChance = Math.random();
    const rateUp = Math.random() < 0.5 ? true : false;
    const currentBanner = activeBannersAbbr[currentBannerIndex];
    let wishItem;
    activeBanners.map((banner) => {
      if (currentBanner === banner.banner.abbr) {
        // matches banner
        if (wishChance < banner.rateFive || banner.pityFive >= 89) {
          // 5 star
          setHasFive(true);
          banner.pityFive = 0;
          banner.pityFour++;
          if (!(currentBanner === "standard")) {
            // non-standard banner
            if (rateUp || banner.guaranteeFive) {
              // draw from rateUp
              banner.guaranteeFive = false;
              wishItem = randItem(banner.banner.rateUpFive);
            } else {
              // drawing from normal pile
              wishItem = currentBanner.includes("_ei")
                ? randItem(banner.banner.poolFiveWeapon)
                : randItem(banner.banner.poolFiveChar);
              banner.guaranteeFive = true;
            }
          } else {
            // standard banner
            if (wishChance < banner.rateFive / 2)
              wishItem = randItem(banner.banner.poolFiveChar);
            else wishItem = randItem(banner.banner.poolFiveWeapon);
          }
        } else if (wishChance < banner.rateFour || banner.pityFour >= 9) {
          // 4 star
          setHasFour(true);
          banner.pityFour = 0;
          banner.pityFive++;
          if (!(currentBanner === "standard")) {
            // not standard banner
            if (rateUp || banner.guaranteeFour) {
              // draw from rateUp
              banner.guaranteeFour = false;
              wishItem = randItem(banner.banner.rateUpFour);
            } else {
              // draw from non rate up
              banner.guaranteeFour = true;
              if (wishChance < banner.rateFour / 2)
                wishItem = randItem(banner.banner.poolFourChar);
              else wishItem = randItem(banner.banner.poolFourWeapon);
            }
          } else {
            // standard banner
            if (wishChance < banner.rateFour / 2)
              wishItem = randItem(banner.banner.poolFourChar);
            else wishItem = randItem(banner.banner.poolFourWeapon);
          }
        } else {
          // 3 stars
          banner.pityFive++;
          banner.pityFour++;
          wishItem = randItem(baseThreeStar);
        }
      }
      return banner;
    });
    // handleHistory(wishPath);
    return wishItem;
  };

  const handleWish = (wishes) => {
    if (!skipVideo) setContent("video");
    else if (skipVideo && skipSingle) setContent("main");
    else setContent("single");
    let wishResults = [];
    setHasFive(false);
    setHasFour(false);
    for (let i = 0; i < wishes; i++) wishResults.push(calcWish());
    setCurrentWish(wishResults);
    setState({
      ...state,
      isModalOpen: true,
      wishes: wishes,
      primos: state.primos + wishes * 160,
    });
  };

  // const handleHistory = (path) => {
  //   const split = path.split("/")[path.split("/").length - 1].split("_");
  //   const type = split[0];
  //   let item = "";
  //   for (let i = 1; i < split.length - 1; i++) {
  //     item += split[i];
  //     if (i < split.length - 2) item += " ";
  //   }
  //   const stars = split[split.length - 1].slice(0, 1);
  //   history.push(new History(item, type, stars, new Date()));
  // };

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
          <section id="top-section">
            <h4
              style={{
                position: "absolute",
                marginRight: "70%",
              }}
            >
              {currentBannerEventName}
            </h4>
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
          <WishModal
            images={currentWish}
            modalState={state.isModalOpen}
            toggle={toggleModal}
            wishes={state.wishes}
          />
          <Footer />
        </>
      );
    } else
      return (
        <>
          <img
            id="skip-button"
            src="./assets/img/misc/close.webp"
            alt="skip"
            onClick={() => {
              setAnimating(false);
              content === "video"
                ? skipSingle
                  ? setContent("main")
                  : setContent("single")
                : setContent("main");
            }}
          />
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
                        ? "/assets/img/misc/5_star.mp4"
                        : "/assets/img/misc/4_star.mp4"
                      : hasFive
                      ? "/assets/img/misc/5_star_single.mp4"
                      : hasFour
                      ? "/assets/img/misc/4_star_single.mp4"
                      : "/assets/img/misc/3_star.mp4"
                  }
                  type="video/mp4"
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
      }{" "}
    </div>
  );
};

export default Main;

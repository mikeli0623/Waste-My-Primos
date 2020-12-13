import React, { useEffect, useState } from "react";
import {
  mainBannerPath,
  gachaPath,
  baseThreeStar,
  allMiniBanners,
  allMainBanners,
} from "../classes/Constants";
import MiniBanners from "./MiniBanners";
import WishButtons from "./WishButtons";
import WishModal from "./WishModal";
import MainBanner from "./MainBanner";
import Stats from "./Stats";
import History from "../classes/History";
import { allBanners } from "../classes/Banner";

let history = [];

const Main = () => {
  const [state, setState] = useState({
    isModalOpen: false,
    wishes: 0,
    primos: 0,
  });

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const [currentBannerEventName, setCurrentBannerEventName] = useState(
    "Character Event Wish"
  );

  const [currentWish, setCurrentWish] = useState([]);

  const [miniBannersActive, setMiniBannersActive] = useState([
    "./img/misc/mini-banners/zhongli.png",
    "./img/misc/mini-banners/zhongli_ei.png",
    "./img/misc/mini-banners/standard.png",
  ]);

  const [mainBannersActive, setMainBanner] = useState([
    "./img/banner/zhongli.png",
    "./img/banner/zhongli_ei.png",
    "./img/banner/standard.png",
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

  const itemPath = (items) =>
    gachaPath + items[Math.floor(Math.random() * items.length)];

  const calcWish = () => {
    const wishChance = Math.random();
    const rateUp = Math.random() < 0.5 ? true : false;
    const drawChar = Math.random() < 0.5 ? true : false;
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
            if (drawChar)
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
              if (drawChar)
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
            if (drawChar)
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

  const sortWishes = (results) => {
    results.sort((a, b) => {
      let starA = a.slice(-5, -4) * 1000;
      let starB = b.slice(-5, -4) * 1000;
      if (a.includes("Weapon_")) starA -= 100;
      if (b.includes("Weapon_")) starB -= 100;
      return starB - starA;
    });
  };

  const handleWish = (wishes) => {
    let wishResults = [];
    for (let i = 0; i < wishes; i++) {
      wishResults.push(calcWish());
    }
    sortWishes(wishResults);
    setCurrentWish([...wishResults]);
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
    // console.log(history);
  };

  const setActiveBanner = (index) => {
    if (currentBannerIndex - index < 0) {
      setDirection("right");
      if (
        (currentBannerIndex === 0 && index === mainBannersActive.length - 1) ||
        (currentBannerIndex === mainBannersActive.length - 1 && index === 0)
      )
        setDirection("left");
    } else {
      setDirection("left");
      if (
        (currentBannerIndex === 0 && index === mainBannersActive.length - 1) ||
        (currentBannerIndex === mainBannersActive.length - 1 && index === 0)
      )
        setDirection("right");
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
    // should never happen
    return -1;
  };

  const changeBanner = (banner, index) => {
    let miniBannersClone = miniBannersActive;
    let mainBannersClone = mainBannersActive;
    let currentBannersClone = activeBanners;
    let nextBannerName = banner.split("/").pop().slice(0, -4);
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

  return (
    <div className="App">
      <h3 style={{ position: "absolute" }}>{currentBannerEventName}</h3>
      <MiniBanners
        activeMinis={miniBannersActive}
        setActive={setActiveBanner}
        activeIndex={currentBannerIndex}
        allMinis={allMiniBanners}
        changeBanner={changeBanner}
        convertedIndex={convertedIndex}
      />
      <MainBanner
        setActive={setActiveBanner}
        activeIndex={currentBannerIndex}
        activeMain={mainBannersActive}
        mainBanners={mainBannersActive}
        allMain={allMainBanners}
        direction={direction}
        convertedIndex={convertedIndex}
      />
      <WishButtons onWish={handleWish} />
      <Stats
        currentBanner={activeBanners[currentBannerIndex]}
        primos={state.primos}
      />
      <WishModal
        images={currentWish}
        modal={state.isModalOpen}
        toggle={toggleModal}
        wishes={state.wishes}
      />
    </div>
  );
};

export default Main;

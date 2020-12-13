import React, { useState } from "react";
import { singlePath } from "../classes/Constants";

const WishSingle = ({ currentWish, setContent }) => {
  const [singleWishIndex, setSingleWishIndex] = useState(0);
  const [animationEnd, setAnimationEnd] = useState(false);

  const nextSingle = () => {
    if (singleWishIndex === currentWish.length - 1) {
      setContent("main");
      return;
    }
    setAnimationEnd(false);
    setSingleWishIndex(singleWishIndex + 1);
  };
  const starPrinter = (i) => {
    return (
      <img
        className={`${animationEnd ? "single-stars" : "transparent"}`}
        key={i}
        src="./img/misc/star.png"
        alt="star"
        star={i + 1}
      />
    );
  };
  return (
    <div id="dark-cover" onClick={nextSingle}>
      <div id="single-info">
        <h1 className={`${animationEnd ? "single-name" : "transparent"}`}>
          {currentWish[singleWishIndex].includes("Char_")
            ? currentWish[singleWishIndex].split("_")[1].toLowerCase()
            : currentWish[singleWishIndex]
                .slice(25, currentWish[singleWishIndex].length - 6)
                .split("_")
                .map((word) => {
                  return word + " ";
                })}
        </h1>
        <div id="stars-container">
          {Array(
            parseInt(
              currentWish[singleWishIndex].split("_").pop().split(".")[0]
            )
          )
            .fill(1)
            .map((e, i) => {
              return starPrinter(i);
            })}
        </div>
      </div>
      {currentWish.map((wish, i) => {
        return (
          <div className="single-pair" key={wish + i}>
            <img
              className={`${
                i === singleWishIndex && animationEnd
                  ? "animate-slide"
                  : "transparent"
              }`}
              src={
                wish.includes("Char")
                  ? `${singlePath + wish.split("_")[1].toLowerCase()}.png`
                  : `${singlePath}temp.png`
              }
              alt={wish}
              onAnimationEnd={() => setAnimationEnd(true)}
            />
            <img
              className={`${
                i === singleWishIndex && !animationEnd
                  ? "single-pull"
                  : "transparent"
              }`}
              src={
                wish.includes("Char")
                  ? `${singlePath + wish.split("_")[1].toLowerCase()}_black.png`
                  : `${singlePath}temp_black.png`
              }
              alt={wish}
              onAnimationEnd={() => setAnimationEnd(true)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default WishSingle;

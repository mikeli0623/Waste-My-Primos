import React, { useState, useEffect } from "react";
import { type, json } from "../classes/Constants";

const WishSingle = ({ currentWish, setContent, animating, setAnimating }) => {
  const [singleWishIndex, setSingleWishIndex] = useState(0);
  const [item, setItem] = useState(currentWish[0]);

  const nextSingle = () => {
    if (singleWishIndex === currentWish.length - 1) {
      setContent("main");
      return;
    }
    setAnimating(false);
    setSingleWishIndex(singleWishIndex + 1);
  };

  const starPrinter = (i) => {
    return (
      <img
        className={`${animating ? "single-stars" : "transparent"}`}
        key={i}
        src="./assets/img/misc/star.webp"
        alt="star"
        star={i + 1}
      />
    );
  };

  useEffect(() => {
    setItem(currentWish[singleWishIndex]);
  }, [currentWish, singleWishIndex]);

  return (
    <div id="dark-cover" onClick={nextSingle}>
      <div id="single-info">
        <img
          className={`${animating ? "single-type" : "transparent"}`}
          src={type[json.getType(item)]}
          alt={type[type[json.getType(item)]]}
        />
        <div id="info-pair">
          <h1 className={`${animating ? "single-name" : "transparent"}`}>
            {json.getName(item)}
          </h1>
          <div id="stars-container">
            {Array(json.getStars(item))
              .fill()
              .map((e, i) => {
                return starPrinter(i);
              })}
          </div>
        </div>
      </div>
      {currentWish.map((wish, i) => {
        return (
          <div className="single-pair" key={wish + i}>
            <img
              className={`${
                i === singleWishIndex ? "single-pull" : "transparent"
              }
              ${json.isChar(item) ? "char-single" : "single-weapon"}`}
              src={json.getSingle(wish)}
              alt={wish}
              onAnimationEnd={() => setAnimating(true)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default WishSingle;

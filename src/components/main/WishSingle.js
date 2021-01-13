import React, { useState, useEffect } from "react";
import { type, JSON } from "../../classes/Constants";

const WishSingle = ({ currentWish, setContent, resize }) => {
  document.querySelector(".navbar").style.visibility = "hidden";
  document.querySelector("#footer").style.visibility = "hidden";

  const [state, setState] = useState({
    singleWishIndex: 0,
    animating: false,
  });

  const [item, setItem] = useState(currentWish[0]);

  const nextSingle = () => {
    if (state.singleWishIndex === currentWish.length - 1) {
      setContent("main");
      return;
    }
    setState({
      ...state,
      singleWishIndex: state.singleWishIndex + 1,
      animating: false,
    });
  };

  const starPrinter = (i) => {
    return (
      <img
        className={`${state.animating ? "single-stars" : "transparent"}`}
        key={i}
        src="./assets/img/misc/star.webp"
        alt="star"
        height={`${resize.getHeight(26, 26)}`}
        width={`${resize.getWidth(26)}`}
        star={i + 1}
        draggable="false"
      />
    );
  };

  useEffect(() => {
    setItem(currentWish[state.singleWishIndex]);
  }, [currentWish, state.singleWishIndex]);

  return (
    <div
      className="overlay"
      onClick={nextSingle}
      style={{
        overflow: state.animating ? "hidden" : "",
        backgroundColor: "rgba(38, 37, 49, 0.9)",
      }}
    >
      <div id={`${state.animating ? "single-info" : ""}`}>
        <img
          className={`${state.animating ? "single-type" : "transparent"}`}
          src={type[JSON.getType(item).toLowerCase()]}
          alt={type[type[JSON.getType(item).toLowerCase()]]}
          width={`${resize.getWidth(115)}`}
          draggable="false"
        />
        <div id="info-pair">
          <h1
            className={`${state.animating ? "single-name" : "transparent"}`}
            style={{
              fontSize:
                resize.windowWidth <= 425
                  ? undefined
                  : `${resize.getWidth(40)}px`,
              textShadow: "1px 0 5px black",
            }}
          >
            {JSON.getName(item)}
          </h1>
          <div
            id="stars-container"
            style={{
              height: `${resize.getHeight(26, 26)}px`,
            }}
          >
            {Array(JSON.getStars(item))
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
                i === state.singleWishIndex ? "single-pull" : "transparent"
              }
              ${JSON.isChar(item) ? "single-char" : "single-weapon"}`}
              src={JSON.getSingle(wish)}
              alt={wish}
              onAnimationEnd={() => setState({ ...state, animating: true })}
              height={`${
                JSON.isChar(item)
                  ? `${resize.getWidth(1000)}px`
                  : JSON.getType(item) === "Sword"
                  ? `${resize.getHeight(750, 200)}px`
                  : JSON.getType(item) === "Bow"
                  ? `${resize.getHeight(750, 200)}px`
                  : JSON.getType(item) === "Claymore"
                  ? `${resize.getHeight(850, 200)}px`
                  : JSON.getType(item) === "Polearm"
                  ? `${resize.getHeight(850, 200)}px`
                  : undefined
              }`}
              width={`${
                JSON.getType(item) === "Catalyst"
                  ? `${resize.getWidth(450)}px`
                  : undefined
              }`}
              type={JSON.getType(item)}
              draggable="false"
            />
          </div>
        );
      })}
    </div>
  );
};

export default WishSingle;

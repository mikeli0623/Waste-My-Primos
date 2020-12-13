import React from "react";
import { CarouselControl } from "reactstrap";
import Carousel from "./Carousel/Carousel";
import CarouselItem from "./Carousel/CarouselItem";

const MainBanner = ({
  setActive,
  activeIndex,
  activeMain,
  allMain,
  direction,
  convertedIndex,
  animating,
  setAnimating,
}) => {
  const next = (setActive, activeMain) => {
    if (animating) return;
    const nextIndex =
      activeIndex === activeMain.length - 1 ? 0 : activeIndex + 1;
    setActive(nextIndex);
  };

  const previous = (setActive, activeMain) => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? activeMain.length - 1 : activeIndex - 1;
    setActive(nextIndex);
  };

  const isActiveMain = (banner, activeMain) => {
    for (let i = 0; i < activeMain.length; i++) {
      if (banner === activeMain[i]) return true;
    }
    return false;
  };

  const slides = allMain.map((banner) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={banner}
      >
        <img
          className={`${isActiveMain(banner, activeMain) ? "" : "transparent"}`}
          height="540px"
          src={banner}
          alt={banner}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={convertedIndex(allMain, activeMain, activeIndex)}
      next={next}
      previous={previous}
      direction={direction}
    >
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={() => previous(setActive, activeMain)}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={() => next(setActive, activeMain)}
      />
    </Carousel>
  );
};

export default MainBanner;

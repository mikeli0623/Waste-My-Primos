import React from "react";
import { allBannersAbbr } from "../classes/Constants";
import Carousel from "./Carousel/Carousel";
import CarouselItem from "./Carousel/CarouselItem";
import parseJSON from "../classes/parseJSON";
import { CarouselControl } from "reactstrap";
import LazyLoad from "react-lazyload";

const json = new parseJSON();

const MainBanner = ({
  setActive,
  activeIndex,
  banners,
  direction,
  animating,
  setAnimating,
}) => {
  const next = (banners) => {
    if (animating) return;
    const nextIndex = activeIndex === banners.length - 1 ? 0 : activeIndex + 1;
    setActive(nextIndex);
  };

  const previous = (banners) => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? banners.length - 1 : activeIndex - 1;
    setActive(nextIndex);
  };

  const slides = allBannersAbbr.map((banner) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={banner}
      >
        {/* <LazyLoad height={570}> */}
        <img
          className={`main-banner ${
            banners.includes(banner) ? "" : "transparent"
          }`}
          height="570px"
          src={json.getMain(banner)}
          alt={banner}
        />
        {/* </LazyLoad> */}
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={allBannersAbbr.indexOf(banners[activeIndex])}
      next={next}
      previous={previous}
      direction={direction}
    >
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={() => previous(banners)}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={() => next(banners)}
      />
    </Carousel>
  );
};

export default MainBanner;

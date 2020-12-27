import React from "react";
import { allBannersAbbr } from "../classes/Constants";
import Carousel from "./Carousel/Carousel";
import CarouselItem from "./Carousel/CarouselItem";
import parseJSON from "../classes/parseJSON";

const json = new parseJSON();

const MainBanner = ({
  setActive,
  activeIndex,
  banners,
  direction,
  animating,
  setAnimating,
  prevBanner,
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
        <img
          className={`main-banner`}
          height="570px"
          src={
            banners.includes(banner) || banner === prevBanner
              ? json.getMain(banner)
              : ""
          }
          alt={banner}
        />
      </CarouselItem>
    );
  });

  const arrows = (prev) => {
    return (
      <div
        id={`carousel-control-${prev ? "prev" : "next"}`}
        style={{
          transform: `${prev ? "rotate(180deg)" : ""}`,
          backgroundImage: "url(/assets/img/misc/arrow.webp)",
          height: "44px",
          width: "32px",
        }}
        onClick={() => (prev ? previous(banners) : next(banners))}
      />
    );
  };

  return (
    <section id="main-banner-section">
      {arrows(true)}
      <Carousel
        activeIndex={allBannersAbbr.indexOf(banners[activeIndex])}
        next={next}
        previous={previous}
        direction={direction}
      >
        {slides}
      </Carousel>
      {arrows(false)}
    </section>
  );
};

export default MainBanner;

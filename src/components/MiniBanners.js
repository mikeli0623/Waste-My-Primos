import React from "react";
import { allBannersAbbr, json } from "../classes/Constants";

const MiniBanner = ({
  miniBanner,
  setActive,
  index,
  activeIndex,
  isActive,
  allBanners,
  bannersActive,
}) => {
  return (
    <img
      className={`mini-banner ${
        allBanners.indexOf(bannersActive[activeIndex]) === index
          ? isActive
            ? "selected"
            : "transparent"
          : !isActive
          ? ""
          : "transparent"
      }`}
      src={
        allBanners.indexOf(bannersActive[activeIndex]) === index
          ? isActive
            ? json.getMiniActive(miniBanner)
            : json.getMini(miniBanner)
          : !isActive
          ? json.getMini(miniBanner)
          : json.getMiniActive(miniBanner)
      }
      alt={
        allBanners.indexOf(bannersActive[activeIndex]) === index
          ? isActive
            ? json.getMiniActive(miniBanner)
            : json.getMini(miniBanner)
          : !isActive
          ? json.getMini(miniBanner)
          : json.getMiniActive(miniBanner)
      }
      height="90"
      onClick={() => setActive(bannersActive.indexOf(allBanners[index]))}
    />
  );
};

const MiniBanners = ({ bannersActive, setActive, activeIndex }) => {
  return (
    <div className="mini-banners">
      {allBannersAbbr.map((miniBanner, index) => {
        return (
          <div
            className={`${
              bannersActive.includes(miniBanner) ? "pair" : "transparent"
            }`}
            key={miniBanner + index}
          >
            <MiniBanner
              miniBanner={miniBanner}
              setActive={setActive}
              index={index}
              activeIndex={activeIndex}
              isActive={true}
              allBanners={allBannersAbbr}
              bannersActive={bannersActive}
            />
            <MiniBanner
              miniBanner={miniBanner}
              setActive={setActive}
              index={index}
              activeIndex={activeIndex}
              isActive={false}
              allBanners={allBannersAbbr}
              bannersActive={bannersActive}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MiniBanners;

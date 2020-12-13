import React from "react";
import DropdownBanner from "./DropdownBanner";

const MiniBanner = ({
  miniBanner,
  setActive,
  index,
  activeIndex,
  isActive,
  allMinis,
  activeMinis,
  convertedIndex,
}) => {
  return (
    <img
      className={`mini-banner ${
        convertedIndex(allMinis, activeMinis, activeIndex) === index
          ? isActive
            ? ""
            : "transparent"
          : !isActive
          ? ""
          : "transparent"
      }`}
      src={
        convertedIndex(allMinis, activeMinis, activeIndex) === index
          ? isActive
            ? `${miniBanner.slice(0, miniBanner.length - 5)}_active.webp`
            : `${miniBanner}`
          : !isActive
          ? `${miniBanner}`
          : `${miniBanner.slice(0, miniBanner.length - 5)}_active.webp`
      }
      alt={
        convertedIndex(allMinis, activeMinis, activeIndex) === index
          ? isActive
            ? `${miniBanner.slice(0, miniBanner.length - 5)}_active.webp`
            : `${miniBanner}`
          : !isActive
          ? `${miniBanner}`
          : `${miniBanner.slice(0, miniBanner.length - 5)}_active.webp`
      }
      height="90"
      onClick={() => setActive(convertedIndex(activeMinis, allMinis, index))}
    />
  );
};

const sameMini = (miniBanner, activeMinis) => {
  for (let i = 0; i < activeMinis.length; i++) {
    if (miniBanner === activeMinis[i]) return true;
  }
  return false;
};

const MiniBanners = ({
  activeMinis,
  setActive,
  activeIndex,
  allMinis,
  changeBanner,
  convertedIndex,
}) => {
  return (
    <div className="mini-banners">
      {allMinis.map((miniBanner, index) => {
        return (
          <div
            className={`${
              sameMini(miniBanner, activeMinis) ? "triplet" : "transparent"
            }`}
            key={miniBanner + index}
          >
            <div className={`pair`}>
              <MiniBanner
                miniBanner={miniBanner}
                setActive={setActive}
                index={index}
                activeIndex={activeIndex}
                isActive={true}
                allMinis={allMinis}
                activeMinis={activeMinis}
                convertedIndex={convertedIndex}
              />
              <MiniBanner
                miniBanner={miniBanner}
                setActive={setActive}
                index={index}
                activeIndex={activeIndex}
                isActive={false}
                allMinis={allMinis}
                activeMinis={activeMinis}
                convertedIndex={convertedIndex}
              />
            </div>
            {miniBanner.includes("standard") ? (
              <div />
            ) : (
              <DropdownBanner
                miniBanners={
                  miniBanner.includes("_ei")
                    ? allMinis.slice(
                        (allMinis.length - 1) / 2,
                        allMinis.length - 1
                      )
                    : allMinis.slice(0, (allMinis.length - 1) / 2)
                }
                changeBanner={changeBanner}
                index={index}
                activeMinis={activeMinis}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MiniBanners;

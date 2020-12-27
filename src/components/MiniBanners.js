import React from "react";
import { json } from "../classes/Constants";

const MiniBanners = ({ bannersActive, setActive, activeIndex }) => {
  const selected = (index) =>
    bannersActive.indexOf(bannersActive[activeIndex]) === index;

  const minis = bannersActive.map((miniBanner, index) => {
    return (
      <>
        <img
          className={`mini-banner ${selected(index) ? "selected" : ""}`}
          src={
            selected(index)
              ? json.getMiniActive(miniBanner)
              : json.getMini(miniBanner)
          }
          alt={
            selected(index)
              ? json.getMiniActive(miniBanner)
              : json.getMini(miniBanner)
          }
          height="95px"
          width="188px"
          onClick={() => setActive(index)}
        />
      </>
    );
  });

  return <div id="mini-banners">{minis}</div>;
};

export default MiniBanners;

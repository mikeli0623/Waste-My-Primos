import React from "react";

const WishButtons = ({ onWish, activeIndex }) => {
  return (
    <div className="wish-buttons">
      <img
        className={activeIndex === 2 ? "transparent" : ""}
        src="./assets/img/misc/int_1.webp"
        alt="x1 Wish"
        onClick={() => onWish(1)}
      />
      <img
        className={activeIndex === 2 ? "" : "transparent"}
        src="./assets/img/misc/acq_1.webp"
        alt="x1 Wish"
        onClick={() => onWish(1)}
      />
      <img
        className={activeIndex === 2 ? "transparent" : ""}
        src="./assets/img/misc/int_10.webp"
        alt="x10 Wish"
        onClick={() => onWish(10)}
      />
      <img
        className={activeIndex === 2 ? "" : "transparent"}
        src="./assets/img/misc/acq_10.webp"
        alt="x10 Wish"
        onClick={() => onWish(10)}
      />
    </div>
  );
};

export default WishButtons;

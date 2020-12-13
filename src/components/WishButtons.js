import React from "react";

const WishButtons = ({ onWish, activeIndex }) => {
  return (
    <div className="wish-buttons">
      <input
        type="image"
        className={activeIndex === 2 ? "transparent" : ""}
        src={"./img/misc/int_1.webp"}
        alt="x1 Wish"
        onClick={() => onWish(1)}
      />
      <input
        type="image"
        className={activeIndex === 2 ? "" : "transparent"}
        src={"./img/misc/acq_1.webp"}
        alt="x1 Wish"
        onClick={() => onWish(1)}
      />
      <input
        type="image"
        className={activeIndex === 2 ? "transparent" : ""}
        src={"./img/misc/int_10.webp"}
        alt="x10 Wish"
        onClick={() => onWish(10)}
      />
      <input
        type="image"
        className={activeIndex === 2 ? "" : "transparent"}
        src={"./img/misc/acq_10.webp"}
        alt="x10 Wish"
        onClick={() => onWish(10)}
      />
    </div>
  );
};

export default WishButtons;

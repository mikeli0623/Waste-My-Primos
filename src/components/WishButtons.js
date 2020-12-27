import React from "react";

const WishButtons = ({ onWish, activeIndex }) => {
  return (
    <div className="wish-buttons">
      <img
        src={
          activeIndex === 2
            ? "./assets/img/misc/acq_1.webp"
            : "./assets/img/misc/int_1.webp"
        }
        alt={
          activeIndex === 2
            ? "./assets/img/misc/acq_1.webp"
            : "./assets/img/misc/int_1.webp"
        }
        onClick={() => onWish(1)}
      />
      <img
        src={
          activeIndex === 2
            ? "./assets/img/misc/acq_10.webp"
            : "./assets/img/misc/int_10.webp"
        }
        alt={
          activeIndex === 2
            ? "./assets/img/misc/acq_10.webp"
            : "./assets/img/misc/int_10.webp"
        }
        onClick={() => onWish(10)}
      />
    </div>
  );
};

export default WishButtons;

import React from "react";
import { Modal, ModalBody } from "reactstrap";

const WishModal = ({ images, modal, toggle, wishes }) => {
  const imagePrinter = () => {
    images = sortWishes(images);
    return images.map((image, index) => {
      return (
        <div
          key={image + index}
          className="wish-result"
          style={{
            backgroundImage: `url("${image}")`,
            height: "800px",
            width: "107px",
            backgroundSize: "107px  800px",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      );
    });
  };

  const sortWishes = (results) => {
    return results.sort((a, b) => {
      let starA = a.slice(-5, -4) * 1000;
      let starB = b.slice(-5, -4) * 1000;
      if (a.includes("Weapon_")) starA -= 100;
      else if (b.includes("Weapon_")) starB -= 100;
      return starB - starA;
    });
  };

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      centered={true}
      className="wish-modal"
      style={{
        maxWidth: "100000000px",
        width: wishes === 10 ? `${107 * 10 + 50}px` : `${107 + 50}px`,
      }}
    >
      <ModalBody
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {imagePrinter()}
      </ModalBody>
    </Modal>
  );
};

export default WishModal;

import React from "react";
import parseJSON from "../classes/parseJSON";
import { Modal, ModalBody } from "reactstrap";

const json = new parseJSON();
const WishModal = ({ images, modalState, toggle, wishes }) => {
  const imagePrinter = () => {
    images = sortWishes(images);
    return images.map((image, index) => {
      return (
        <div
          key={image + index}
          className="wish-result"
          style={{
            backgroundImage: `url("${json.getMulti(image)}")`,
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
      let starA = json.getStars(a) * 100;
      let starB = json.getStars(b) * 100;
      if (!json.isChar(a)) starA -= 10;
      else if (!json.isChar(b)) starB -= 10;
      return starB - starA;
    });
  };

  return (
    <Modal
      isOpen={modalState}
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

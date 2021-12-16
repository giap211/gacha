import React from "react";
import { Modal, ModalBody } from "reactstrap";
import { allChars } from "../../classes/Constants";

const WishModal = ({
  props,
  toggle,
  isMain,
  skipAll,
  charData,
  weaponData,
  resize,
}) => {
  const getStars = (item) => {
    let stars = "";
    allChars.includes(item)
      ? charData.map((datum) => {
          if (item === datum._id) stars = datum.rarity;
          return datum;
        })
      : weaponData.map((datum) => {
          if (item === datum._id) stars = datum.rarity;
          return datum;
        });
    return stars;
  };

  const getMulti = (item) => {
    let multi = "";
    allChars.includes(item)
      ? charData.map((datum) => {
          if (item === datum._id) multi = datum.gachaMulti;
          return datum;
        })
      : weaponData.map((datum) => {
          if (item === datum._id) multi = datum.gachaMulti;
          return datum;
        });
    return multi;
  };

  const sortWishes = (results) => {
    return results.sort((a, b) => {
      let starA = getStars(a) * 100;
      let starB = getStars(b) * 100;
      if (!allChars.includes(a)) starA -= 10;
      else if (!allChars.includes(b)) starB -= 10;
      return starB - starA;
    });
  };

  const imagePrinter = () => {
    let imagesClone = sortWishes([...props.currentWish]);
    return imagesClone.map((image, index) => {
      return (
        <div
          key={image + index}
          className="wish-result"
          style={{
            backgroundImage: `url("${getMulti(image)}")`,
            height: `${isMain ? resize.getHeight(800, 106) : 0}px`,
            width: `${isMain ? resize.getWidth(106) : 0}px`,
            backgroundSize: `${resize.getWidth(106)}px ${resize.getHeight(
              800,
              106
            )}px`,
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      );
    });
  };

  return (
    <Modal
      isOpen={props.isModalOpen}
      toggle={toggle}
      centered
      style={{
        maxWidth: `${
          props.wishes === 10 ? resize.getWidth(1170) : resize.getWidth(220)
        }px`,
        width: props.wishes === 10 ? `${106 * 10 + 50}px` : `${106 + 50}px`,
        transform: `${
          skipAll
            ? ""
            : isMain
            ? "translateY(0)"
            : `translateY(-${resize.getWidth(50)}px)`
        }`,
        opacity: `${isMain ? "1" : "0"}`,
        transition: `${isMain ? "all 0.5s ease-out" : "none"}`,
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

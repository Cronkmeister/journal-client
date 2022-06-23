import "./Slider.scss";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import React, { useState } from "react";

function Slider(props) {
  const [current, setCurrent] = useState(0);
  const length = props.slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(props.slides) || props.slides.length <= 0) {
    return null;
  }

  return (
    <>
      <div className="gallery__hero-image--container">
        <BsFillArrowLeftCircleFill className="arrow left" onClick={prevSlide} />
        <BsFillArrowRightCircleFill
          className="arrow right"
          onClick={nextSlide}
        />
        {props.selectedPhotos.map((album, index) => (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img
                className="gallery__hero-image"
                src={album.path}
                alt=""
              ></img>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Slider;

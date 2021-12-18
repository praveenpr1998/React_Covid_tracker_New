import React, { useState, Fragment } from "react";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import "./SliderContent.scss";
import Icons from "../../../resources/icons/index";

function SliderContent(props) {
  const { contents } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      title: "Total",
      key: "total",
    },
    {
      title: "Delta",
      key: "delta",
    },
    {
      title: "Delta7",
      key: "delta7",
    },
  ];

  const onSliceMoveIconClick = (type) => {
    switch (type) {
      case "prev":
        setActiveIndex((activeIndex) => activeIndex - 1);
        break;
      case "next":
        setActiveIndex((activeIndex) => activeIndex + 1);
        break;
      default:
        return;
    }
  };

  return (
    <div className="SliderContent">
      <ErrorBoundary>
        {activeIndex > 0 && (
          <div
            className="prev-slider"
            onClick={() => onSliceMoveIconClick("prev")}
          >
            <img src={Icons.CaretLeftSolid} alt={"prev"}/>
          </div>
        )}
        {activeIndex < 2 && (
          <div
            className="next-slider"
            onClick={() => onSliceMoveIconClick("next")}
          >
            <img src={Icons.CaretRightSolid} alt={"next"}/>
          </div>
        )}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={
              index === activeIndex ? "active-slide" : "inactive-slide"
            }
          >
            <div className="slider-content mt5">
              <span className="slider-content-title">{slide.title}</span>
              <div className="slider-content-data mt3">
                {contents[slide.key] &&
                Object.keys(contents[slide.key]).length ? (
                  Object.keys(contents[slide.key]).map((key) => (
                    <Fragment key={key}>
                      <span>{key} </span> <span> : </span>{" "}
                      <span>{contents[slide.key][key]} </span>
                    </Fragment>
                  ))
                ) : (
                  <span>-</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </ErrorBoundary>
    </div>
  );
}

export default SliderContent;

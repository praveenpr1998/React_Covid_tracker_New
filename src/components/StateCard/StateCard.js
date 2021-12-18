import React, { useEffect, useState } from "react";
import ALL_CONSTANTS from "../../Saga/Constants/Constants";
import "./StateCard.scss";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import SliderContent from "./SliderContent/SliderContent";

function StateCard(props) {
  const { content, stateID, onCardClick } = props;
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    if (content.districts && Object.keys(content.districts).length) {
      setSelectedDistrict(Object.keys(content.districts)[0]);
    }
  }, [content.districts]);

  const onDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  return (
    <div
      className="StateCard p4"
      key={stateID}

    >
      <ErrorBoundary>
        <div className="state-card-header" >
          <span className="state-card-name"  onClick={() => onCardClick(stateID)}>
            {ALL_CONSTANTS.mappedStates[stateID]}
          </span>
          {selectedDistrict && !content.dateFilterApplied && (
            <select
              name="districtFilter"
              id="districtFilter"
              className="input-box"
              value={selectedDistrict}
              onChange={onDistrictChange}
            >
              {Object.keys(content.districts).map((dist) => (
                <option id={dist} key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          )}
        </div>
        <SliderContent
          stateID={stateID}
          contents={
            selectedDistrict && !content.dateFilterApplied
              ? content.districts[selectedDistrict]
              : content
          }
          onCardClick={onCardClick}
        />
      </ErrorBoundary>
    </div>
  );
}

export default StateCard;

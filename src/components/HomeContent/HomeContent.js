import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ALL_CONSTANTS from "../../Saga/Constants/Constants";
import "./HomeContent.scss";
// import images from "../../resources/images/index";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import FilterToolBar from "../FilterToolBar/FilterToolBar";
import StateCard from "../StateCard/StateCard";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

function HomeContent(props) {
  const { covidStoreData, getCovidData, getCovidDatesData } = props;
  const [covidData, setCovidData] = useState({});

  // used a copy of the local covidData to keep track of the filtered data 
  const [covidDataCopy, setCovidDataCopy] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getCovidData();
    getCovidDatesData();
  }, [getCovidData, getCovidDatesData]);

  useEffect(() => {
    if (Object.keys(covidStoreData.payload).length) {
      setCovidData(covidStoreData.payload);
      setCovidDataCopy(covidStoreData.payload);
    }
  }, [covidStoreData.payload]);

  const onSearchValueChange = (value) => {

    // take a copy of the and filter it with searched value from filterComponet callback
    var filteredData = { ...covidDataCopy };

    Object.keys(filteredData).map((key) => {
      if (
        !(
          ALL_CONSTANTS.mappedStates[key] &&
          ALL_CONSTANTS.mappedStates[key]
            .toLowerCase()
            .includes(value.toLowerCase())
        )
      )
        delete filteredData[key];
        return key;
    });

    setCovidData(filteredData);
  };

  const onSortByChange = (object) => {
    switch (object.value) {
      case "confirmedCount": {

        // Sorting the data based on confirmed count value and storing it back as object of objects
        let orderedData = Object.keys(covidData)
          .sort((a, b) => {
            if (object.sortBy === "asc")
              return (
                covidData[a].total.confirmed - covidData[b].total.confirmed
              );
            else
              return (
                covidData[b].total.confirmed - covidData[a].total.confirmed
              );
          })
          .reduce((obj, key) => {
            obj[key] = covidData[key];
            return obj;
          }, {});
        setCovidData(orderedData);

        orderedData = Object.keys(covidDataCopy)
          .sort((a, b) => {
            if (object.sortBy === "asc")
              return (
                covidDataCopy[a].total.confirmed -
                covidDataCopy[b].total.confirmed
              );
            else
              return (
                covidDataCopy[b].total.confirmed -
                covidDataCopy[a].total.confirmed
              );
          })
          .reduce((obj, key) => {
            obj[key] = covidDataCopy[key];
            return obj;
          }, {});
        setCovidDataCopy(orderedData);

        break;
      }
      case "affectedPercentage": {
        let orderedData = Object.keys(covidData)
          .sort((a, b) => {
            if (object.sortBy === "asc")
              return (
                (covidData[a].total.confirmed / covidData[a].meta.population) *
                  100 -
                (covidData[b].total.confirmed / covidData[b].meta.population) *
                  100
              );
            else
              return (
                (covidData[b].total.confirmed / covidData[b].meta.population) *
                  100 -
                (covidData[a].total.confirmed / covidData[a].meta.population) *
                  100
              );
          })
          .reduce((obj, key) => {
            obj[key] = covidData[key];
            return obj;
          }, {});
        setCovidData(orderedData);

         orderedData = Object.keys(covidDataCopy)
          .sort((a, b) => {
            if (object.sortBy === "asc")
              return (
                (covidDataCopy[a].total.confirmed /
                  covidDataCopy[a].meta.population) *
                  100 -
                (covidDataCopy[b].total.confirmed /
                  covidDataCopy[b].meta.population) *
                  100
              );
            else
              return (
                (covidDataCopy[b].total.confirmed /
                  covidDataCopy[b].meta.population) *
                  100 -
                (covidDataCopy[a].total.confirmed /
                  covidDataCopy[a].meta.population) *
                  100
              );
          })
          .reduce((obj, key) => {
            obj[key] = covidDataCopy[key];
            return obj;
          }, {});
        setCovidDataCopy(orderedData);

        break;
      }
      case "vaccinatedPercentage": {
        let orderedData = Object.keys(covidData)
          .sort((a, b) => {
            if (object.sortBy === "asc")
              return (
                (covidData[a].total.vaccinated2 /
                  covidData[a].meta.population) *
                  100 -
                (covidData[b].total.vaccinated2 /
                  covidData[b].meta.population) *
                  100
              );
            else
              return (
                (covidData[b].total.vaccinated2 /
                  covidData[b].meta.population) *
                  100 -
                (covidData[a].total.vaccinated2 /
                  covidData[a].meta.population) *
                  100
              );
          })
          .reduce((obj, key) => {
            obj[key] = covidData[key];
            return obj;
          }, {});
        setCovidData(orderedData);

         orderedData = Object.keys(covidDataCopy)
          .sort((a, b) => {
            if (object.sortBy === "asc")
              return (
                (covidDataCopy[a].total.confirmed /
                  covidDataCopy[a].meta.population) *
                  100 -
                (covidDataCopy[b].total.confirmed /
                  covidDataCopy[b].meta.population) *
                  100
              );
            else
              return (
                (covidDataCopy[b].total.confirmed /
                  covidDataCopy[b].meta.population) *
                  100 -
                (covidDataCopy[a].total.confirmed /
                  covidDataCopy[a].meta.population) *
                  100
              );
          })
          .reduce((obj, key) => {
            obj[key] = covidDataCopy[key];
            return obj;
          }, {});
        setCovidDataCopy(orderedData);

        break;
      }
      default:
        return;
    }
  };

  const onDateFilterChange = (object) => {
    const { value, enabled } = object;
    if (value) {
      var dataCopy = { ...covidData };
      let dataObj = {
        total: "",
        delta: "",
        delta7: "",
      };

      // making the datefiltered key as true to have a check for disaplying content values
      // if true display the values on the filtered dates
      // if not display the first districts values as date based filter could not be done for districts based on the data recieved
      Object.keys(dataCopy).map((key) => {
        Object.assign(dataObj, dataCopy[key].dates[value]);
        dataCopy[key] = Object.assign(dataCopy[key], dataObj);
        dataCopy[key]["dateFilterApplied"] = enabled;
        return key;
      });
      setCovidData(dataCopy);
    }
  };

  const onCardClick = (stateID) => {
    navigate(`/details/${stateID}`);
  };

  const resetFilters = () => {
    setCovidData(covidStoreData.payload);
  };

  return (
    <div className="HomeContent">
      <Loader loading={covidStoreData.isPending} title="Loading Covid Data...">
        <FilterToolBar
          title="States"
          onSearchValueChange={onSearchValueChange}
          onSortByChange={onSortByChange}
          onDateFilterChange={onDateFilterChange}
          resetFilters={resetFilters}
        />
        <ErrorBoundary>
          <div className="cards-view">
            {Object.keys(covidData).length ? (
              Object.keys(covidData).map(
                (card) =>
                  ALL_CONSTANTS.mappedStates[card] && (
                    <StateCard
                      stateID={card}
                      content={covidData[card]}
                      key={card}
                      onCardClick={onCardClick}
                    />
                  )
              )
            ) : (
              <span className="no-data">No Data</span>
            )}
          </div>
        </ErrorBoundary>
      </Loader>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    covidStoreData: state.CovidData.covidData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCovidData: (callback) =>
      dispatch({ type: ALL_CONSTANTS.GET_COVID_DATA_SAGA, callback }),
    getCovidDatesData: (callback) =>
      dispatch({ type: ALL_CONSTANTS.GET_COVID_DATES_DATA_SAGA, callback }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);

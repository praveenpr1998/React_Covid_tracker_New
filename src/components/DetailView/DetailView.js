import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ALL_CONSTANTS from "../../Saga/Constants/Constants";
import "./DetailView.scss";
// import images from "../../resources/images/index";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Header from "../Header/Header";
import Table from "../Table/Table";
import FilterToolBar from "../FilterToolBar/FilterToolBar";
import { useParams } from "react-router-dom";

function DetailView(props) {
  const { stateID } = useParams();
  const { covidStoreData } = props;
  const [covidData, setCovidData] = useState({});
  const [covidDataCopy, setCovidDataCopy] = useState({});

  useEffect(() => {
    if (covidStoreData.payload[stateID]) {
      var filteredData = { ...covidStoreData.payload[stateID], dataSource: [] };
      if (filteredData.dates && Object.keys(filteredData.dates).length) {
        Object.keys(filteredData.dates).filter((key) => {
          filteredData.dataSource.push({
            ...filteredData.dates[key],
            date: key,
            ...filteredData.dates[key].total,
          });
          return key;
        });
      }

      setCovidData(filteredData);
      setCovidDataCopy(filteredData);
    }
    else {
      setCovidData({});
      setCovidDataCopy({});
    }
  }, [covidStoreData.payload, stateID]);

  const columns = [
    {
      title: "Date",
      key: "date",
    },
    {
      title: "Confirmed",
      key: "confirmed",
    },
    {
      title: "Recovered",
      key: "confirmed",
    },
    {
      title: "Deceased",
      key: "confirmed",
    },
    {
      title: "Delta",
      key: "delta",
      template: (record) => {
        return (
          <div className="table-delta-view">
            {record.delta
              ? Object.keys(record.delta).map((key) => (
                  <div key={key}>
                    <span>{key + " - "}</span>
                    <span>{record.delta[key]}</span>
                  </div>
                ))
              : "-"}
          </div>
        );
      },
    },
    {
      title: "Delta7",
      key: "delta7",
      template: (record) => {
        return (
          <div className="table-delta7-view">
            {record.delta7
              ? Object.keys(record.delta7).map((key) => (
                  <div key={key}>
                    <span>{key + " - "}</span>
                    <span>{record.delta7[key]}</span>
                  </div>
                ))
              : "-"}
          </div>
        );
      },
    },
  ];

  var dataSource = [];
  if (covidData.dataSource && covidData.dataSource.length) {
    dataSource = covidData.dataSource;
  }

  const onDistrictFilterChange = (value) => {
    var filteredData = { ...covidDataCopy };
    if (value)
      Object.keys(filteredData.districts).some((key) => {
        if (key.toLowerCase() === value.toLowerCase()) {
          filteredData.dataSource = [filteredData.districts[key]];
          return true;
        }
        return false;
      });
    setCovidData(filteredData);
  };

  const onSortByChange = (object) => {
    switch (object.value) {
      case "confirmedCount": {
        let orderedData = { ...covidData };
        orderedData.dataSource.sort((a, b) => {
          if (object.sortBy === "asc") return a.confirmed - b.confirmed;
          else return b.confirmed - a.confirmed;
        });
        setCovidData(orderedData);
        break;
      }
      case "affectedPercentage": {
        let orderedData = { ...covidData };
        orderedData.dataSource.sort((a, b) => {
          if (object.sortBy === "asc")
            return (
              (a.confirmed / orderedData.meta.population) * 100 -
              (b.confirmed / orderedData.meta.population) * 100
            );
          else
            return (
              (b.confirmed / orderedData.meta.population) * 100 -
              (a.confirmed / orderedData.meta.population) * 100
            );
        });
        setCovidData(orderedData);
        break;
      }
      case "vaccinatedPercentage": {
        var orderedData = { ...covidData };
        orderedData.dataSource.sort((a, b) => {
          if (object.sortBy === "asc")
            return (
              (a.total.vaccinated2 || 0 / orderedData.meta.population) * 100 -
              (b.total.vaccinated2 || 0 / orderedData.meta.population) * 100
            );
          else
            return (
              (b.total.vaccinated2 || 0 / orderedData.meta.population) * 100 -
              (a.total.vaccinated2 || 0 / orderedData.meta.population) * 100
            );
        });
        setCovidData(orderedData);
        break;
      }
      default:
        return;
    }
  };

  const onDateFilterChange = (object) => {
    const { value, enabled } = object;
    var filteredData = { ...covidDataCopy };
    if (value) {
      if (enabled) {
        let foundDateValues = {};
        Object.keys(filteredData.dates).some((key) => {
          if (key === value) {
            foundDateValues = [{ ...filteredData.dates[key], date: key }];
            return true;
          }
          return false;
        });
        filteredData.dataSource = foundDateValues;
        setCovidData(filteredData);
      } else setCovidData(filteredData);
    }
  };

  const resetFilters = () => {
    setCovidData(covidDataCopy);
  };
  return (
    <div className="DetailView">
      {stateID ? (
        <ErrorBoundary>
          <Header />
          <FilterToolBar
            title={ALL_CONSTANTS.mappedStates[stateID]}
            districts={covidData.districts}
            onDistrictFilterChange={onDistrictFilterChange}
            onSortByChange={onSortByChange}
            onDateFilterChange={onDateFilterChange}
            resetFilters={resetFilters}
          />
          <div className="details-table-div mt10">
            <Table
              customClass={"detailsTable"}
              columns={columns}
              dataSource={dataSource}
            />
          </div>
        </ErrorBoundary>
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    covidStoreData: state.CovidData.covidData,
  };
};

export default connect(mapStateToProps)(DetailView);

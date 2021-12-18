import ALL_CONSTANTS from "../Saga/Constants/Constants";

const BASE_URL = ALL_CONSTANTS.BASE_URL;

var getJSON = function (url, callback) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";

    xhr.onload = function () {
      var status = xhr.status;

      if (status === 200) {
        resolve(callback(null, xhr.response));
      } else {
        reject(callback(status));
      }
    };

    xhr.send();
  });
};

export const getCovidData = async () => {
  const response = await getJSON(
    BASE_URL + "data.min.json",
    async function (err, data) {
      if (err != null) {
        console.error(err);
        return err;
      } else {
        return data;
      }
    }
  );
  return response;
};

export const getCovidDatesData = async () => {
  const response = await getJSON(
    BASE_URL + "timeseries.min.json",
    async function (err, data) {
      if (err != null) {
        console.error(err);
        return err;
      } else {
        return data;
      }
    }
  );
  return response;
};

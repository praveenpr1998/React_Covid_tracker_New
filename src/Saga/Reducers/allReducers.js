import ALL_CONSTANTS from "../Constants/Constants";
import * as CommonService from "../../Services/CommonService";

const initialState = {
  covidData: ALL_CONSTANTS.commonInitialState,
  covidDatesData: ALL_CONSTANTS.commonInitialState,
};

export function CovidData(state = initialState, action) {
  switch (action.type) {
    case ALL_CONSTANTS.GET_COVID_DATA: {
      if (action.isFailed) {
        // <Toast message={ALL_CONSTANTS.GET_COVID_DATA_FAILED} type="error" />;
      } else if (action.isSuccess) {
        if (Object.keys(action.payload).length) {
          const orderedData = CommonService.sortObjOfObj(action.payload, "asc");
          action.payload = orderedData;
        }
      }
      return { ...state, covidData: { ...state.covidData, ...action } };
    }
    case ALL_CONSTANTS.GET_COVID_DATES_DATA: {
      if (action.isFailed) {
        // <Toast message={ALL_CONSTANTS.GET_COVID_DATA_FAILED} type="error" />;
      } else if (action.isSuccess && state.covidData.isSuccess) {
        if (
          Object.keys(action.payload).length &&
          Object.keys(state.covidData.payload).length
        ) {
          Object.keys(action.payload).map((item) => {
            if (state.covidData.payload[item])
              state.covidData.payload[item].dates = action.payload[item].dates;
              return item;
          });
        }
      }
      return {
        ...state,
        covidDatesData: { ...state.covidDatesData, ...action },
      };
    }
    default:
      return state;
  }
}

import { takeLatest, call, put } from "redux-saga/effects";
import ALL_CONSTANTS from "../Constants/Constants";
import * as RestService from "../../Services/RestService";

// Saga Workers

function* getCovidDataWorker() {
  try {
    yield put({
      type: ALL_CONSTANTS.GET_COVID_DATA,
      ...ALL_CONSTANTS.commonInitialState,
      isPending: true,
    });
    const response = yield call(() => RestService.getCovidData());
    yield put({
      type: ALL_CONSTANTS.GET_COVID_DATA,
      ...ALL_CONSTANTS.commonInitialState,
      isSuccess: true,
      payload: response,
    });
  } catch (err) {
    yield put({
      type: ALL_CONSTANTS.GET_COVID_DATA,
      ...ALL_CONSTANTS.commonInitialState,
      isFailed: true,
      payload: err,
    });
  }
}

function* getCovidDatesDataWorker() {
  try {
    yield put({
      type: ALL_CONSTANTS.GET_COVID_DATES_DATA,
      ...ALL_CONSTANTS.commonInitialState,
      isPending: true,
    });
    const response = yield call(() => RestService.getCovidDatesData());
    yield put({
      type: ALL_CONSTANTS.GET_COVID_DATES_DATA,
      ...ALL_CONSTANTS.commonInitialState,
      isSuccess: true,
      payload: response,
    });
  } catch (err) {
    yield put({
      type: ALL_CONSTANTS.GET_COVID_DATES_DATA,
      ...ALL_CONSTANTS.commonInitialState,
      isFailed: true,
      payload: err,
    });
  }
}

// Saga Watchers
export function* getCovidData() {
  yield takeLatest(ALL_CONSTANTS.GET_COVID_DATA_SAGA, getCovidDataWorker);
}

export function* getCovidDatesData() {
  yield takeLatest(
    ALL_CONSTANTS.GET_COVID_DATES_DATA_SAGA,
    getCovidDatesDataWorker
  );
}

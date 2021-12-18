import { combineReducers } from "redux";
import * as allReducers from "./allReducers";
import { persistReducer } from "redux-persist";
import createIdbStorage from "@piotr-cz/redux-persist-idb-storage";

const storePersistConfig = {
  key: "react_session_store",
  storage: createIdbStorage({
    name: "covidTracker",
    storeName: "covidTracker_storage",
  }),
};

const rootReducer = combineReducers(allReducers);

export default persistReducer(storePersistConfig, rootReducer);

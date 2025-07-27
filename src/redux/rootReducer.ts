import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/auth-slice";

const rootReducer = combineReducers({
    auth: authReducer,
    // інші редюсери
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["token"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
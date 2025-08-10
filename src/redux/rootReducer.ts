import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/auth-slice";
import modalReducer from "./modal/modal-slise";
import likesReducer from "./likes/likes-slise";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  likes: likesReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;

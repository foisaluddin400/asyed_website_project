// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authSlice } from "./features/auth/authSlice";
import { baseApi } from "./Api/baseApi";

// ----- DESIGN SLICE -----
import { createSlice } from "@reduxjs/toolkit";

const designSlice = createSlice({
  name: "design",
  initialState: {
    frontPreview: null,
    backPreview: null,
    rightPreview: null,
    leftPreview: null,
    elementFrontPreview: null,
    elementBackPreview: null,
    elementRightPreview: null,
    elementLeftPreview: null,
    id: null,
    variantId: null,
  },
  reducers: {
    saveDesigns: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { saveDesigns } = designSlice.actions;

// ----- TRANSFORM: logInUser string → object -----
const logInUserTransform = createTransform(
  (inboundState) => inboundState,
  (outboundState, key) => {
    if (key === "logInUser" && typeof outboundState === "string") {
      try {
        return JSON.parse(outboundState);
      } catch (e) {
        console.error("Failed to parse logInUser", e);
        return { user: null, token: null };
      }
    }
    return outboundState;
  }
);

// ----- PERSIST CONFIG -----
const persistConfig = {
  key: "quiz-app",
  storage,
  blacklist: ["baseApi"],
  transforms: [logInUserTransform],
};

const rootReducer = combineReducers({
  logInUser: authSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
  design: designSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
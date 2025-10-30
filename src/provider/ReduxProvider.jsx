/* eslint-disable react/prop-types */
"use client"
import { persistor, store } from "@/redux/store";
import React from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";




const ReduxProvider = ({children}) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            {children}
            </PersistGate>
        </Provider>
    );
};

export default ReduxProvider;
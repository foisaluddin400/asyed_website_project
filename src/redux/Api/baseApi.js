// Api/baseApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.10.20.22:3001/api",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().logInUser?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: [
    "overview",
    "host",
    "updateProfile",
    "user",
    "profile",
    "car",
    "booking"
  ],
  endpoints: () => ({}),
});

export const imageUrl = "http://10.10.20.22:3001";
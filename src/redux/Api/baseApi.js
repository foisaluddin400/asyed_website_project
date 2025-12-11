// Api/baseApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://s3cmd5kk-3001.asse.devtunnels.ms/api",
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
  tagTypes: ["overview", "host"],
  endpoints: () => ({}),
});

export const imageUrl = "https://s3cmd5kk-3001.asse.devtunnels.ms";
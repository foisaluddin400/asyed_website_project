import { baseApi } from "./baseApi";

const meta = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query({
      query: () => {
        return {
          url: `/faq`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),



getPrivecy: builder.query({
      query: () => {
        return {
          url: `/pages/privacy`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),


    getTerms: builder.query({
      query: () => {
        return {
          url: `/pages/terms`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
  getAboutUs: builder.query({
      query: () => {
        return {
          url: `/pages/about`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    
    addFaq: builder.mutation({
      query: (data) => {
        return {
          url: "/faq",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteFaq: builder.mutation({
      query: (id) => {
        return {
          url: `/faq/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateFaq: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/faq/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    addContact: builder.mutation({
      query: (data) => {
        return {
          url: "/contact",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    getContact: builder.query({
      query: () => {
        return {
          url: `/contact/business-info`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getClientContact: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/contact/messages?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    updateContact: builder.mutation({
      query: (data) => {
        return {
          url: `/contact/business-info`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteContactClients: builder.mutation({
      query: (id) => {
        return {
          url: `/contact/messages/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getAddress: builder.query({
      query: () => {
        return {
          url: `/address`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addAddress: builder.mutation({
      query: (data) => {
        return {
          url: "/address",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteAddress: builder.mutation({
      query: (id) => {
        return {
          url: `/address/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateAddress: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/address/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    addOrderCheckout: builder.mutation({
      query: ({ body, headers }) => ({
        url: "/orders",
        method: "POST",
        body,
        headers,
      }),
      invalidatesTags: ["updateProfile"],
    }),

    addReOrderCheckout: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/orders/${id}/retry-payment`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    getMyOrder: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/orders/my-orders?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getCompleteOrders: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/orders/complete-orders?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getMyReview: builder.query({
      query: () => {
        return {
          url: `/review`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getCoupon: builder.query({
      query: () => {
        return {
          url: `/coupons/active`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
  getBanner: builder.query({
      query: () => {
        return {
          url: `/banners/active`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
   
  }),
});

export const {
  useAddFaqMutation,
  useDeleteFaqMutation,
  useGetFaqQuery,
  useUpdateFaqMutation,
  useUpdateContactMutation,
  useGetContactQuery,
  useGetClientContactQuery,
  useDeleteContactClientsMutation,
  useAddContactMutation,
  useAddAddressMutation,
  useDeleteAddressMutation,
  useGetAddressQuery,
  useUpdateAddressMutation,
  useAddOrderCheckoutMutation,
  useGetMyOrderQuery,
  useGetMyReviewQuery,
  useAddReOrderCheckoutMutation,
  useGetAboutUsQuery,
  useGetPrivecyQuery,useGetTermsQuery,useGetCouponQuery,useGetBannerQuery,useGetCompleteOrdersQuery
} = meta;

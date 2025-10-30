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
      query: ({data,id}) => {
        return {
          url: `/orders/${id}/retry-payment`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
getMyOrder: builder.query({
      query: () => {
        return {
          url: `/orders/my-orders`,
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

    //     getUserAll: builder.query({
    //       query: ({ page, limit }) => {
    //         return {
    //           url: `/normal-user/get-all-user?page=${page}&limit=${limit}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //     getUserGrowth: builder.query({
    //       query: (year) => {
    //         return {
    //           url: `/meta/user-chart-data?year=${year}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //     getBanner: builder.query({
    //       query: ({searchTerm,page,limit}) => {
    //         return {
    //           url: `/banner/get-all?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

    //     addBanner: builder.mutation({
    //       query: (data) => {
    //         return {
    //           url: "/banner/create",
    //           method: "POST",
    //           body: data,
    //         };
    //       },
    //       invalidatesTags: ["updateProfile"],
    //     }),

    //      deleteBanner: builder.mutation({
    //       query: (id) => {
    //         return {
    //           url: `/banner/delete/${id}`,
    //           method: "DELETE",
    //         };
    //       },
    //       invalidatesTags: ["updateProfile"],
    //     }),
    // getFaq: builder.query({
    //             query: () => {
    //                 return {
    //                     url: `/manage/get-faq`,
    //                     method: "GET",
    //                 };
    //             },
    //             providesTags: ["updateProfile"],
    //         }),

    //         addFaq: builder.mutation({
    //             query: (data) => {
    //                 return {
    //                     url: "/manage/add-faq",
    //                     method: "POST",
    //                     body: data,
    //                 };
    //             },
    //             invalidatesTags: ["updateProfile"],
    //         }),

    //         updateFaq: builder.mutation({
    //             query: ({ data, id }) => {
    //                 return {
    //                     url: `/manage/edit-faq/${id}`,
    //                     method: "PATCH",
    //                     body: data,
    //                 };
    //             },
    //             invalidatesTags: ["updateProfile"],
    //         }),

    //         deleteFaq: builder.mutation({
    //             query: (id) => {
    //                 return {
    //                     url: `/manage/delete-faq/${id}`,
    //                     method: 'DELETE'
    //                 }
    //             },
    //             invalidatesTags: ['updateProfile']
    //         }),

    //     getTermsConditions: builder.query({
    //       query: () => {
    //         return {
    //           url: "/manage/get-terms-conditions",
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["terms"],
    //     }),
    //     postTermsCondition: builder.mutation({
    //       query: (data) => {
    //         return {
    //           url: "/manage/add-terms-conditions",
    //           method: "POST",
    //           body: data,
    //         };
    //       },
    //       invalidatesTags: ["terms"],
    //     }),

    //     getPrivecy: builder.query({
    //       query: () => {
    //         return {
    //           url: "/manage/get-privacy-policy",
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["terms"],
    //     }),

    //     getReports: builder.query({
    //       query: ({searchTerm,page,limit}) => {
    //         return {
    //           url: `/report/all-reports?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["terms"],
    //     }),

    //     postPrivecy: builder.mutation({
    //       query: (data) => {
    //         return {
    //           url: "/manage/add-privacy-policy",
    //           method: "POST",
    //           body: data,
    //         };
    //       },
    //       invalidatesTags: ["terms"],
    //     }),
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
  useAddReOrderCheckoutMutation
} = meta;
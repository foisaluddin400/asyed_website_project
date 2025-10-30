import { baseApi } from "./baseApi";

const blog = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => {
        return {
          url: `/blogs`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    addBlogs: builder.mutation({
      query: (data) => {
        return {
          url: "/blogs",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteBlogs: builder.mutation({
      query: (id) => {
        return {
          url: `/blogs/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateBlogs: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/blogs/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getSingleBlogs: builder.query({
      query: ({ id }) => {
        return {
          url: `/blogs/${id}`,
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

export const {useAddBlogsMutation,useDeleteBlogsMutation,useGetBlogsQuery,useGetSingleBlogsQuery,useUpdateBlogsMutation} = blog;

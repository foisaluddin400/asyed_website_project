import { baseApi } from "./baseApi";

const category = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => {
        return {
          url: `/categories`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
  getSingleCategory: builder.query({
      query: ({ id }) => {
        return {
          url: `/categories/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAllCategory: builder.query({
      query: ({ page, limit, search }) => {
        return {
          url: `/categories?search=${search}&page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    getBrandsName: builder.query({
      query: () => {
        return {
          url: `/brands`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    deleteCategories: builder.mutation({
      query: (id) => {
        return {
          url: `/categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    addCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/categories",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    updateCategory: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/categories/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getsubCategory: builder.query({
      query: () => {
        return {
          url: `/subcategories`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    deletesubCategories: builder.mutation({
      query: (id) => {
        return {
          url: `/subcategories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    addsubCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/subcategories",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    updatesubCategory: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/subcategories/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getSize: builder.query({
      query: () => {
        return {
          url: `/sizes`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    deleteSize: builder.mutation({
      query: (id) => {
        return {
          url: `/sizes/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    addSeize: builder.mutation({
      query: (data) => {
        return {
          url: "/sizes",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateSize: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/sizes/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getColor: builder.query({
      query: () => {
        return {
          url: `/colors`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    deleteColor: builder.mutation({
      query: (id) => {
        return {
          url: `/colors/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    addColor: builder.mutation({
      query: (data) => {
        return {
          url: "/colors",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateColor: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/colors/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getBrands: builder.query({
      query: () => {
        return {
          url: `/brands`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    //     getUser: builder.query({
    //       query: () => {
    //         return {
    //           url: `/normal-user/get-all-user`,
    //           method: "GET",
    //         };
    //       },
    //       providesTags: ["updateProfile"],
    //     }),

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
  useGetCategoryQuery,
  useDeleteCategoriesMutation,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useAddSeizeMutation,
  useDeleteSizeMutation,
  useGetSizeQuery,
  useUpdateSizeMutation,
  useGetColorQuery,
  useAddColorMutation,
  useDeleteColorMutation,
  useUpdateColorMutation,
  useGetsubCategoryQuery,
  useAddsubCategoryMutation,
  useDeletesubCategoriesMutation,
  useUpdatesubCategoryMutation,
  useGetAllCategoryQuery,
  useGetBrandsNameQuery,
  useGetBrandsQuery,
  useGetSingleCategoryQuery
} = category;

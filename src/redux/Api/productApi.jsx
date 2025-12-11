import { baseApi } from "./baseApi";

const blog = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBusinesFilter: builder.query({
      query: ({
        category,
        subcategory,
        color,
        size,
        brand,
        price,
        search,
        page,
        limit,
      }) => {
        let url = `/products`;

        const params = [];

        if (category) params.push(`category=${encodeURIComponent(category)}`);
        if (subcategory)
          params.push(`subcategory=${encodeURIComponent(subcategory)}`);
        if (color) params.push(`color=${encodeURIComponent(color)}`);
        if (size) params.push(`size=${encodeURIComponent(size)}`);
        if (brand) params.push(`brand=${encodeURIComponent(brand)}`);
        if (price) params.push(`price=${encodeURIComponent(price)}`);
        if (search) params.push(`search=${encodeURIComponent(search)}`);

        params.push(`page=${page}`);
        params.push(`limit=${limit}`);

        if (params.length > 0) {
          url += `?${params.join("&")}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getPopularProduct: builder.query({
      query: () => {
        return {
          url: `/products/popular`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getCategoryWiseProduct: builder.query({
      query: ({ id }) => {
        return {
          url: `/products?category=${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getSingleProduct: builder.query({
      query: ({ id }) => {
        return {
          url: `/products/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getSingleProductReview: builder.query({
      query: ({ id }) => {
        return {
          url: `/review/product/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addDesign: builder.mutation({
      query: (formData) => {
        return {
          url: "/designs",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getDesign: builder.query({
      query: () => {
        return {
          url: `/designs`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    getSingleDesign: builder.query({
      query: ({ id }) => {
        return {
          url: `/designs/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getReletedProduct: builder.query({
      query: ({ id }) => {
        return {
          url: `/products/${id}/related`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    deleteDesign: builder.mutation({
      query: (id) => {
        return {
          url: `/designs/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    addToCart: builder.mutation({
      query: (data) => {
        return {
          url: "/carts/regular",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    getSingleCart: builder.query({
      query: ({ id }) => {
        return {
          url: `/carts/item/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addToDesign: builder.mutation({
      query: (data) => {
        return {
          url: "/carts/design",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    getCart: builder.query({
      query: () => {
        return {
          url: `/carts`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    updateCartItem: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/carts/item/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    deleteCart: builder.mutation({
      query: (data) => {
        return {
          url: `/carts/item`,
          method: "DELETE",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

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
  useGetAllBusinesFilterQuery,
  useGetSingleProductQuery,
  useGetCategoryWiseProductQuery,
  useAddDesignMutation,
  useGetDesignQuery,
  useDeleteDesignMutation,
  useAddToCartMutation,
  useAddToDesignMutation,
  useGetSingleDesignQuery,
  useGetCartQuery,
  useUpdateCartItemMutation,
  useDeleteCartMutation,
  useGetPopularProductQuery,
  useGetReletedProductQuery,
  useGetSingleCartQuery,
  useGetSingleProductReviewQuery,
} = blog;

import { baseApi } from "./baseApi";

const useApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),

    registerLogin: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: data,
        };
      },
    }),

    getProfile: builder.query({
      query: () => {
        return {
          url: "/auth/profile",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),
    forgotPassword: builder.mutation({
      query: (email) => {
        return {
          url: "/auth/forgot",
          method: "POST",
          body: email,
        };
      },
    }),

    resendOtp: builder.mutation({
      query: (email) => {
        return {
          url: "/auth/email/send-verification",
          method: "POST",
          body: email,
        };
      },
    }),

    verifyOtp: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/verify-otp",
          method: "POST",
          body: data,
        };
      },
    }),

    verifyRegisterOtp: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/email/verify",
          method: "POST",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: data,
        };
      },
    }),
    updateProfile: builder.mutation({
      query: ({data,id}) => {
        return {
          url: `/users/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: data,
        };
      },
    }),
    getHostUser: builder.query({
      query: ({ user, page, search }) => {
        return {
          url: `/dashboard/get-all-user?role=${user}&page=${page}&searchTerm=${search}`,
          method: "GET",
        };
      },
      providesTags: ["host"],
    }),

    blockUserHost: builder.mutation({
      query: (data) => ({
        url: `/dashboard/block-unblock-user`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["host"],
    }),

    
    deleteUserAccount: builder.mutation({
      query: () => {
        return {
          url: `/users/profile`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useGetProfileQuery,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetHostUserQuery,
  useBlockUserHostMutation,
  useRegisterLoginMutation,
  useVerifyRegisterOtpMutation,
  useResendOtpMutation,
  useDeleteUserAccountMutation
} = useApi;

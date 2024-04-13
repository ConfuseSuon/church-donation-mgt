// Need to use the React-specific entry point to allow generating React hooks

import apiSlice from "../features/apiSlice";
import { showMessage } from "../utils/help";

export const donationAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDonations: builder.query<any, void>({
      query: () => "/donation/all",
      transformResponse: (resp: any) => {
        return resp?.data;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data;
      },
      providesTags: ["Donation"],
    }),
    postDonation: builder.mutation<any, any>({
      query: (body) => ({
        url: "/donation/add",
        method: "POST",
        body,
      }),
      transformResponse: (resp: any) => {
        showMessage("success", resp?.message);
        return resp;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        console.log(baseQueryReturnValue, "bbb");
        showMessage("error", baseQueryReturnValue?.data?.message);
        return baseQueryReturnValue?.data;
      },
      invalidatesTags: ["Donation"],
    }),
    updateDonation: builder.mutation<any, any>({
      query: ({ formData, id }) => ({
        url: `/donation/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      transformResponse: (resp: any) => {
        showMessage("success", resp?.message);
        return resp;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        console.log(baseQueryReturnValue, "bbb");
        showMessage("error", baseQueryReturnValue?.data?.message);
        return baseQueryReturnValue?.data;
      },
      invalidatesTags: ["Donation"],
    }),
    deleteDonation: builder.mutation<any, any>({
      query: (id) => ({
        url: `/donation/delete/${id}`,
        method: "DELETE",
        body: id,
      }),
      transformResponse: (resp: any) => {
        showMessage("success", resp?.message);
        return resp;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        console.log(baseQueryReturnValue, "bbb");
        showMessage("error", baseQueryReturnValue?.data?.message);
        return baseQueryReturnValue?.data;
      },
      invalidatesTags: ["Donation"],
    }),
  }),
});

export const {
  useGetDonationsQuery,
  usePostDonationMutation,
  useUpdateDonationMutation,
  useDeleteDonationMutation,
} = donationAPI;

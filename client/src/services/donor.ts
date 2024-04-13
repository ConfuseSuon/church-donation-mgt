// Need to use the React-specific entry point to allow generating React hooks

import apiSlice from "../features/apiSlice";
import { showMessage } from "../utils/help";

export const donorAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDonors: builder.query<any, void>({
      query: () => "/donor/all",
      transformResponse: (resp: any) => {
        return resp?.data;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data;
      },
      providesTags: ["Donor"],
    }),
    postDonor: builder.mutation<any, any>({
      query: (body) => ({
        url: "/donor/add",
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
      invalidatesTags: ["Donor"],
    }),
    updateDonor: builder.mutation<any, any>({
      query: ({ formData, id }) => ({
        url: `/donor/update/${id}`,
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
      invalidatesTags: ["Donor"],
    }),
    deleteDonor: builder.mutation<any, any>({
      query: (id) => ({
        url: `/donor/delete/${id}`,
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
      invalidatesTags: ["Donor"],
    }),
  }),
});

export const {
  useGetDonorsQuery,
  usePostDonorMutation,
  useUpdateDonorMutation,
  useDeleteDonorMutation,
} = donorAPI;

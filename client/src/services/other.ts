import apiSlice from "../features/apiSlice";
import { showMessage } from "../utils/help";

export const emailCertificate = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postEmailCertificate: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/certificate/email",
        method: "POST",
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
    }),
    postEmailReceipt: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/receipt/send",
        method: "POST",
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
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { usePostEmailCertificateMutation, usePostEmailReceiptMutation } =
  emailCertificate;

import { addTokenToRequest } from "@/lib/utils";
import { Order } from "@/views/orders";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderReportService = createApi({
  reducerPath: "orderReportService",
  tagTypes: ["orderReport"],
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL
   ,
    prepareHeaders: async (headers, { getState }) => {
      headers.set("Accept", "application/json");
      await addTokenToRequest(headers, { getState });
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrderReport: builder.query({
      query: ({ buisnessId, customerId, perPage }) => ({ 
        url: `/order/report?business_id=${buisnessId}&customer_id=${customerId}&per_page=${perPage}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: Order[] }) =>
        data?.sort((a, b) => b.id - a.id), 
      providesTags: ["orderReport"],
    }),
  }),
});

export const { useGetOrderReportQuery } = orderReportService; 
export default orderReportService;

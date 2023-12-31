import { addTokenToRequest } from "@/lib/utils";
import { Brand } from "@/views/brands";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const brandService = createApi({
  reducerPath: "brandService",
  tagTypes: ["brand"],
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
    createBrand: builder.mutation({
      query: ({ data }) => ({
        url: "/brands/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["brand"],
    }),
    getBrands: builder.query({
      query: ({ buisnessId, perPage }) => ({
        url: `/brands?business_id=${buisnessId}&per_page=${perPage}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: Brand[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["brand"],
    }),
  }),
});

export const { useCreateBrandMutation, useGetBrandsQuery } = brandService;
export default brandService;

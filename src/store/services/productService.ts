import { addTokenToRequest } from "@/lib/utils";
import { Product } from "@/views/products-list";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productService = createApi({
  reducerPath: "productService",
  tagTypes: ["product"],
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
    createProduct: builder.mutation({
      query: ({ data }) => ({
        url: "/products/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    getProducts: builder.query({
      query: ({ buisnessId, perPage }) => ({
        url: `/products?business_id=${buisnessId}&per_page=${perPage}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: Product[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["product"],
    }),
    getSpecificProducts: builder.query({
      query: ({ buisnessId,product_id }) => ({
       
        url: `/products/without-token/product-id=${product_id}business_id=${buisnessId}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: Product[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ data }) => ({
        url: `/products/edit/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/products/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["product"],
    }),
    importData: builder.mutation({
      query: ({data}) => ({
        url: '/import',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['product'],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetSpecificProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useImportDataMutation
} = productService;
export default productService;

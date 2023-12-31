import { addTokenToRequest } from "@/lib/utils";
import { Category } from "@/views/categories";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const roleService = createApi({
  reducerPath: "roleService",
  tagTypes: ["role"],
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
    createRole: builder.mutation({
      query: ({ data }) => ({
        url: "/role/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["role"],
    }),
    getRoles: builder.query({
      query: ({ buisnessId, perPage }) => ({
        url: `/role?business_id=${buisnessId}&per_page=${perPage}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: Category[] }) =>
        data?.sort((a, b) => b.id - a.id),
      providesTags: ["role"],
    }),
  }),
});

export const { useCreateRoleMutation, useGetRolesQuery } = roleService;
export default roleService;

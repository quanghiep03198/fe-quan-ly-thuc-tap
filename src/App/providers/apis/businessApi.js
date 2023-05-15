import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosBaseQuery";

const businessApi = createApi({
	reducerPath: "businessApi",
	baseQuery: axiosBaseQuery(),
	tagTypes: ["Business"],
	endpoints: (build) => ({
		getAllCompany: build.query({
			query: (params) => ({ url: "/business", method: "GET", params}),
			providesTags: ["Business"],
		}),
		getOneCompany: build.query({
			query: (payload) => ({url: `/business/${payload.id}`, method:"GET"})
		}),
		addCompany: build.mutation({
			query: (payload) => ({url: '/business/new', method: "POST", data: payload})
		}),
		updateCompany: build.mutation({
			query: (payload) => ({url: `/business/${payload.id}`, method: "PATCH", data: payload.data})
		}),
		deleteCompany: build.mutation({
			query: (payload) => ({url: `/business/${payload.id}`, method: "DELETE"})
		})
	}),
});

export const { useGetAllCompanyQuery, useAddCompanyMutation, useDeleteCompanyMutation, useUpdateCompanyMutation, useGetOneCompanyQuery } = businessApi;

export default businessApi;

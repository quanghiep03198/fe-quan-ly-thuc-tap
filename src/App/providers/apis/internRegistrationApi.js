import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../axiosBaseQuery';

const internRegistrationApi = createApi({
	reducerPath: 'registerInternApi',
	baseQuery: axiosBaseQuery(),
	endpoints: (build) => ({
		uploadCv: build.mutation({
			query: (payload) => {
				return { url: '/intern/support', method: 'PATCH', data: payload };
			}
		})
	})
});

export const { useUploadCvMutation } = internRegistrationApi;
export default internRegistrationApi;

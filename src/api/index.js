import { apiRoutes } from '@/api/apiRoutes'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// const apiLink = 'https://fls-lesson-14-emr-backend.onrender.com/'
const apiLink = 'http://localhost:3000/'

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: apiLink }),
	tagTypes: ['Patients', 'Doctors', 'Appointments'],
	endpoints: (builder) => ({
		getPatients: builder.query({
			query: () => apiRoutes.patients.getAll,
			providesTags: ['Patients'],
		}),
		getPatientById: builder.query({
			query: (id) => apiRoutes.patients.getById(id),
			providesTags: (result, error, id) => [{ type: 'Patients', id }],
		}),
		getPatientByName: builder.query({
			query: (name) => apiRoutes.patients.filterByName(name),
			providesTags: ['Patients'],
		}),
		createPatient: builder.mutation({
			query: (data) => ({
				url: apiRoutes.patients.create,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: (result, error, id) => ['Patients'],
		}),
		updatePatient: builder.mutation({
			query: ({ id, ...data }) => ({
				url: apiRoutes.patients.update(id),
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: (result, error, id) => ['Patients', { type: 'Patients', id }],
		}),
		deletePatient: builder.mutation({
			query: (id) => ({
				url: apiRoutes.patients.delete(id),
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, id) => ['Patients', { type: 'Patients', id }],
		}),
		// Doctors
		getDoctors: builder.query({
			query: () => apiRoutes.doctors.getAll,
			providesTags: ['Doctors'],
		}),
		getDoctorById: builder.query({
			query: (id) => apiRoutes.doctors.getById(id),
			providesTags: (result, error, id) => [{ type: 'Doctors', id }],
		}),
		deleteDoctor: builder.mutation({
			query: (id) => ({
				url: apiRoutes.doctors.delete(id),
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, id) => ['Doctors', { type: 'Doctors', id }],
		}),
		updateDoctor: builder.mutation({
			query: ({ id, ...data }) => ({
				url: apiRoutes.doctors.update(id),
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: (result, error, id) => [('Doctors', { type: 'Doctors', id })],
		}),
		createDoctor: builder.mutation({
			query: (data) => ({
				url: apiRoutes.doctors.create,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Doctors'],
		}),
		// Appointments
		getAppointments: builder.query({
			query: () => apiRoutes.appointments.getAll,
			providesTags: ['Appointments'],
		}),
		getAppointmentsById: builder.query({
			query: (id) => apiRoutes.appointments.getById(id),
			providesTags: (result, error, id) => [{ type: 'Appointments', id }],
		}),
		createAppointment: builder.mutation({
			query: (data) => ({
				url: apiRoutes.appointments.create,
				method: 'POST',
				body: data,
			}),

			invalidatesTags: ['Appointments'],
		}),
		updateAppointment: builder.mutation({
			query: ({ id, ...data }) => ({
				url: apiRoutes.appointments.update(id),
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: (result, error, { id }) => ['Appointments', { type: 'Appointments', id }],
		}),
		deleteAppointment: builder.mutation({
			query: (id) => ({
				url: apiRoutes.appointments.delete(id),
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, id) => ['Appointments', { type: 'Appointments', id }],
		}),
	}),
})
// update: (id) => `/appointments/${id}`,
export const {
	// Patients
	useGetPatientsQuery,
	useGetPatientByIdQuery,
	useGetPatientByNameQuery,
	useDeletePatientMutation,
	useUpdatePatientMutation,
	useCreatePatientMutation,
	// Doctors
	useGetDoctorsQuery,
	useGetDoctorByIdQuery,
	useUpdateDoctorMutation,
	useCreateDoctorMutation,
	useDeleteDoctorMutation,
	// Appointments
	useGetAppointmentsQuery,
	useGetAppointmentsByIdQuery,
	useCreateAppointmentMutation,
	useUpdateAppointmentMutation,
	useDeleteAppointmentMutation,
} = api

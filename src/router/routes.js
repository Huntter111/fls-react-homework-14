import Layout from '@/components/Layout'
import AppointmentList from '@/pages/Appointments'
import AppointmentForm from '@/pages/Appointments/AppointmentForm'
import DoctorsList from '@/pages/Doctors'
import DoctorsForm from '@/pages/Doctors/DoctorsForm'
import Home from '@/pages/Home'
import Page404 from '@/pages/Page404'
import PatientsList from '@/pages/Patients'
import PatientsForm from '@/pages/Patients/PatientsForm'
import { frontRoutes } from '@/router/frontRoutes'

export const routes = [
	{
		path: frontRoutes.pages.home,
		Component: Layout,
		children: [
			{
				index: true,
				Component: Home,
				meta: {
					labelForMainMenu: 'Головна',
				},
			},
			{
				path: frontRoutes.pages.patients.base,
				children: [
					{
						index: true,
						Component: PatientsList,
						meta: {
							labelForMainMenu: 'Пацієнти',
						},
					},
					{
						path: frontRoutes.pages.patients.edit,
						Component: PatientsForm,
					},
				],
			},
			{
				path: frontRoutes.pages.doctors.base,
				children: [
					{
						index: true,
						Component: DoctorsList,
						meta: {
							labelForMainMenu: 'Лікарі',
						},
					},
					{
						path: frontRoutes.pages.doctors.edit,
						Component: DoctorsForm,
					},
				],
			},
			{
				path: frontRoutes.pages.appointments.base,
				children: [
					{
						index: true,
						Component: AppointmentList,
						meta: {
							labelForMainMenu: 'Призначення',
						},
					},
					{
						path: frontRoutes.pages.appointments.edit,
						Component: AppointmentForm,
					},
				],
			},
			{
				path: '*',
				Component: Page404,
			},
		],
	},
]

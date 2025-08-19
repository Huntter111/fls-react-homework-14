// import AppointmentForm from '@/pages/Appointments/AppointmentForm'

export const frontRoutes = {
	pages: {
		home: '/',
		privacyPolicy: '/privacy-policy',
		termsOfUse: '/terms-of-use',
		patients: {
			base: 'patients',
			edit: 'edit/:id?',
			search: 'patients?',
		},
		doctors: {
			base: 'doctors',
			edit: 'edit/:id?',
		},
		appointments: {
			base: 'appointments',
			edit: 'edit/:id?',
		},
	},
	navigate: {
		patients: {
			list: '/patients/',
			edit: (id) => `edit/${id}`,
			create: 'edit',
		},
		doctors: {
			list: '/doctors/',
			edit: (id) => `edit/${id}`,
			create: 'edit',
		},
		appointments: {
			list: '/appointments/',
			edit: (id) => `edit/${id}`,
			create: 'edit',
		},
	},
}

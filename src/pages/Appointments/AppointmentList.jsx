import { useGetAppointmentsQuery } from '@/api'
import CenteredLoader from '@/components/CenteredLoader'
import AppointmentItem from '@/pages/Appointments/AppointmentItem'
import { frontRoutes } from '@/router/frontRoutes'
import { Link } from 'react-router'

const AppointmentList = () => {
	const { data: appointmentsList, isLoading, isError, isFetching } = useGetAppointmentsQuery()
	if (isError) return <div>Помилка при завантажені даних</div>
	return (
		<div>
			<h1 className="title">Список призначень</h1>

			<div className="flex justify-end mb-8">
				<Link
					to={frontRoutes.navigate.appointments.create}
					className="inline-block bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-5 py-2 rounded-md shadow transition duration-200"
				>
					Додати новий запис
				</Link>
			</div>

			{isLoading || isFetching ? (
				<CenteredLoader />
			) : (
				<div className="grid gap-4">
					{appointmentsList.map((appointment) => (
						<AppointmentItem key={appointment.id} appointmentData={appointment} />
					))}
				</div>
			)}
		</div>
	)
}

export default AppointmentList

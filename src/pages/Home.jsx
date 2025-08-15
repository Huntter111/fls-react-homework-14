import { useGetAppointmentsQuery, useGetDoctorsQuery, useGetPatientsQuery } from '@/api'
import SmallLoader from '@/components/SmallLoader'
import { useNavigate } from 'react-router'

const Home = () => {
	const navigate = useNavigate()
	const { data: patientsList, isLoading: isLoadingPatients } = useGetPatientsQuery()
	const { data: doctorsList, isLoading: isLoadingDoctors } = useGetDoctorsQuery()
	const { data: appointmentsList, isLoading: isLoadingAppointment } = useGetAppointmentsQuery()

	return (
		<div className="p-6 space-y-6">
			{/* Заголовок */}
			<div className="text-center">
				<h1 className="text-3xl font-bold text-gray-800">Вітаємо у CRM Системі</h1>
				<p className="text-gray-600 mt-2">
					Це сучасна платформа для ефективного управління пацієнтами, лікарями та записами.
				</p>
			</div>

			{/* Статистика */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
					<h2 className="text-lg font-medium text-gray-700">Кількість пацієнтів</h2>
					<div className="text-2xl font-bold text-blue-600 mt-2">
						{isLoadingPatients ? <SmallLoader /> : (patientsList?.length ?? 0)}
					</div>
				</div>

				<div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
					<h2 className="text-lg font-medium text-gray-700">Кількість лікарів</h2>
					<div className="text-2xl font-bold text-green-600 mt-2">
						{isLoadingDoctors ? <SmallLoader /> : (doctorsList?.length ?? 0)}
					</div>
				</div>

				<div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
					<h2 className="text-lg font-medium text-gray-700">Кількість записів</h2>
					<div className="text-2xl font-bold text-red-600 mt-2">
						{isLoadingAppointment ? <SmallLoader /> : (appointmentsList?.length ?? 0)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home

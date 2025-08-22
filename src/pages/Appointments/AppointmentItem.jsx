import {
	useDeleteAppointmentMutation,
	useGetDoctorByIdQuery,
	useGetPatientByIdQuery,
	useUpdateAppointmentMutation,
} from '@/api'
import { getDate } from '@/helpers'
import { selectOptions } from '@/pages/Appointments/settings'
import { frontRoutes } from '@/router/frontRoutes'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const getStatusClass = (status) => {
	switch (status) {
		case 'active':
			return 'bg-green-100 text-green-800'
		case 'scheduled':
			return 'bg-blue-100 text-blue-800'
		case 'completed':
			return 'bg-gray-200 text-gray-900'
		case 'cancelled':
			return 'bg-red-100 text-red-800'
		default:
			return 'bg-gray-100 text-gray-600'
	}
}

const AppointmentItem = ({ appointmentData }) => {
	console.log('🚀 ~ AppointmentItem ~ appointmentData:', appointmentData)
	const { fullDate, fullTime } = getDate(appointmentData?.date)
	const navigate = useNavigate()
	const { data: patient } = useGetPatientByIdQuery(appointmentData?.patientId)
	const { data: doctor } = useGetDoctorByIdQuery(appointmentData?.doctorId)
	const [updateAppointment, { isLoading: isUpdating }] = useUpdateAppointmentMutation()

	const [deleteAppointment, { isLoading: isDeleting }] = useDeleteAppointmentMutation()
	if (!appointmentData) return null

	const handleChangeSelect = async (e) => {
		const value = e.target.value
		await updateAppointment({ id: appointmentData.id, status: value })
	}
	const onEdit = (id) => {
		navigate(frontRoutes.navigate.appointments.edit(id))
	}
	const handleDeleteAppointment = async () => {
		await deleteAppointment(appointmentData?.id)
	}

	console.log('appointmentData', appointmentData)
	return (
		<div className="border border-blue-700 rounded-xl p-6 shadow-md bg-white space-y-5 transition-all duration-300 hover:shadow-lg">
			{/* Верхній рядок: Дата + Час — Статус */}
			<div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center gap-2">
				<div className="flex flex-col text-base text-gray-700 font-semibold space-y-1">
					<span>📋 Запис №{appointmentData?.id}</span>
					<span>📅 {fullDate}</span>
					<span>⏰ {fullTime}</span>
				</div>

				<select
					disabled={isUpdating}
					value={appointmentData.status}
					onChange={handleChangeSelect}
					className={`text-base font-medium px-3 py-2 rounded-md cursor-pointer border-none focus:outline-none shadow-sm transition
				${getStatusClass(appointmentData.status)}
				${isUpdating ? 'opacity-60 cursor-not-allowed bg-gray-200 text-gray-500' : ''}
			`}
				>
					{Object.entries(selectOptions).map(([value, label]) => (
						<option value={value} key={value}>
							{label}
						</option>
					))}
				</select>
			</div>

			<div className="text-base text-gray-800 leading-relaxed space-y-1">
				<p>
					<span className="font-semibold">👤 Пацієнт:</span> {patient?.fullName || '—'}
				</p>
				<p>
					<span className="font-semibold">🩺 Лікар:</span> {doctor?.fullName || '—'}
				</p>
			</div>

			<div className="text-base text-gray-800">
				<span className="font-semibold">📌 Причина візиту:</span> {appointmentData.reason}
			</div>

			<div className="flex justify-center gap-3 pt-2 md:justify-end">
				<button
					onClick={() => onEdit(appointmentData?.id)}
					disabled={isDeleting || isUpdating}
					className="px-5 py-2 text-base font-medium rounded-md transition duration-200 shadow-sm 
			bg-blue-600 hover:bg-blue-700 text-white
			disabled:bg-blue-300 disabled:text-white disabled:cursor-not-allowed disabled:hover:bg-blue-300"
				>
					✏️ Редагувати
				</button>

				<button
					onClick={handleDeleteAppointment}
					disabled={isDeleting || isUpdating}
					className="px-5 py-2 text-base font-medium rounded-md transition duration-200 shadow-sm 
			bg-red-600 hover:bg-red-700 text-white
			disabled:bg-red-300 disabled:text-white disabled:cursor-not-allowed disabled:hover:bg-red-300"
				>
					🗑️ {isDeleting ? 'Видалення...' : 'Видалити'}
				</button>
			</div>
		</div>
	)
}

export default AppointmentItem

//   {
//     "id": "a004",
//     "patientId": "p004",
//     "doctorId": "d004",
//     "date": "2025-08-02T13:00:00Z",
//     "reason": "Біль у коліні",
//     "status": "completed"
//   },
// "status": "completed"
// "status": 'active'
//  "status": "scheduled"
// "status": "cancelled"

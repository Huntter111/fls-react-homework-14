import {
	useCreateAppointmentMutation,
	useGetAppointmentsByIdQuery,
	useGetDoctorsQuery,
	useGetPatientsQuery,
	useUpdateAppointmentMutation,
} from '@/api'
import { emptyAppointmentData } from '@/pages/Appointments/settings'
import { frontRoutes } from '@/router/frontRoutes'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const AppointmentForm = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { data: appointment, isLoading, isError } = useGetAppointmentsByIdQuery(id)
	const { data: patients, isLoading: isLoadingPatient, isError: isErrorPatient } = useGetPatientsQuery()

	const { data: doctors, isLoading: isLoadingDoctors, isError: isErrorDoctors } = useGetDoctorsQuery()

	const [updateAppointment, { isLoading: isUpdating }] = useUpdateAppointmentMutation()
	const [createAppointment, { isLoading: isCreating }] = useCreateAppointmentMutation()

	const [appointmentData, setAppointmentData] = useState(emptyAppointmentData)
	console.log('🚀 ~ AppointmentForm ~ appointmentData:', appointmentData)
	useEffect(() => {
		if (id && appointment) {
			setAppointmentData(appointment)
		} else {
			setAppointmentData(emptyAppointmentData)
		}
	}, [id, appointment])

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (id) await updateAppointment(appointmentData)
		else await createAppointment(appointmentData)
		navigate(frontRoutes.navigate.appointments.list)
	}

	const handleButton = id ? 'Зберегти зміни' : 'Створити запис'
	return (
		<div className="my-4">
			<h1 className="title">{id ? 'Редагувати запис' : 'Новий запис'}</h1>
			<form onSubmit={handleSubmit} className="space-y-4 max-w-4xl mx-auto">
				{/* Пацієнт */}
				<label className="block">
					<span className="block font-medium">Пацієнт:</span>
					<select
						value={appointmentData.patientId}
						onChange={(e) => setAppointmentData((prev) => ({ ...prev, patientId: e.target.value }))}
						className="w-full rounded border px-2 py-1"
					>
						<option disabled value="">
							Виберіть пацієнта
						</option>
						{patients?.map((p) => (
							<option key={p.id} value={p.id}>
								{p.fullName}
							</option>
						))}
					</select>
				</label>

				{/* Лікар */}
				<label className="block">
					<span className="block font-medium">Лікар:</span>
					<select
						value={appointmentData.doctorId}
						onChange={(e) => setAppointmentData((prev) => ({ ...prev, doctorId: e.target.value }))}
						className="w-full rounded border px-2 py-1"
					>
						<option disabled value="">
							Виберіть лікаря
						</option>
						{doctors?.map((d) => (
							<option key={d.id} value={d.id}>
								{d.fullName}
							</option>
						))}
					</select>
				</label>

				{/* Дата */}
				<label className="block">
					<span className="block font-medium">Дата і час:</span>
					<input
						type="datetime-local"
						value={appointmentData.date?.slice(0, 16)} // ISO string
						onChange={(e) => setAppointmentData((prev) => ({ ...prev, date: e.target.value }))}
						className="w-full rounded border px-2 py-1"
					/>
				</label>

				{/* Причина */}
				<label className="block">
					<span className="block font-medium">Причина:</span>
					<textarea
						type="text"
						value={appointmentData.reason}
						onChange={(e) => setAppointmentData((prev) => ({ ...prev, reason: e.target.value }))}
						className="w-full rounded border px-2 py-1"
					/>
				</label>

				{/* Статус */}
				<label className="block">
					<span className="block font-medium">Статус:</span>
					<select
						value={appointmentData.status}
						onChange={(e) => setAppointmentData((prev) => ({ ...prev, status: e.target.value }))}
						className="w-full rounded border px-2 py-1"
					>
						<option value="scheduled">Заплановано</option>
						<option value="active">Активний</option>
						<option value="completed">Завершено</option>
						<option value="cancelled">Скасовано</option>
					</select>
				</label>

				<div className="flex gap-4">
					<button
						disabled={isUpdating || isCreating}
						type="submit"
						className="bg-blue-600 border border-transparent text-white rounded px-4 py-2 hover:bg-blue-700 hover:cursor-pointer disabled:bg-blue-300 disabled:hover:bg-blue-300 disabled:hover:cursor-not-allowed"
					>
						{isUpdating || isCreating ? 'Збереження...' : handleButton}
					</button>
					<button
						className="px-4 py-2 font-medium rounded-md border bg-gray-100 hover:bg-gray-200 text-gray-700 hover:cursor-pointer"
						onClick={() => navigate(-1)}
					>
						Скасувати
					</button>
				</div>
			</form>
		</div>
	)
}

export default AppointmentForm

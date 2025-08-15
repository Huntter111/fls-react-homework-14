import { useDeleteDoctorMutation } from '@/api'
import { frontRoutes } from '@/router/frontRoutes'

import { Link } from 'react-router'

const DoctorItem = ({ doctor }) => {
	const [deleteDoctor, { isLoading: isDeletingDoctor }] = useDeleteDoctorMutation()

	const handleDeleteDoctor = async () => {
		await deleteDoctor(doctor?.id)
	}
	return (
		<div className="flex flex-col h-full bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-shadow duration-300">
			{/* Заголовок */}
			<div className="flex justify-between items-start mb-3">
				<div>
					<h3 className="text-xl font-bold text-gray-900">{doctor.fullName}</h3>
					<p className="text-sm text-gray-500">ID: {doctor.id}</p>
				</div>
				<span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
					{doctor.specialty}
				</span>
			</div>

			{/* Контактна інформація */}
			<div className="space-y-2 text-sm">
				<p>
					<span className="font-medium text-gray-700">Email:</span> {doctor.email}
				</p>
				<p>
					<span className="font-medium text-gray-700">Телефон:</span> {doctor.phone}
				</p>
				<p>
					<span className="font-medium text-gray-700">Кабінет:</span> {doctor.room}
				</p>
			</div>

			{/* Нотатки */}
			{doctor.notes && (
				<div className="text-sm text-gray-600 italic bg-gray-50 border border-gray-200 rounded-lg p-3 mt-3">
					{doctor.notes}
				</div>
			)}

			{/* Кнопки */}
			<div className="flex gap-3 mt-auto pt-5">
				<Link
					to={frontRoutes.navigate.doctors.edit(doctor.id)}
					className="flex-1 text-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-4 py-2 rounded-lg shadow transition"
				>
					Редагувати
				</Link>
				<button
					disabled={isDeletingDoctor}
					onClick={handleDeleteDoctor}
					className="flex-1 text-center bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium px-4 py-2 rounded-lg shadow transition disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:cursor-not-allowed"
				>
					{isDeletingDoctor ? 'Видалення...' : 'Видалити'}
				</button>
			</div>
		</div>
	)
}

export default DoctorItem

import { useDeletePatientMutation } from '@/api'
import { frontRoutes } from '@/router/frontRoutes'
import { Link } from 'react-router'

const PatientItem = ({ patientData }) => {
	const [deletePatient, { isLoading }] = useDeletePatientMutation()

	if (!patientData) return null

	const { fullName, birthDate, gender, phone, email, address, notes } = patientData
	const onDelete = () => {
		deletePatient(patientData.id)
	}
	return (
		<div className="flex flex-col bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-md p-4 md:p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300">
			{/* Ім'я */}
			<h2 className="text-xl font-bold text-gray-900 mb-1">{fullName}</h2>
			<p className="text-sm text-gray-500 mb-4">
				{gender === 'male' ? 'Чоловік' : 'Жінка'} • {new Date(birthDate).toLocaleDateString()}
			</p>

			{/* Інформація */}
			<div className="space-y-2 text-sm text-gray-700 flex-grow">
				<p>
					<span className="font-medium text-gray-900">📞 Телефон:</span> {phone}
				</p>
				<p>
					<span className="font-medium text-gray-900">✉️ Email:</span> {email}
				</p>
				<p>
					<span className="font-medium text-gray-900">🏠 Адреса:</span> {address}
				</p>
				{notes && (
					<p>
						<span className="font-medium text-gray-900">📝 Нотатки:</span> {notes}
					</p>
				)}
			</div>

			{/* Кнопки */}
			<div className="flex gap-3 mt-5">
				<Link
					to={frontRoutes.navigate.patients.edit(patientData.id)}
					className="flex-1 text-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg shadow hover:shadow-lg transition-all duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
				>
					Редагувати
				</Link>
				<button
					onClick={onDelete}
					disabled={isLoading}
					className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold px-5 py-2 rounded-lg shadow hover:shadow-lg transition-all duration-200 disabled:bg-red-300 disabled:cursor-not-allowed"
				>
					{isLoading ? 'Видалення...' : 'Видалити'}
				</button>
			</div>
		</div>
	)
}

export default PatientItem

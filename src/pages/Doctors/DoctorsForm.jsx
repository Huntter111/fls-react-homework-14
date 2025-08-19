import { useCreateDoctorMutation, useGetDoctorByIdQuery, useUpdateDoctorMutation } from '@/api'
import CenteredLoader from '@/components/CenteredLoader'
import { doctorInputFields, emptyDoctorData } from '@/pages/Doctors/settings'
import { frontRoutes } from '@/router/frontRoutes'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const DoctorsForm = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { data: doctor, isLoading, isError } = useGetDoctorByIdQuery(id)

	const [updateDoctor, { isLoading: isUpdatingDoctor, isError: isErrorDoctor }] = useUpdateDoctorMutation(doctor?.id)
	const [createDoctor, { isLoading: isCreatingDoctor }] = useCreateDoctorMutation()
	const [doctorData, setDoctorData] = useState(emptyDoctorData)

	useEffect(() => {
		if (doctor) setDoctorData(doctor)
	}, [doctor])

	const handleInputChange = (e) => {
		setDoctorData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (id) await updateDoctor(doctorData)
		else await createDoctor(doctorData)
		navigate(frontRoutes.navigate.doctors.list)
	}
	const handleButton = id ? 'Зберегти' : 'Додати'
	if (id && isLoading) return <CenteredLoader />
	if (id && isError) return <div>Не вдалось завантажити дані лікаря</div>
	return (
		<div>
			<h1 className="title">{id ? 'Редагувати лікаря' : 'Додати лікаря'}</h1>
			<form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-6">
				{doctorInputFields.map((doctorFields, index) => (
					<label key={index} className="flex flex-col gap-1 text-gray-700 font-medium">
						<span>{doctorFields.label}</span>
						<input
							value={doctorData[doctorFields?.name]}
							type={doctorFields.type}
							name={doctorFields.name}
							required={doctorFields.name !== 'notes'}
							placeholder={doctorFields.placeholder}
							onChange={handleInputChange}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
						/>
					</label>
				))}
				<div className="flex gap-4">
					<button
						disabled={isUpdatingDoctor || isCreatingDoctor}
						type="submit"
						className={` font-semibold px-4 py-2 rounded-lg transition 
		${
			isUpdatingDoctor || isCreatingDoctor
				? 'bg-gray-400 cursor-not-allowed'
				: 'bg-blue-600 hover:bg-blue-700 text-white'
		}`}
					>
						{isUpdatingDoctor || isCreatingDoctor ? 'Збереження...' : handleButton}
					</button>

					<button
						disabled={isUpdatingDoctor || isCreatingDoctor}
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

export default DoctorsForm

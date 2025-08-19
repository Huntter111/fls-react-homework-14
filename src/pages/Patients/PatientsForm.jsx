import { useCreatePatientMutation, useGetPatientByIdQuery, useUpdatePatientMutation } from '@/api'
import CenteredLoader from '@/components/CenteredLoader'
import { emptyPatientData, patientInputsFields } from '@/pages/Patients/settings'
import { frontRoutes } from '@/router/frontRoutes'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const PatientsForm = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { data: patientData, isLoading, isError } = useGetPatientByIdQuery(id, { skip: !id })
	const [updatePatient, { isLoading: isSaving }] = useUpdatePatientMutation()
	const [createPatient, { isLoading: isCreating }] = useCreatePatientMutation()

	const [formData, setFormData] = useState(() => emptyPatientData)
	useEffect(() => {
		if (patientData) setFormData(patientData)
	}, [patientData])

	const handleInput = (e) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}))
	}
	const onSave = async (e) => {
		e.preventDefault()
		if (id) {
			await updatePatient(formData)
		} else {
			await createPatient(formData)
		}
		navigate(frontRoutes.navigate.patients.list)
	}
	const saveButton = id ? 'Зберегти' : 'Створити'
	if (isError) return <div>Error: {isError.message}</div>
	if (isLoading) return <CenteredLoader />
	return (
		<div>
			<h1 className="title">{id ? 'Редагування' : 'Створення'} пацієнта</h1>

			<form onSubmit={onSave} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
				<div className="space-y-4">
					{patientInputsFields.map((patientInput, index) => {
						return (
							<label key={index} className="block">
								<span className="block text-sm font-medium text-gray-700 mb-1">{patientInput.label}</span>
								<input
									type={patientInput.type}
									name={patientInput.name}
									placeholder={patientInput.placeholder}
									value={formData[patientInput?.name]}
									onChange={handleInput}
									className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
								/>
							</label>
						)
					})}
				</div>
				<div className="flex gap-4">
					<button
						type="submit"
						disabled={isSaving || isCreating}
						className={`w-full sm:w-auto px-6 py-2 rounded-md text-white font-semibold shadow transition
    ${
			isSaving || isCreating
				? 'bg-gray-400 cursor-not-allowed opacity-70'
				: 'bg-blue-600 hover:bg-blue-700 hover:cursor-pointer active:bg-blue-800'
		}`}
					>
						{isSaving || isCreating ? 'Збереження...' : saveButton}
					</button>

					<button
						disabled={isSaving || isCreating}
						className={`px-4 py-2 font-medium rounded-md border text-gray-700 transition
    ${
			isSaving || isCreating
				? 'bg-gray-200 cursor-not-allowed opacity-70'
				: 'bg-gray-100 hover:bg-gray-200 hover:cursor-pointer'
		}`}
						onClick={() => navigate(-1)}
					>
						Скасувати
					</button>
				</div>
			</form>
		</div>
	)
}

export default PatientsForm

import { useGetPatientByNameQuery, useGetPatientsQuery } from '@/api'
import CenteredLoader from '@/components/CenteredLoader'
import { onClear } from '@/helpers'
import PatientItem from '@/pages/Patients/Patientitem'
import { frontRoutes } from '@/router/frontRoutes'
import { useDeferredValue, useEffect, useState } from 'react'
import { Link } from 'react-router'

const PatientsList = () => {
	const [patients, setPatients] = useState([])
	const [searchPatientByName, setSearchPatientByName] = useState('')
	const deferredPatient = useDeferredValue(searchPatientByName)

	const { data: patientsList, isLoading } = useGetPatientsQuery()
	const { data: patientsByName } = useGetPatientByNameQuery(deferredPatient, { skip: !deferredPatient.trim() })

	useEffect(() => {
		if (!deferredPatient.trim()) {
			setPatients(patientsList ?? [])
		} else if (patientsByName) {
			setPatients(patientsByName)
		}
	}, [deferredPatient, patientsList, patientsByName])
	return (
		<div>
			<h1 className="title">Список пацієнтів</h1>

			<div className="flex flex-col-reverse sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
				<div className="w-full lg:w-1/3">
					<label htmlFor="patientSearch" className="block text-md font-medium text-gray-700 mb-1">
						Пошук пацієнта
					</label>
					<div className="relative">
						<input
							id="patientSearch"
							type="text"
							value={searchPatientByName}
							onChange={(e) => setSearchPatientByName(e.target.value)}
							placeholder="Введіть ім’я пацієнта"
							className="w-full px-4 pr-8 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
						{deferredPatient && (
							<span
								onClick={() => onClear(setSearchPatientByName)}
								className="cursor-pointer flex justify-center items-center absolute right-[0px] top-[5px] w-[30px] h-[30px] text-gray-500 hover:text-gray-700"
							>
								x
							</span>
						)}
					</div>
				</div>

				<div className="flex justify-end w-full">
					<Link
						to={frontRoutes.navigate.patients.create}
						className="inline-block bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold px-5 py-2 rounded-md shadow transition duration-200"
					>
						Додати пацієнта
					</Link>
				</div>
			</div>

			<div>
				{isLoading ? (
					<CenteredLoader />
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{patients?.map((patient) => (
							<PatientItem key={patient.id} patientData={patient} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default PatientsList

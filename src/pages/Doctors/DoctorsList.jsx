import { useGetDoctorsQuery } from '@/api'
import CenteredLoader from '@/components/CenteredLoader'
import { onClear } from '@/helpers'

import DoctorItem from '@/pages/Doctors/DoctorItem'
import { frontRoutes } from '@/router/frontRoutes'
import { useDeferredValue, useState } from 'react'
import { Link } from 'react-router'

const DoctorsList = () => {
	const { data: doctorsList, isLoading, isError, isFetching } = useGetDoctorsQuery()
	const [searchDoctor, setSearchDoctor] = useState('')
	const deferredDoctor = useDeferredValue(searchDoctor)

	const filteredDoctorsList = doctorsList?.filter((doctor) =>
		deferredDoctor.trim() === '' ? true : doctor.fullName.toLowerCase().includes(deferredDoctor.toLowerCase()),
	)

	if (isLoading || isFetching) {
		return <CenteredLoader />
	}
	if (isError) {
		return <div>Помилка при завантаженні даних:{isError.message}</div>
	}
	return (
		<div>
			<h1 className="text-2xl font-bold text-gray-900 mb-6">Список лікарів</h1>

			{/* Панель пошуку і кнопка */}
			<div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 mb-8">
				<div>
					<label htmlFor="search-doctor" className="block text-md font-medium text-gray-700 mb-1">
						Пошук лікаря
					</label>
					<div className="relative">
						<input
							type="text"
							value={searchDoctor}
							id="search-doctor"
							name="search-doctor"
							placeholder="Почніть вводити ім'я лікаря..."
							onChange={(e) => setSearchDoctor(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
						/>
						{deferredDoctor && (
							<span
								className="hover:cursor-pointer flex justify-center items-center absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 hover:text-gray-600 transition"
								onClick={() => onClear(setSearchDoctor)}
							>
								✕
							</span>
						)}
					</div>
				</div>

				<div className="flex items-end">
					<Link
						to={frontRoutes.navigate.doctors.create}
						className="inline-block bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all duration-200"
					>
						Додати лікаря
					</Link>
				</div>
			</div>

			{/* Сітка карток лікарів */}
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{filteredDoctorsList.map((doctor) => (
					<DoctorItem key={doctor.id} doctor={doctor} />
				))}
			</div>
		</div>
	)
}

export default DoctorsList

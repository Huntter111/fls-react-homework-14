import { Link } from 'react-router'

const Page404 = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
			<h1 className="text-6xl font-extrabold text-blue-600">404</h1>
			<h2 className="text-2xl font-semibold text-gray-800 mt-4">Сторінку не знайдено</h2>
			<p className="text-gray-600 mt-2 text-center max-w-md">
				Схоже, що ви потрапили не туди. Можливо, сторінка була видалена або ви ввели неправильну адресу.
			</p>
			<Link
				to="/"
				className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200"
			>
				Повернутися на головну
			</Link>
		</div>
	)
}

export default Page404

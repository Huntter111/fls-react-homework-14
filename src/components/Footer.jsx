const Footer = () => {
	return (
		<footer className="bg-gray-800 text-gray-300 py-6 mt-10">
			<div className="container">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
					<p className="text-sm">&copy; {new Date().getFullYear()} CRM Система. Усі права захищено.</p>

					<div className="flex flex-col gap-4 md:flex-row md:gap-8 mt-4 md:mt-0">
						<a href="#" className="hover:text-white transition duration-200">
							Політика конфіденційності
						</a>
						<a href="#" className="hover:text-white transition duration-200">
							Умови користування
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer

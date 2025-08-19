import { frontRoutes } from '@/router/frontRoutes'
import { Link } from 'react-router'

const Footer = () => {
	return (
		<footer className="bg-gray-800 text-gray-300 py-6 mt-10">
			<div className="container">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
					<p className="text-sm">&copy; {new Date().getFullYear()} CRM Система. Усі права захищено.</p>

					<div className="flex flex-col gap-4 md:flex-row md:gap-8 mt-4 md:mt-0">
						<Link to={frontRoutes.pages.privacyPolicy} className="hover:text-white transition duration-200">
							Політика конфіденційності
						</Link>
						<Link to={frontRoutes.pages.termsOfUse} className="hover:text-white transition duration-200">
							Умови користування
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer

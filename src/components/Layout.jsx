import Footer from '@/components/Footer'
import Header from '@/components/Header'

import { Outlet } from 'react-router'

const Layout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />

			<div className="container flex-grow">
				<Outlet />
			</div>

			<Footer />
		</div>
	)
}

export default Layout

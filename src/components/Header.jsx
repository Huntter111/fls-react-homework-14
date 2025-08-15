import MainMenu from '@/components/MainMenu'
import { routes } from '@/router/routes'
import React from 'react'

const Header = () => {
	return (
		<header className=" bg-white border-b border-gray-200 shadow-sm py-2 sticky top-0 z-50">
			<div className="container flex gap-4">
				<div className="font-bold flex-grow text-xl">EMR</div>
				<MainMenu routes={routes} />
			</div>
		</header>
	)
}

export default Header

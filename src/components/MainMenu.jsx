import { NavLink } from 'react-router'
function getItemsForMainMenu(routesList, basePath) {
	const resList = []

	routesList.forEach((route) => {
		if (route?.meta?.labelForMainMenu) {
			resList.push({
				path: route.index ? basePath : basePath + route.path,
				label: route.meta.labelForMainMenu,
			})
		}

		if (route.children) {
			resList.push(
				...getItemsForMainMenu(route.children, basePath ? basePath + route.path + '/' : basePath + route.path),
			)
		}
	})

	return resList
}

const MainMenu = ({ routes }) => {
	const itemsForMainMenu = getItemsForMainMenu(routes, '')

	return (
		<nav>
			<ul className="flex gap-4 flex-wrap sm:gap-4 items-center">
				{itemsForMainMenu.map((item, index) => (
					<li key={index}>
						<NavLink
							className={({ isActive }) =>
								isActive
									? 'bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow transition-all duration-200'
									: 'text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200'
							}
							to={item.path}
						>
							{item.label}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default MainMenu

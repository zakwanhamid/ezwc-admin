import {
	HiOutlineViewGrid,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
    HiOutlineTrash,
	HiGlobeAlt,
	HiLightBulb
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'users',
		label: 'Users',
		path: '/users',
		icon: <HiOutlineUsers />
	},
	{
		key: 'posts',
		label: 'Posts',
		path: '/posts',
		icon: <HiGlobeAlt/>
	},
	{
		key: 'listings',
		label: 'Listings',
		path: '/listings',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'binFinder',
		label: 'BinFinder',
		path: '/binFinder',
		icon: <HiOutlineTrash />
	},
	{
		key: 'feedback',
		label: 'Feedbacks',
		path: '/feedback',
		icon: <HiLightBulb />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'logout',
		label: 'Logout',
		path: '/logout',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]
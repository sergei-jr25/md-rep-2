 import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { ShopLazy } from '../pages/Shop/ShopLazy'

const routes = [
	{
		path: '/shop',
		element: <App />,
		children: [
			{
				path: '/shop/main',
				element: (
					<Suspense fallback={<div>...Loading </div>}>
						<ShopLazy />,
					</Suspense>
				),
			},
			{
				path: '/shop/product',
				element: (
					<Suspense fallback={<div>...Loading </div>}>
						<h1>Product</h1>
 					</Suspense>
				),
			},
		],
	},
]

export const router = createBrowserRouter(routes)
export default routes

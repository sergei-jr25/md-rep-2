// import classes from './App.module.scss'

import { Outlet } from 'react-router-dom'

function char(a: number) {
	console.log(a)
}

const App = () => {
	return (
		<div data-testid={'AppTestId'}>
			<h1 data-testid={'AppTitle'} style={{ color: 'red' }}>
				SHOP MODULE
			</h1>
			<div>
				{/* <Link to={'/shop/main'}>Main</Link>
				<Link to={'/shop/product'}>Product</Link> */}
			</div>
			<Outlet />
		</div>
	)
}
export default App

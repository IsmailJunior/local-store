import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'
import {Container} from '../components/Container'
export const Layout = () => {
	return (
	<>
	<Navigation />
	<Container>
		<Outlet />
	</Container>
	</>
  )
}



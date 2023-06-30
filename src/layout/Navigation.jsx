import styled from 'styled-components'

export const Navigation = () => {
  return (
	  <Navbar>
		  <h2>Navbar</h2>
	</Navbar>
  )
}

const Navbar = styled.nav`
	width: 100vw;
	height: 50px;
	background-color: white;
	border: 1px solid black;
`;
import styled from 'styled-components'

export const Container = ({children}) =>
{
  return (
	<Div>{children}</Div>
  )
}

const Div = styled.div`
	margin: 50px 100px;
	display: flex;
	justify-content: center;
`;
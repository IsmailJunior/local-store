import styled from 'styled-components'

export const Item = ({imageUrl, price, title}) =>
{
	const url = imageUrl
  return (
	<VStack>
		<Text>{title}</Text>
		<Image style={ { backgroundImage: `url(${ url })` } } />
		<Text>${price}</Text>
	</VStack>
  )
}

const VStack = styled.div`
	display: flex;
	flex-direction: column;
	cursor: pointer;
	font-weight: 300;
		&:hover {
		text-decoration: underline;
	}
`;

const Image = styled.div`
	width: 200px;
	height: 200px;
	background-position: center;
	background-repeat: np-repeat;
	background-size: cover;
`;

const Text = styled.h1`
	font-size: 25px;
	font-weight: 600;
	margin-top: 15px;
`;

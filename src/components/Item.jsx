import styled from 'styled-components'

export const Item = () =>
{
	const url = 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3db71cefac174197af42ac310115b522_9366/Run_Falcon_2.0_Running_Shoes_Black_FY5943_01_standard.jpg'
  return (
	  <VStack>
		  <Image style={ { backgroundImage: `url(${ url })` } } />
		  <Text>$19.99</Text>
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

import styled from 'styled-components'
import { Item } from '../components/Item'

export const ItemsPage = () =>
{
	const items = []
	for ( let i = 0; i < 10; i++ )
	{
		items.push(<Item key={i}/>)
	}
	return (
		<>
			<HStack>
				{items}
			</HStack>
		</>
  )
}

const HStack = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
`;

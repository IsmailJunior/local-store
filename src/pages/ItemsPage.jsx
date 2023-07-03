import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { selectItems, selectStatus,listItems } from '../featuers/items/itemsSlice'
import {selectUid} from '../featuers/sell/sellSlice'
import { Item } from '../components/Item'

export const ItemsPage = () =>
{
	const dispatch = useDispatch()
	const items = useSelector( selectItems );
	const status = useSelector( selectStatus );
	const uid = useSelector( selectUid )
	useEffect( () =>
	{
		dispatch( listItems( uid ) )
	}, [dispatch, uid])

	return (
		<>
			<HStack>
				{ status === 'success' ? items.map( (item, i) => (
					<Item key={i} price={item?.documentPrice} imageUrl={item?.documentImageUrl.url} />
				)) : <h2>Loading</h2>}
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

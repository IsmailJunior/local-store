import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import {selectUid} from '../featuers/user/userSlice'
import {getItems} from '../util/items'
import { Item } from '../components/Item'

export const ItemsPage = () =>
{
	const navigate = useNavigate();
	const uid = useSelector(selectUid)
	const [ items, setItems ] = useState( [] )
	useEffect( () =>
	{
		( async () =>
		{
			const request = await getItems( 'user', uid, 'products' );
			setItems(request.data)
			return request;
		})()
	}, [ uid ] )
	
	const onItemClicked = ( id ) =>
	{
		navigate(id)
	}
	return (
		<>
			<HStack>
				{items ? items?.map( ( item, i ) =>
				(
						<div onClick={() => onItemClicked(item.tempId)} key={ i }>
							<Item title={item.documentName} price={item.documentPrice} imageUrl={item.documentImageUrl}/>
						</div>
					
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

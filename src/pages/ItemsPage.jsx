import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import {selectUid} from '../featuers/user/userSlice'
import {getItems} from '../util/items'
import { Item } from '../components/Item'
import {Holder} from '../components/Holder'

export const ItemsPage = () =>
{
	const navigate = useNavigate();
	const uid = useSelector( selectUid )
	const [isLoading, setIsLoading] = useState(false)
	const [ items, setItems ] = useState( [] )
	useEffect( () =>
	{
		( async () =>
		{
			try {
			setIsLoading(true)
			const request = await getItems( 'user', uid, 'products' );
			setItems( request.data )
			setIsLoading(false)
			return request;
			} catch ( error )
			{
				console.log(error.message)
			}
		})()
	}, [ uid ] )
	
	const onItemClicked = ( id ) =>
	{
		navigate(id)
	}
	return (
		<>
			<HStack>
				{ items?.map( ( item, i ) =>
				(
					items && !isLoading ? <div style={ { cursor: 'pointer' } } onClick={ () => onItemClicked( item.tempId ) } key={ i }>
						<Item title={ item.documentName } price={ item.documentPrice } imageUrl={ item.documentImageUrl } />
					</div> : <Holder key={ i } />
				))}
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

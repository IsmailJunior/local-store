import { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { selectUid } from '../featuers/user/userSlice'
import {itemsSelectors} from '../featuers/cart/cartSlice'
import Stack from '@mui/material/Stack'
import {getItems} from '../util/items'
import { Item } from '../components/Item'
import { Holder } from '../components/Holder'

export const ItemsPage = () =>
{
	const itemsInCart = useSelector(itemsSelectors.selectIds)
	const navigate = useNavigate();
	const uid = useSelector( selectUid )
	const [isLoading, setIsLoading] = useState(false)
	const [ items, setItems ] = useState( [] )
	const itemsInCartView = items.some( ( item ) => item.itemId === itemsInCart )
	console.log(itemsInCartView)
	useEffect( () =>
	{
		( async () =>
		{
			setIsLoading(true)
			try {
			const request = await getItems( 'products' );
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
			<Stack spacing={2} direction='row' flexWrap='wrap' useFlexGap>
				{ items?.map( ( item, i ) =>
				(
					items && !isLoading ? <div style={ { cursor: 'pointer' } } onClick={ () => onItemClicked( item.tempId ) } key={ i }>
						<Item title={ item.documentName } price={ item.documentPrice } imageUrl={ item.documentImageUrl } />
					</div>: <Holder key={ i } />
				))}
			</Stack>
		</>
  )
}
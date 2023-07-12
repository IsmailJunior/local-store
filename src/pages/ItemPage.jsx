import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import {deleteItem} from '../util/items'
import { selectUid } from '../featuers/user/userSlice'
import { itemAdded, itemsSelectors} from '../featuers/cart/cartSlice'
import { getItem } from '../util/items'
import {deleteFile} from '../util/upload'
import { Item } from '../components/Item';
import {Holder} from '../components/Holder'

export const ItemPage = () =>
{
	const navigate = useNavigate()
	const itemsInCart = useSelector(itemsSelectors.selectIds)
	const [ item, setItem ] = useState( '' )
	const { productId } = useParams()
	const [ isLoading, setIsLoading ] = useState( false )
	const [ loading, setLoading ] = useState( false )
	const uid = useSelector( selectUid );
	const dispatch = useDispatch()
	const isInCart = itemsInCart.filter( ( item ) => item === productId );
	const onAddToCartClicked = () =>
	{
			dispatch( itemAdded( { itemId: item.tempId, itemName: item.documentName, itemImage: item.documentImageUrl, itemPrice: item.documentPrice, uuid: uuid(), qty: 1 } ) )
			navigate('/products')
	}

	const onDeleteClicked = async () =>
	{
		try
		{
			setLoading(true)
			const documentRefrence = await getItem( 'products', productId )
			await deleteFile( documentRefrence.data.tempId,documentRefrence.data.imageId)
			await deleteItem( 'products', productId )
			navigate('/products')
		} catch ( error )
		{
			console.log(error.message)
		}
	}

	useEffect( () =>
	{
		( async () =>
		{
			try
			{
				setIsLoading(true)
				const request = await getItem('products', productId )
				setItem( request.data )
				setIsLoading(false)
				return request;
			} catch ( error )
			{
				console.log(error.message)
			}
		})()
	}, [uid, productId])
  return (
	<>
		{item && !isLoading ? <Item inCart={isInCart.length === 0 ? false : true} addToCart={onAddToCartClicked} listActions loading={loading} action={onDeleteClicked} title={item.documentName} price={item.documentPrice} imageUrl={item.documentImageUrl}/> : <Holder />}
	</>
  )
}

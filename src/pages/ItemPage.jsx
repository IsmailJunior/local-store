import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectUid } from '../featuers/user/userSlice'
import {getItem} from '../util/items'
import { Item } from '../components/Item';

export const ItemPage = () =>
{
	const [ item, setItem ] = useState( '' )
	const { productId } = useParams()
	const uid = useSelector( selectUid )

	useEffect( () =>
	{
		( async () =>
		{
			try
			{
				const request = await getItem( 'user', uid, 'products', productId )
				setItem( request.data )
				return request;
			} catch ( error )
			{
				console.log(error.message)
			}
		})()
	}, [uid, productId])
  return (
	<>
		{item ? <Item title={item.documentName} price={item.documentPrice} imageUrl={item.documentImageUrl}/> : <h2>Loading</h2>}
	</>
  )
}

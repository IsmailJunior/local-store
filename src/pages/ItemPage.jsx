import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectUid } from '../featuers/user/userSlice'
import {getItem} from '../util/items'
import { Item } from '../components/Item';
import {Holder} from '../components/Holder'

export const ItemPage = () =>
{
	const [ item, setItem ] = useState( '' )
	const { productId } = useParams()
	const [isLoading, setIsLoading] = useState(false)
	const uid = useSelector( selectUid )

	useEffect( () =>
	{
		( async () =>
		{
			try
			{
				setIsLoading(true)
				const request = await getItem( 'user', uid, 'products', productId )
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
		{item && !isLoading ? <Item title={item.documentName} price={item.documentPrice} imageUrl={item.documentImageUrl}/> : <Holder />}
	</>
  )
}

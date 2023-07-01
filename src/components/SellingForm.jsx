import { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {createItem, selectUid} from '../featuers/sell/sellSlice'
import { Control } from './Control'

export const SellingForm = () =>
{
	const uid = useSelector(selectUid)
	const dispatch = useDispatch()
	const [ productName, setProductName ] = useState( '' );
	const [ productPrice, setProductPrice ] = useState( '' );
	const [ productDetails, setProductDetails ] = useState( '' );
	const onProductNameChange = event => setProductName( event.target.value )
	const onProductPriceChange = event => setProductPrice( event.target.value )
	const onProductDetailsChange = event => setProductDetails(event.target.value)

	const onCreateItemClicked = (event) =>
	{
		event.preventDefault()
		dispatch( createItem( { uid: uid, productName: productName, productPrice: productPrice, productDetails: productDetails } ) );
		setProductName( '' )
		setProductPrice( '' )
		setProductDetails('')
	}
  return (
	  <>
		  <Group>
			  <Control value={productName} func={onProductNameChange} type='text' name='productName' id='productName' placeholder='Your Product Name'>Product Name</Control>
			  <Control value={productPrice} func={onProductPriceChange} type='number' name='productPrice' id='productPrice' placeholder='$0.00'>Product Price</Control>
		  </Group>
		  <Group>
			  <Control value={productDetails} func={onProductDetailsChange} type='text' name='productDetails' id='productDetails' placeholder='Product Details'>Product Details</Control>
		  </Group>
		  <button onClick={onCreateItemClicked}>Create Item</button>
	  </>
  )
}

const Group = styled.div`
	display: flex;
`;

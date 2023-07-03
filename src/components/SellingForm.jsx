import { useDispatch, useSelector } from 'react-redux'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import styled from 'styled-components'
import {createItem, selectUid} from '../featuers/sell/sellSlice'

export const SellingForm = () =>
{
	const [ file, setFile ] = useState( '' );
	const onFileChange = ( event ) => setFile(event.target.files[ 0 ]);
	const { register, handleSubmit, formState: { errors } } = useForm();
	const registerOptions = {
		productName: { required: 'This field required' },
		productPrice: { required: 'This field required' },
		productDetails: { required: 'This field required' },
		productImage: {required: 'This field required'}
	}
	const uid = useSelector(selectUid)
	const dispatch = useDispatch()

	const onSubmit = ( data ) =>
	{
		if ( !data )
		{
			console.log('You must fill the fields')
		} else
		{
			dispatch( createItem( {
			uid: uid,
			productName: data.productName,
			productPrice: data.productPrice,
			productDetails: data.productDetails,
			productImage: file
		} ) )
		}
	}
  return (
	  <>
		  <form onSubmit={handleSubmit(onSubmit)}>
			  <Group>
				  <Field>
					  <label htmlFor='productName'>Product Name</label>
					<input id='productName' type="text" name='productName' placeholder='Product Name' { ...register( 'productName', registerOptions.productName ) } />
				  <span style={{color: 'red'}}>{errors?.productName && errors.productName.message}</span>
				 </Field>
				  <Field>
					  <label htmlFor='productPrice'>Product Price</label>
					<input id='productPrice' type="number" name='productPrice' placeholder='Product Price' { ...register( 'productPrice', registerOptions.productPrice ) } />
				  <span style={{color: 'red'}}>{errors?.productPrice && errors.productPrice.message}</span>
				  </Field>
			  </Group>
			  <Group>
				  <Field>
					  <label htmlFor='productDetails'>Product Details</label>
					<input id='productDetails' type="text" name='productDetails' placeholder='Product Details' { ...register( 'productDetails', registerOptions.productDetails ) } />
				  <span style={{color: 'red'}}>{errors?.productDetails && errors.productDetails.message}</span>
				  </Field>
				  <Field>
					  <label htmlFor='productImage'>Product Image</label>
					<input id='productImage' type="file" name='productImage' onChange={onFileChange}/>
				  </Field>
			  </Group>
			  <input type="submit" />
		  </form>
	  </>
  )
}

const Group = styled.div`
	display: flex;
`;

const Field = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 10px;
	margin-bottom: 5px;
`;

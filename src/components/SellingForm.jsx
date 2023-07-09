import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import {selectUid} from '../featuers/user/userSlice'
import { createDocument } from '../util/document'
import { uploadFile } from '../util/upload'
import Stack from '@mui/material/Stack'
import Input from '@mui/material/Input'
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField'

export const SellingForm = () =>
{
	const navigate = useNavigate()
	const uid = useSelector( selectUid );
	const [ file, setFile ] = useState( '' );
	const onFileChange = ( event ) => setFile(event.target.files[ 0 ]);
	const { register, handleSubmit, formState: { errors } } = useForm();
	const [loading, setLoading] = useState(false)
	const registerOptions = {
		productName: { required: 'This field required' },
		productPrice: { required: 'This field required' },
		productDetails: { required: 'This field required' },
		productImage: {required: 'This field required'}
	}

	const onSubmit = async ( data ) =>
	{
		setLoading(true)
		if ( !data )
		{
			setLoading(false)
			console.log('You must fill the fields')
		} else
		{
			try
			{
				const image = await uploadFile( uid,file );
				await createDocument( uid, data.productName, data.productPrice, data.productDetails, image.url );
				setLoading( false )
				navigate('/products')
				
			} catch ( error )
			{
				setLoading(false)
				console.log(error.message)
			}
		}
	}
  return (
	<>
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={ 2 }>
			<h2>Create Item</h2>
			<Stack spacing={2} direction='row'>
			<Stack spacing={1} direction='column'>
					<TextField size='small' id='productName' type="text" name='productName' label='Product Name' { ...register( 'productName', registerOptions.productName ) } />
				<span style={{color: 'red'}}>{errors?.productName && errors.productName.message}</span>
				</Stack>
				<Stack spacing={1} direction='column'>
					<TextField size='small' id='productPrice' type="number" name='productPrice' label='Product Price' { ...register( 'productPrice', registerOptions.productPrice ) } />
				<span style={{color: 'red'}}>{errors?.productPrice && errors.productPrice.message}</span>
				</Stack>
			</Stack>
			<Stack spacing={2} direction='row'>
				<Stack spacing={1} direction='column'>
					<TextField size='small' id='productDetails' type="text" name='productDetails' label='Product Details' { ...register( 'productDetails', registerOptions.productDetails ) } />
				<span style={{color: 'red'}}>{errors?.productDetails && errors.productDetails.message}</span>
				</Stack>
				<Stack spacing={1} direction='column'>
					<Input  id='productImage' type='file' name='productImage' onChange={onFileChange}/>
				</Stack>
			</Stack>
				<LoadingButton loading={loading} variant='outlined' color='success' type="submit">Create</LoadingButton>
				</Stack>
		</form>
	</>
  )
}

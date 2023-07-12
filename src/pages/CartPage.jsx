import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { itemsSelectors, itemRemoved, itemUpdated, itemsRemoved } from '../featuers/cart/cartSlice';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Item } from '../components/Item'
import Typography from '@mui/material/Typography'

export const CartPage = () =>
{
  const [ incrementItemQty, setIncrementItemQty ] = useState(1)
  const dispatch = useDispatch()
  const items = useSelector( itemsSelectors.selectAll )
  const itemsPrice = items?.map( ( item ) => Number( item.itemPrice ) );
  const itemsQty = items?.map((item) => item.qty)
  const totalValue = 0
  const totalQty = 0
  const allQty = itemsQty.reduce( ( newValue, item ) => newValue + item, totalQty );
  const totalPrice = itemsPrice.reduce( ( newValue, item ) => newValue + item, totalValue ) * allQty;
  const decimaTotalPrice = totalPrice.toString().slice( 0, 2 ).concat( '.' ).concat( totalPrice.toString().slice( 2, totalPrice.toString().length ) );
  const onIncrementClicked = (id) =>
  {
    const newValue = incrementItemQty + 1
    setIncrementItemQty(newValue)
		dispatch( itemUpdated( { id: id, changes: { qty: newValue } } ) )
  }

  const onDecrementClicked = ( id ) =>
  {
    if ( incrementItemQty <= 1 )
    {
      return null
    } else
    {
    const newValue = incrementItemQty -1
    setIncrementItemQty(newValue)
    dispatch(itemUpdated({id: id, changes: {qty: newValue}}))
    }
  }

  const onRemoveClicked = (itemId) =>
  {
    dispatch(itemRemoved(itemId))
  }

  const onRemoveAllClicked = () =>
  {
    dispatch(itemsRemoved())
  }

  return (
    <Stack spacing={2}>
    <Stack spacing={2} direction='row' flexWrap='wrap'>
        { items.map( ( item, i ) => (
          <Stack spacing={ 1 } sx={ { cursor: 'pointer' } } key={ i }>
          <Item imageUrl={ item.itemImage } title={ item.itemName } price={ item.itemPrice } />
          <Stack justifyContent='space-between' alignItems='center' direction='row' spacing={ 1 }>
            <Typography>QTY: { item.qty }</Typography>
            <Stack spacing={1} direction='row'>
            <Button  onClick={() => onIncrementClicked(item.itemId)} variant='contained' color='success'>+</Button>
            <Button disabled={item.qty <= 1 ? true : false} onClick={() => onDecrementClicked(item.itemId)} variant='contained' color='error'>-</Button>
            </Stack>
          </Stack>
          <Button color='error' onClick={ () => onRemoveClicked( item.itemId ) } variant='contained'>Remove from cart</Button>
          <Typography variant='h6'>Total QTY: { item.qty } PCS</Typography> 
          <Typography variant='h6'>Subtotal Price: ${item.itemPrice * item.qty}</Typography>
        </Stack>
      ) ) }
      </Stack>
      { items.length === 0 ? <h1>No Items in cart</h1> : 
      <Stack spacing={ 1 } width={ '83%' }>
          <Typography variant='h6'>Total Price: ${decimaTotalPrice}</Typography>  
      <Button size='large' variant='contained'>Checkout</Button>
      <Button size='large' onClick={ onRemoveAllClicked } color='error' variant='contained'>Remove All</Button>
       </Stack>
      }
      </Stack>
  )
}

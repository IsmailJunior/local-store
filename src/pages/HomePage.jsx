import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import {selectUser} from '../featuers/user/userSlice'
import { light } from '@mui/material/styles/createPalette';
export const HomePage = () =>
{
  const user = useSelector(selectUser)
  return (
    <>
      <h2>Welcome <Typography fontWeight={light}>{user}</Typography></h2>
    </>
  )
}

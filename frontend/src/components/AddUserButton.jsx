import addUserIcon from '../assets/userIcon.svg'
import { NavLink } from 'react-router-dom'

const AddUserButton = () => {

    return (
        <div className='sticky top-[85%] left-8 z-10 mb-2 inline-block rounded-full text-4xl font-semibold boton-transparente'>
            <NavLink to='/adduser' title='Add User'>
                <img src={addUserIcon} className='p-4'/>
            </NavLink>
        </div>
    )
}
export default AddUserButton;
import { NavLink } from "react-router-dom";

function NavBar() {
    return(
        <nav className='nav'>
            <NavLink to='/Home' exact>
                Home
            </NavLink>

            <NavLink to='/Inventory' exact>
                Inventory
            </NavLink>
        </nav>
    )
}

export default NavBar;
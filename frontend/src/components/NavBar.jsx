
import icono from "../assets/react.svg"
import { Link } from "react-router-dom";

const NavBar = () => {

    const handleClick = () => {
        alert('click!!')
    }

    return (
        <div className="bg-primary border-primary m-2 flex flex-row justify-around p-5 items-center">
            <img src={icono} alt='icono react' />
            <h1 className="font-serif text-4xl font-bold">Album</h1>
            <Link to='/' className="font-semibold text-xl">Inicio</Link>
            <form onSubmit={handleClick}>
                <input className="border-2 border-gray-700 rounded-md" placeholder="Buscar"></input>
            </form>
        </div>
    )
}

export default NavBar;
import icono from "../icons/react.svg";
import lensIcon from "../icons/lensIcon.svg";
import { Link } from "react-router-dom";
import UserServices from '../services/UserServices.js';
import { useState, useEffect, useRef } from 'react';
import ResultList from '../components/ResultList.jsx';

const NavBar = () => {
    
    const inputRef = useRef();
    const [users, setUsers] = useState(null);
    const [text, setText] = useState("");
    const [showList, setShowList] = useState(false);

    // se obtiene la lista de usuarios
    useEffect(() => {
        const getUsers = async () => {
            let res = await UserServices.getUsers();
            setUsers(res);
        }
        getUsers();       
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(inputRef.current.value);
    }

    // se copia el texto seleccionado de la lista de resultados en el input text
    const setInputValue = (texto) =>{
        inputRef.current.value= texto;
        
        setShowList(false);
    }

    const onChange = (e) => {
        let st = e.target.value;
        if(st == ''){
            setShowList(false)
        }else{
            setText(st);
            setShowList(true);
        }
    }

    return (
        <div className="bg-primary border-primary m-2 flex flex-row justify-around p-5 items-center">
            <img src={icono} alt='icono react' />
            <h1 className="font-serif text-4xl font-bold">Album</h1>
            <Link to='/' className="font-semibold text-xl">Inicio</Link>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} name="buscador" placeholder="Buscar" ref={inputRef} required
                className="border-2 border-gray-700 rounded-md px-2 relative inline"/>
                <button><img src={lensIcon} className="inline h-6 w-6 cursor-pointer"/></button>
                { showList? <ResultList users={users} text={text} setInputValue={setInputValue} /> : <></> }
            </form>
        </div>
    )
}

export default NavBar;
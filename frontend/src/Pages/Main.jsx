import { useState, useEffect } from 'react'
import AddPhotoButton from '../components/AddPhotoButton';
import AddUserButton from '../components/AddUserButton';
import PictureList from '../components/PicturesList';
import UsersList from '../components/UsersList';
import Loading from '../components/Loading.jsx';
import UserServices from '../services/UserServices.js';
import pictureServices from '../services/PicturesServices.js';

const Main = () => {

    const [dataUsers, setDataUsers] = useState([]);
    const [userActive, setUserActive] = useState(null);
    const [userPics, setUserPics] = useState([]);
    const [loading, setLoading] = useState(true);

    async function cambiarEstado(_id) {
        setLoading(true);
        const saved = await UserServices.saveActiveUser(_id);
        if (saved) {
            const users = await UserServices.getUsers();
            if (users) {
                setDataUsers(users);
                setUserActive(users.find((u) => u.active == true));
            }
        }
    }

    async function deleteUser(userId) {
        setLoading(true);
        const deleted = await UserServices.deleteUser(userId);
        if (deleted.ok) {
            await pictureServices.deletePictures(userId);
            setUserPics([]);
            const users = await UserServices.getUsers();
            setDataUsers(users);
            setUserActive(null);
        } else {
            alert('No se pudo borrar el usuario.');
        }
        setLoading(false);
    }

    // 1° se piden los datos de los usuarios
    useEffect(() => {
        async function fetchData() {
            const users = await UserServices.getUsers();
            setDataUsers(users);
            // se carga el usuario activo
            setUserActive(users.find((u) => u.active == true));
        }
        fetchData();
    }, []);


    // actualiza las imagenes. cuando se actualiza el usuario activo se obtienen las url de las imagenes
    useEffect(() => {
        const getPics = async () => {
            if (userActive) {
                let pictures = await pictureServices.getPictures(userActive._id); // se obtienen las imagenes del usuario activo
                if (pictures) {
                    setUserPics(pictures.data.images);
                }
            }
            setLoading(false);
        }
        setLoading(true);
        getPics();
    }, [userActive]);

    return (
        <main className='flex flex-row justify-between m-2 gap-2'>

            <aside className='border-primary bg-secondary basis-1/4 min-h-[80vh]'>
                <AddUserButton />
                <UsersList users={dataUsers} cambiarEstado={cambiarEstado} deleteUser={deleteUser} />
            </aside>

            <article className='border-primary bg-secondary basis-3/4'>
                {
                    // si hay un usuario seleccionado se muestra el boton de agregar imagen
                    userActive ? <AddPhotoButton user={userActive} /> : <></>
                }
                {
                    loading ? <Loading /> : <PictureList userPictures={userPics} />
                }
            </article>
        </main>
    )
}

export default Main;
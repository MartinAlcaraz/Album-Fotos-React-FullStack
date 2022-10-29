import iconImage from '../assets/imageIcon.svg'
import errorImg from '../assets/errorImg.svg'
import { useParams, useNavigate } from 'react-router-dom'
import { createRef, useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useForm } from 'react-hook-form'
import UserServices from '../services/UserServices.js'
import PicturesServices from '../services/PicturesServices.js'
import pictureServices from '../services/PicturesServices.js'

const AddPhotos = () => {
    const params = useParams();

    const { handleSubmit, register, formState: { errors, isSubmitSuccessful }, setFocus, trigger, } = useForm();

    const navigate = useNavigate();

    const [selectedImg, setSelectedImg] = useState(iconImage);  // foto subida por el usuario
    const [userInfo, setUserInfo] = useState(null);
    const [loadingImg, setLoadingImg] = useState(false);


    useEffect(() => {   // se obtienen los datos del usuario seleccionado para subir fotos
        async function getUserInfo() {
            const user = await UserServices.getOneUser(params.id);
            setUserInfo(user);
        }
        getUserInfo();
    }, []);

    async function cargarImagen(file) {
        // trigger comprueba los errores del input selecteFile  (es funcion asincrona )
        const archivoValido = await trigger("inputFile");
        setSelectedImg(null);

        if (archivoValido) {
            setLoadingImg(true);
            let reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function (event) {
                let imagen = event.target.result;
                setSelectedImg(imagen);
                setLoadingImg(false);
            }
        }
    }

    function addImage(e) {
        e.preventDefault();
        const inputFile = document.querySelector("#inputFile");
        inputFile.click();
    }

    async function agregarFoto(data, e) {
        e.preventDefault();
        const newPictureOfUser = { userId: params.id, img: selectedImg }
        const response = await pictureServices.postPicture(newPictureOfUser);
                
        if (response.data.updated == true) {
            navigate("/");
        }else{
            navigate("/404");
        }
    }

    return (
        <div className='mx-2 my-2'>
            <h2 className='px-4 mb-1 bg-secondary border-primary font-semibold text-center'>Agregar foto de <strong>{userInfo?.userName}</strong> <img src={userInfo?.img} className="h-20 inline" /></h2>
            <form onSubmit={handleSubmit(agregarFoto)} className='h-[65vh] p-4 bg-secondary border-primary flex flex-row-reverse'>
                <div className='basis-2/3'>
                    {
                        loadingImg ? <Loading /> :
                            <div className='h-full hover:cursor-pointer' onClick={addImage} >
                                <img src={selectedImg} className="h-full mx-auto" />
                            </div>
                    }
                </div>
                <div className='m-auto'>
                    <input type="file" className='hidden' id="inputFile"
                        {...register('inputFile', {
                            required: "Seleccione una imagen.",
                            validate: {
                                size: (value) => (value[0].size / 1024 < 2048) || "La imagen debe pesar menos de 2MB",
                                tipo: (value) => (["image/jpg", "image/jpeg", "image/png"].includes(value[0].type)) || "Elija otra imagen (.jpg, .jpeg ó .png)"
                            },
                            onChange: (value) => cargarImagen(value.target.files[0])
                        })} />

                    <input type="submit" value="Agregar foto al Album" className='button-primary bg-blue-700 text-base' />

                    <p className="h-4 text-sm text-rose-500 text-center">{errors?.inputFile ? errors.inputFile.message : ""}</p>

                </div>
            </form>
        </div>
    )
}

export default AddPhotos;
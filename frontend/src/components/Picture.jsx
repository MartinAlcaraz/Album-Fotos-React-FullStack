import { useState } from "react"
import ModalView from "./ModalView"

const Picture = ({ url, public_id, deletePicture }) => {

    const [modalView, setModalView] = useState(false);

    const imgOnClick = () => {
        setModalView(true);
    }

    return (
        <div className="m-2 h-72 snap-center shrink-0 mx-8">
            {
                modalView? <ModalView url = {url} setModalView={setModalView} deletePicture={deletePicture} public_id={public_id}/> : <></>
            }
            <img onClick={imgOnClick} className="h-full max-w-[90%] mx-auto object-contain cursor-pointer" src={url} />
        </div>
    )
}

export default Picture;
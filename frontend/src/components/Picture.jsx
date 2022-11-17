
const Card = ({url, public_id, deletePicture}) => {

    const buttonOnClick = () => {
        deletePicture(public_id)
    }

    return (
        <div className="m-2 h-72 ">
            <img className="h-full max-w-[90%] mx-auto" src={url} />
            <button onClick={buttonOnClick} className="button-primary">Eliminar</button>
        </div>
    )
}

export default Card;
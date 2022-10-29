
const Card = ({url}) => {
    return (
        <div className="m-2 h-56 ">
            <img className="h-full mx-auto" src={url} />
        </div>
    )
}

export default Card;
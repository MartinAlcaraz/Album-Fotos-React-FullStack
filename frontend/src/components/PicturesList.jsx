import Picture from "./Picture";

const CardsList = ({ userPictures = [] , deletePicture}) => {

    return (
        <div className='mt-[-60px]'>
            {
                userPictures.map((data, index) => {
                    return <Picture key= {index} url = {data.imgUrl} public_id = {data.public_id} deletePicture={deletePicture}/>
                })
            }
        </div>
    )
}

export default CardsList;
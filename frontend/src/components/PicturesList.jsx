import Picture from "./Picture";

const CardsList = ({ userPictures = [] }) => {

    return (
        <div className='mt-[-60px]'>
            {
                userPictures.map((img, index) => {
                    return <Picture key= {index} url = {img} />
                })
            }
        </div>
    )
}

export default CardsList;
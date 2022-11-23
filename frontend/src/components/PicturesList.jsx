import Picture from "./Picture";

const PictureList = ({ userPictures = [] , deletePicture}) => {

    return (
        <div className='snap-y flex-col h-screen overflow-scroll scrollbar-hide p-8 mt-[-60px]'>
            {
                userPictures.map((data, index) => {
                    return <Picture key= {index} url = {data.imgUrl} public_id = {data.public_id} deletePicture={deletePicture}/>
                })
            }
        </div>
    )
}

export default PictureList;
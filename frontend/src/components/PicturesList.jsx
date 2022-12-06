import Picture from "./Picture";

const PictureList = ({ userPictures = [] , deletePicture}) => {

    return (
        <div className='snap-y flex-col h-full overflow-auto scrollbar-hide p-1 mt-[-70px]'>
            {
                userPictures.map((data, index) => {
                    return <Picture key= {index} url = {data.imgUrl} public_id = {data.public_id} deletePicture={deletePicture}/>
                })
            }
            <div className='h-16'></div>
        </div>
    )
}

export default PictureList;
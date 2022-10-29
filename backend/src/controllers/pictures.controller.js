import UserPictures from '../models/UserPictures.js';

const picturesCtrl = {};

picturesCtrl.getPictures = async (req, res) => {  // busca todas las imagenes de un usuario

    const userId = await req.params.id;
    try {
        UserPictures.findOne({ userId: userId })
            .exec(function (err, result) {
                if (err) {
                    res.json({ message: "Error in findOne()." })
                } else {

                    if (result == null) {
                        res.json({ images: [] }) // devuelve un array vacio porque el usuario no existe en esta collection.(porque todavia no se agrego ninguna imagen)
                    } else {
                        res.json({ images: result.images }) // devuelve un array con las imagenes
                    }
                    
                }
            })
    } catch (error) {
        res.json({ messaje: error })
    }
}


picturesCtrl.postPicture = async (req, res) => {
    const { userId, img } = req.body;

    if (userId && img) {
        UserPictures.findOne({ userId: userId }).exec(function (error, data) {
            if (error) {
                res.status(500).send({ message: "Error al buscar si existe una img del usuario." })
            } else {

                if (data == null) { // se crea un nuevo registro
                    const newUserPicture = new UserPictures({ userId: userId, images: [img] });

                    newUserPicture.save(function (err, data) {
                        if (err) {
                            res.status(500).send({ message: "Error al guardar la imagen" })
                        } else {
                            console.log(data);
                            res.json({ updated: true });
                        }
                    })

                } else {

                    UserPictures.findOneAndUpdate(  // se actualiza el registro existente con la  imagen nueva
                        { userId: userId },
                        { '$push': { images: img } }    // agreaga una imagen al array images []
                    ).exec(function (err, result) {
                        if (err) {
                            res.status(500).send({ message: "" })
                        } else {
                            res.json({ updated: true })
                        }
                    });
                }
            }
        });

    } else {
        res.json({ message: "UserId and image are required" });
    }
}


picturesCtrl.putPicture = async (req, res) => {
    const { title, content, author } = req.body;

    try {
        const exist = await Note.findById(req.params.id);
        if (exist) {
            const updated = await Note.findByIdAndUpdate(req.params.id, {
                title,
                content
            });
            if (updated) {
                res.json({ message: "Updated note" })
            } else {
                res.json({ message: "Could not update note" })
            }

        } else {
            res.json({ message: "The note doesnt exist." })
        }

    } catch (error) {
        res.json({ message: "Error, could not update note" })
    }
}

picturesCtrl.deletePicture = async (req, res) => {
    try {
        const exist = await Note.findById(req.params.id);
        if (exist) {
            const deleted = await Note.findOneAndDelete(req.params.id)
            if (deleted) {
                res.json({ message: "Deleted note" });
            }
        } else {
            res.json({ message: "The note doesnt exist" });
        }
    } catch (error) {
        res.json({ message: "Could not delete note" });
    }
}

picturesCtrl.getOnePicture = async (req, res) => {   // busca una sola imagen
    try {
        const note = await UserPictures.findById(req.params.id);
        if (note) {
            res.json({ note })
        } else {
            res.json({ message: "The note does not exist." })
        }

    } catch (err) {
        res.json({ message: "Could not get note" });
    }
}


export default picturesCtrl;
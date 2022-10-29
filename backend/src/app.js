import dotenv from 'dotenv';
dotenv.config();    // carga el contenido del archivo .env dentro de process.env
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routerPictures from './routes/pictures.js'
import routerUsers from './routes/users.js'

const app = express();
// settings
app.set('port', process.env.PORT || "4000")

//middleware
app.use(cors());

app.use(bodyParser.json({limit: "3mb"}));
app.use(bodyParser.urlencoded({limit: "3mb"}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use('/api/pictures', routerPictures);
app.use('/api/users', routerUsers);

export default app;


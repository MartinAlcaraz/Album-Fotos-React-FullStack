import axios from "axios";

//const URI = '/api/users';                //  si estamos en un servidor para produccion se deja asi   = '/api/users'
const URI = 'http://localhost:3000/api/users';     //  si estamos en desarrollo en el localhost

const UserServices = {};

UserServices.getUsers = async () => {   // retorna un arreglo de usuarios
    const response = await axios.get(URI);
    const users = await response.data.users;
    return users;
}

UserServices.getOneUser = async (userId) => {   // retorna un solo usuario
    const response = await axios.get(`${URI}/${userId}`);
    const user = await response.data.user;
    return user;
}

UserServices.postUser = async (newUser) => {
    const res = await axios.post('http://localhost:3000/api/users', newUser );
    return res;
    
}

UserServices.deleteUser = async (userId) => {
    const res = await axios.delete(`${URI}/${userId}`);
    const data = res.data;
    return data;
}

UserServices.saveActiveUser = async (_id) => {
    const res = await axios.put(`${URI}/${_id}`, { id: _id });
    return res.data.message;
}




export default UserServices;
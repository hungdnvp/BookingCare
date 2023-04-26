// import { NULL } from "node-sass";
import axios from "../axios"

const handleLoginApi = (email,password)=>{
    return axios.post('/api/login',{email,password});
}

const getUser = (inputId)=>{
    return axios.get(`/api/get_user?id=${inputId}`);
}

const createNewUserService = (data)=>{
    return axios.post('/api/create_user',data);
}

const deleteUserService = (userId)=>{
    return axios.delete('/api/delete_user',
    {
        data:{
            id: userId
        }
    }
    )
}

const editUserService = (inputData)=>{
    return axios.put('/api/edit_user',inputData);
}

const getAllcodeService = (inputType) =>{
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorService = () =>{
    return axios.get(`/api/get_top_doctor_home`)
}
export {
    handleLoginApi,
    getUser,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllcodeService,
    getTopDoctorService,
};
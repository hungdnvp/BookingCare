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

const getAllDoctor = ()=>{
    return axios.get(`/api/get_all_doctor`)
}
const saveInforDoctor = (data)=>{
    return axios.post('/api/save_infor_doctor',data);
}

const getDetailInforDoctor = (id)=>{
    return axios.get(`/api/get_detail_doctor?id=${id}`)
}

const saveBulkSchedule = (data)=>{
    return axios.post('/api/bulk_create_schedule',data)
}
const getScheduleByDateService = (doctorId,date)=>{
    return axios.get(`/api/get_schedule_by_date?doctorId=${doctorId}&date=${date}`)
}
const getDetailDoctorExtra = (doctorId)=>{
    return axios.get(`/api/get_detail_doctor_extra?doctorId=${doctorId}`)
}
const getProfileDoctorService = (doctorId)=>{
    return axios.get(`/api/get_profile_doctor?doctorId=${doctorId}`)
}
export {
    handleLoginApi,
    getUser,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllcodeService,
    getTopDoctorService,
    getAllDoctor,
    saveInforDoctor,
    getDetailInforDoctor,
    saveBulkSchedule,
    getScheduleByDateService,
    getDetailDoctorExtra,
    getProfileDoctorService
};
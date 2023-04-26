import actionTypes from './actionTypes';
import {getAllcodeService, createNewUserService,getUser,deleteUserService,
    editUserService, getTopDoctorService} from "../../services/userService";
import { ToastContainer, toast } from 'react-toastify';

export const fetchGenderStart =  () => {
    return async (dispatch, getState)=>{
        try{
            dispatch({ type: actionTypes.FETCH_GENDER_START})
            let res = await getAllcodeService("GENDER");
            if(res && res.errCode ===0){
                dispatch(fetchGenderSuccess(res.data));
            }else{
                dispatch(fetchGenderFailed());
            }
        }catch(e){
            dispatch(fetchGenderFailed());
        }
    }
}

export const fetchPositionStart =  () => {
    return async (dispatch, getState)=>{
        try{
            let res = await getAllcodeService("POSITION");
            if(res && res.errCode ===0){
                dispatch(fetchPositionSuccess(res.data));
            }else{
                dispatch(fetchPositionFailed());
            }
        }catch(e){
            dispatch(fetchPositionFailed());
        }
    }
}
export const fetchRoleStart =  () => {
    return async (dispatch, getState)=>{
        try{
            let res = await getAllcodeService("ROLE");
            if(res && res.errCode ===0){
                dispatch(fetchRoleSuccess(res.data));
            }else{
                dispatch(fetchRoleFailed());
            }
        }catch(e){
            dispatch(fetchRoleFailed());
        }
    }
}
export const createUserStart =  (userInput) => {
    return async (dispatch, getState)=>{
        try{
            let res = await createNewUserService(userInput);
            if(res && res.errCode ===0){
                toast.success("Create user succeed !");
                dispatch(createUserSuccess(res.data));
                dispatch(fetchAllUserStart());
            }else{
                toast.error("Create user Error !");
                dispatch(createUserFailed());
            }
        }catch(e){
            dispatch(createUserFailed());
        }
    }
}
export const editUserStart =  (userInput) => {
    return async (dispatch, getState)=>{
        try{
            let res = await editUserService(userInput);
            if(res && res.errCode ===0){
                toast.success("Edit user succeed !");
                dispatch(editUserSuccess(res.data));
                dispatch(fetchAllUserStart());
            }else{
                toast.error("Edit user Error !");
                dispatch(editUserFailed());
            }
        }catch(e){
            dispatch(editUserFailed());
        }
    }
}
// delete User
export const deleteUserStart =  (userId) => {
    return async (dispatch, getState)=>{
        try{
            let res = await deleteUserService(userId);
            if(res && res.errCode ===0){
                toast.success("Delete user succeed !");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            }else{
                toast.error("Delete user Error !");
                dispatch(deleteUserFailed());
            }
        }catch(e){
            toast.error("Delete user Error !");
            dispatch(deleteUserFailed());
        }
    }
}

export const fetchAllUserStart =  () => {
    return async (dispatch, getState)=>{
        try{
            let res = await getUser('ALL');
            if(res && res.errCode ===0){
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            }else{
                dispatch(fetchAllUserFailed());
            }
        }catch(e){
            dispatch(fetchAllUserFailed());
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (PositionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: PositionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})
export const createUserSuccess = (userData)=>({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: userData
})
export const createUserFailed = ()=>({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUserSuccess = (users) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data: users
})
export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})
export const fetchTopDoctor = ()=>{
    return async (dispatch, getState)=>{
        try{
            let res = await getTopDoctorService();
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    topDoctor: res.data
                });
            }else{
                console.log('fetch top doctor Failed');
                dispatch({
                    type: actionTypes.FETCH_ALL_USER_FAILED,
                });
            }
        }catch(e){
            dispatch(fetchAllUserFailed());
        }
    }
}
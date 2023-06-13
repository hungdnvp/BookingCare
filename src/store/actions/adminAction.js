import actionTypes from './actionTypes';
import {
    getAllcodeService, createNewUserService, getUser, deleteUserService,
    editUserService, getTopDoctorService, getAllDoctor, saveInforDoctor,
    getAllSpecialty
} from "../../services/userService";
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllcodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
        }
    }
}

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
        }
    }
}
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
        }
    }
}
export const createUserStart = (userInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(userInput);
            if (res && res.errCode === 0) {
                toast.success("Create user succeed !");
                dispatch(createUserSuccess(res.data));
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Create user Error !");
                dispatch(createUserFailed());
            }
        } catch (e) {
            dispatch(createUserFailed());
        }
    }
}
export const editUserStart = (userInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(userInput);
            if (res && res.errCode === 0) {
                toast.success("Edit user succeed !");
                dispatch(editUserSuccess(res.data));
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Edit user Error !");
                dispatch(editUserFailed());
            }
        } catch (e) {
            dispatch(editUserFailed());
        }
    }
}
// delete User
export const deleteUserStart = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete user succeed !");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Delete user Error !");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Delete user Error !");
            dispatch(deleteUserFailed());
        }
    }
}

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getUser('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUserFailed());
            }
        } catch (e) {
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
export const createUserSuccess = (userData) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: userData
})
export const createUserFailed = () => ({
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
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorService();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    topDoctor: res.data
                });
            } else {
                console.log('fetch top doctor Failed');
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
            });
        }
    }
}

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctor();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    doctors: res.data
                });
            } else {
                console.log('fetch top doctor Failed');
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
                });
            }
        } catch (e) {
            dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAILED });
        }
    }
}

export const saveInforDoctorAction = (inforDoctor) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveInforDoctor(inforDoctor);
            if (res && res.errCode === 0) {
                toast.success("Save infor doctor succeed !");
                dispatch({
                    type: actionTypes.SAVE_INFOR_DOCTOR_SUCCESS,
                });
            } else {
                toast.error("Save infor doctor error !");
                dispatch({
                    type: actionTypes.SAVE_INFOR_DOCTOR_FAILED,
                });
            }
        } catch (e) {
            dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAILED });
        }
    }
}

export const getRequireDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_START })
            let resPrice = await getAllcodeService("PRICE");
            let resPayment = await getAllcodeService("PAYMENT");
            let resProvince = await getAllcodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            if (!resPrice || !resPayment || !resProvince || !resSpecialty) {
                dispatch(fetchRequireDoctorInforFailed());
            } else {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.specialties
                }
                dispatch(fetchRequireDoctorInforSuccess(data));
            }
        } catch (e) {
            dispatch(fetchRequireDoctorInforFailed());
        }
    }
}

export const fetchRequireDoctorInforSuccess = (allrequireInfor) => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_SUCCESS,
    data: allrequireInfor
})

export const fetchRequireDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_FAILD
})

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                });
            } else {
                console.log('fetch top doctor Failed');
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                });
            }
        } catch (e) {
            dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED });
        }
    }
}

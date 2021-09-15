import axiosInstance from '../Api/axios';
import { USER, ROLES } from '../Router/Routes.static';

export const getAllUser = () => {
	return axiosInstance.get(USER);
};

export const getRoles = () => {
	return axiosInstance.get(ROLES);
};

export const deleteUser = (id) => {
	return axiosInstance.delete(`${USER}/${id}`);
};

export const addUserRoute = (data) => {
	return axiosInstance.post(USER, data);
};

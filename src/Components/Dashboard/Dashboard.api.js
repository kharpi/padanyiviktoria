import axiosInstance from '../Api/axios';
import { FILES } from '../Router/Routes.static';

export const getFiles = () => {
	return axiosInstance.get(FILES);
};

export const getFile = (name) => {
	return axiosInstance.get(`${FILES}/${name}`, { responseType: 'blob' });
};

export const deleteFile = (name) => {
	return axiosInstance.delete(`${FILES}/${name}`);
};

export const sendFile = (file) => {
	return axiosInstance.post(FILES, file);
};

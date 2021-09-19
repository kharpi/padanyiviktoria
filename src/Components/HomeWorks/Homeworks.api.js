import axiosInstance from '../Api/axios';
import { USER_FILES } from '../Router/Routes.static';

export const getHomeworks = () => {
	return axiosInstance.get(USER_FILES);
};

export const getSpecifiedHomework = (name) => {
	return axiosInstance.get(`${USER_FILES}/${name}`, { responseType: 'blob' });
};

export const deleteHomework = (name) => {
	return axiosInstance.delete(`${USER_FILES}/${name}`);
};

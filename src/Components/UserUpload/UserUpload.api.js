import axiosInstance from '../Api/axios';
import { USER_FILES } from '../Router/Routes.static';

export const uploadUserFile = (file) => {
	return axiosInstance.post(USER_FILES, file);
};

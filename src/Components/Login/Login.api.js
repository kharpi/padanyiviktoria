import axiosInstance from '../Api/axios';
import { LOGIN } from '../Router/Routes.static';

export const getLoginRoute = (username, password) => {
	return axiosInstance.post(LOGIN, { login: username, password: password });
};

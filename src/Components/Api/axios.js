import axios from 'axios';

const instance = axios.create({
	baseURL:
		process.env.NODE_ENV === 'production'
			? 'https://backend.padanyiviktoria.hu'
			: 'http://localhost:5000',
});
instance.interceptors.request.use(function (config) {
	const token = JSON.parse(localStorage.getItem('pv-logged-in'))?.token;
	config.headers['pv-auth-token'] = token;
	return config;
});

export default instance;

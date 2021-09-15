import { cloneDeep } from 'lodash';
import { useContext, useState } from 'react';
import { changeHandler } from '../../Utils/InputChange.util';
import { validateFormData } from '../../Utils/ValidateForm.util';
import { ValidateResponse } from '../../Utils/ValidateResponse.util';
import { getLoginRoute } from './Login.api';
import { LoginForm } from './Login.form';
import LoginView from './Login.view';
import { decodeToken } from 'react-jwt';
import { UserContext } from '../Auth/User.context';

const LoginController = () => {
	const userContext = useContext(UserContext);

	const initForm = () => {
		const initialForm = cloneDeep(LoginForm);
		return initialForm;
	};

	const [form, set_form] = useState(initForm());
	const [loading, set_loading] = useState(null);
	const [error, set_error] = useState(null);

	const onChange = (args) => {
		set_form(changeHandler(form, args.fieldName, args.value));
	};

	const parseFormData = () => {
		const data = new FormData();
		for (const field of Object.values(form)) {
			data.append(field.id, `${field.value}` || 'null');
		}
		return data;
	};

	const handleLogin = (res) => {
		const decodedToken = decodeToken(res.token);
		const user = {
			id: decodedToken.id,
			admin: decodedToken.admin,
			token: res.token,
		};
		userContext.login(user);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		set_error('');
		const newForm = validateFormData(cloneDeep(form));
		set_form(newForm.form);
		if (newForm.ok) {
			const data = parseFormData();
			if (!data) set_error('Hiba történt');
			set_loading(
				getLoginRoute(newForm.form.username.value, newForm.form.password.value)
					.then((res) => {
						ValidateResponse(res).status && handleLogin(res.data.message);
					})
					.catch((error) => {
						!ValidateResponse(error.response).status &&
							set_error(error.response.data.error);
					})
					.finally(() => set_loading(null))
			);
		}
	};

	return (
		<LoginView
			form={form}
			onChange={onChange}
			loading={loading}
			onSubmit={onSubmit}
			error={error}
		/>
	);
};

export default LoginController;

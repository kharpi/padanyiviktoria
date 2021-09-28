import { cloneDeep } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { changeHandler, setOptions } from '../../Utils/InputChange.util';
import { validateFormData } from '../../Utils/ValidateForm.util';
import { ValidateResponse } from '../../Utils/ValidateResponse.util';
import { UserContext } from '../Auth/User.context';
import { addUserRoute, deleteUser, getAllUser, getRoles } from './Users.api';
import './Users.css';
import { AddUserForm } from './Users.form';
import UsersView from './Users.view';

const UsersController = () => {
	const userContext = useContext(UserContext);

	const initForm = () => {
		const initialForm = cloneDeep(AddUserForm);
		return initialForm;
	};

	const [form, set_form] = useState(initForm());
	const [users, set_users] = useState([]);
	const [loading, set_loading] = useState(false);
	const [error, set_error] = useState(null);
	const [showReg, set_showReg] = useState(false);
	const [roles, set_roles] = useState([]);

	useEffect(() => {
		loadUsers();
		getRolesFn();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		const keys = Object.keys(roles);
		const values = Object.values(roles);
		const options = keys.map((k, idx) => ({ id: values[idx], name: k }));
		set_form(setOptions(form, 'admin', options));
		//eslint-disable-next-line
	}, [roles]);

	const onChange = (args) => {
		set_form(changeHandler(form, args.fieldName, args.value));
	};

	const parseFormData = () => {
		const data = new FormData();
		for (const field of Object.values(form)) {
			if ('selectType' in field) {
				if (field.value) {
					data.append(field.id, field.value['id']);
				}
				continue;
			}

			data.append(field.id, `${field.value}` || 'null');
		}
		return data;
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
				addUserRoute({
					login: newForm.form.login.value,
					password: newForm.form.password.value,
					admin: !!newForm.form.admin.value['id'],
				})
					.then(() => {
						loadUsers();
					})
					.catch((error) => {
						!ValidateResponse(error.response).status &&
							set_error(error.response.data.error);
					})
					.finally(() => set_loading(null))
			);
		}
	};

	const loadUsers = () => {
		set_loading(
			getAllUser()
				.then((res) =>
					set_users(
						ValidateResponse(res).payload.filter(
							(f) => f.id !== userContext.user.id
						)
					)
				)
				.catch(
					(err) =>
						!ValidateResponse(err.response).status &&
						set_error(err.response.data.error)
				)
				.finally(() => set_loading(null))
		);
	};

	const deleteUserFn = (id) => {
		set_loading(
			deleteUser(id)
				.then(() => loadUsers())
				.catch(
					(err) =>
						!ValidateResponse(err.response).status &&
						set_error(err.response.data.error)
				)
				.finally(() => set_loading(null))
		);
	};

	const getRolesFn = () => {
		set_loading(
			getRoles()
				.then((res) => set_roles(ValidateResponse(res).payload))
				.catch(
					(err) =>
						!ValidateResponse(err.response).status &&
						set_error(err.response.data.error)
				)
				.finally(() => set_loading(null))
		);
	};

	return (
		<UsersView
			users={users}
			error={error}
			loading={loading}
			deleteUser={deleteUserFn}
			onSubmit={onSubmit}
			onChange={onChange}
			form={form}
			roles={roles}
			showReg={showReg}
			set_showReg={set_showReg}
		/>
	);
};

export default UsersController;

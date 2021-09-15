export const AddUserForm = {
	login: {
		id: 'login',
		value: '',
		required: true,
		labelText: 'Felhasználónév',
		type: 'text',
		textType: true,
		warningText: '',
	},
	password: {
		id: 'password',
		value: '',
		required: true,
		labelText: 'Jelszó',
		type: 'password',
		textType: true,
		warningText: '',
	},
	admin: {
		id: 'admin',
		value: null,
		required: true,
		options: [],
		labelText: 'Jog',
		selectType: true,
	},
};

import { createContext, useState } from 'react';
import { decodeToken, isExpired } from 'react-jwt';

export const UserModel = {
	id: '',
	admin: 0,
	token: '',
};

export const UserContext = createContext();

UserContext.displayName = 'UserContext';

export const UserContextWrapper = (props) => {
	const [user, set_user] = useState({
		id: JSON.parse(localStorage.getItem('pv-logged-in'))?.id || 0,
		token: JSON.parse(localStorage.getItem('pv-logged-in'))?.token || null,
		admin: JSON.parse(localStorage.getItem('pv-logged-in'))?.admin || false,
	});

	const login = (logged_user) => {
		localStorage.setItem('pv-logged-in', JSON.stringify(logged_user));
		set_user(logged_user);
	};

	const logout = () => {
		localStorage.removeItem('pv-logged-in');
		set_user(UserModel);
	};

	const checkToken = () => {
		return isExpired(user.token);
	};

	const getRole = () => {
		const { admin } = decodeToken(user.token);
		return admin;
	};

	return (
		<UserContext.Provider
			value={{
				user,
				login,
				logout,
				checkToken,
				getRole,
			}}
		>
			<UserContext.Consumer>{() => props.children}</UserContext.Consumer>
		</UserContext.Provider>
	);
};
export default UserContextWrapper;

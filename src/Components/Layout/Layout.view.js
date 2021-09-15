import { useContext } from 'react';
import { UserContext } from '../Auth/User.context';
import Navbar from '../Navbar/Navbar.view';
import './Layout.css';
const Layout = (props) => {
	const userContext = useContext(UserContext);
	return (
		<>
			{!userContext.checkToken() && <Navbar />}
			<main>{props.children}</main>
		</>
	);
};

export default Layout;

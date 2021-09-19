import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../Auth/User.context';
import './Navbar.css';

const Navbar = () => {
	const userContext = useContext(UserContext);

	const history = useHistory();

	const [opened, set_opened] = useState(false);

	const li_array = userContext.getRole() ? (
		<>
			<li className='gradient-text'>
				<Link to='/' onClick={() => set_opened(false)}>
					Dokumentumok
				</Link>
			</li>
			<li className='gradient-text'>
				<Link to='/users' onClick={() => set_opened(false)}>
					Felhasználók
				</Link>
			</li>
		</>
	) : (
		<>
			<li className='gradient-text'>
				<Link to='/' onClick={() => set_opened(false)}>
					Dokumentumok
				</Link>
			</li>
			<li className='gradient-text'>
				<Link to='/upload' onClick={() => set_opened(false)}>
					Feltöltés
				</Link>
			</li>
		</>
	);
	return (
		<nav className='glass darken'>
			<div className='gradient-text' onClick={() => history.push('/')}>
				padanyiviktoria.hu
			</div>
			<ul className='desktop'>
				{li_array}
				<li
					onClick={() => {
						userContext.logout();
						set_opened(false);
					}}
					className='gradient-text'
				>
					Kijelentkezés
				</li>
			</ul>
			<ul className='mobile'>
				<div
					className={`menu_opener ${opened && 'opened'}`}
					onClick={() => set_opened(!opened)}
				>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div className={`mobile__menu ${opened && 'opened'}`}>
					{li_array}
					<li
						onClick={() => {
							userContext.logout();
							set_opened(false);
						}}
						className='gradient-text'
					>
						Kijelentkezés
					</li>
				</div>
			</ul>
		</nav>
	);
};

export default Navbar;

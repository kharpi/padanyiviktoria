import Button from '../UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TextInput } from '../UI/TextInput';
import { useState } from 'react';
import Select from '../UI/Select';
import Spinner from '../UI/Spinner';

const UsersView = (props) => {
	const [showReg, set_showReg] = useState(false);
	if (props.loading) return <Spinner isTiny />;
	return (
		<section className='users-wrapper glass'>
			<h2>Felhasználók:</h2>
			<div>
				<Button small hasContainer onClick={() => set_showReg(!showReg)}>
					{showReg ? 'X' : 'Hozzáadás'}
				</Button>
				{showReg && (
					<form onSubmit={props.onSubmit}>
						<TextInput {...props.form.login} onChange={props.onChange} />
						<TextInput {...props.form.password} onChange={props.onChange} />
						<Select {...props.form.admin} onChange={props.onChange} />

						<Button small hasContainer type='submit'>
							Regisztrál
						</Button>
					</form>
				)}
				<ul>
					{props.users.map((user, idx) => (
						<li key={`user-${idx}`}>
							{user.login} / {user.admin ? 'Admin' : 'User'}
							<Button onClick={() => props.deleteUser(user.id)} small>
								<FontAwesomeIcon icon={faTrash} />
							</Button>
						</li>
					))}
				</ul>
			</div>
			<p className='input-warning centered'>{props.error}</p>
		</section>
	);
};

export default UsersView;

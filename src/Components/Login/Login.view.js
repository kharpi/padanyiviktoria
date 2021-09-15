import Button from '../UI/Button';
import Spinner from '../UI/Spinner';
import { TextInput } from '../UI/TextInput';
import './Login.style.css';

const LoginView = (props) => {
	if (props.loading) return <Spinner isTiny />;
	return (
		<div className='login-wrapper'>
			<div className='glass login-card'>
				<h2 className='login-card__lead'>Bejelentkezés</h2>
				<form className='login-card__form' onSubmit={props.onSubmit}>
					<TextInput {...props.form.username} onChange={props.onChange} />
					<TextInput {...props.form.password} onChange={props.onChange} />
					<Button hasContainer type='submit'>
						{props.loading ? <Spinner isTiny /> : 'Belépés'}
					</Button>
				</form>
				<p className='input-warning centered'>{props.error}</p>
			</div>
		</div>
	);
};

export default LoginView;

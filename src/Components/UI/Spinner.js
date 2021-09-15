import './Spinner.css';

const Spinner = (props) => {
	let classes = ['spinner'];
	if (props.className) classes.push(props.className);

	return (
		<div className={classes.join(' ')}>
			<div className='lds-dual-ring'></div>
		</div>
	);
};

export default Spinner;

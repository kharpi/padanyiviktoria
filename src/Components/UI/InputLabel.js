const GetInputLabel = (props) => {
	return (
		<label htmlFor={props.id} className='input-label'>
			{props.labelText}
		</label>
	);
};

export default GetInputLabel;

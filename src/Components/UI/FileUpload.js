import Button from './Button';
import './FileUpload.css';

function FileUpload(props) {
	return (
		<div className='file-wrapper'>
			<input
				type='file'
				name='file'
				title='asd'
				className='file-upload'
				onChange={(e) => props.onChange(e.target.files[0])}
			/>
			<Button small hasContainer onClick={props.onSubmit}>
				Feltöltés
			</Button>
		</div>
	);
}
export default FileUpload;

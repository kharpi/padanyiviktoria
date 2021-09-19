import { useState } from 'react';
import Dropzone from 'react-dropzone';
import Button from './Button';
import './FileUpload.css';

function FileUpload(props) {
	const [file, set_file] = useState(null);
	return (
		<div className='file-wrapper'>
			<Dropzone
				onDrop={(acceptedFiles) => {
					props.onChange(acceptedFiles[0]);
					set_file(acceptedFiles[0]);
				}}
			>
				{({ getRootProps, getInputProps }) => (
					<section>
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<p>
								{file ? file.name : 'Kérjük válassz egy fájlt, vagy húzd ide!'}
							</p>
						</div>
					</section>
				)}
			</Dropzone>

			<Button small hasContainer onClick={props.onSubmit}>
				Feltöltés
			</Button>
		</div>
	);
}
export default FileUpload;

import { useState } from 'react';
import { ValidateResponse } from '../../Utils/ValidateResponse.util';
import { uploadUserFile } from './UserUpload.api';
import UserUploadView from './UserUpload.view';

const UserUploadController = () => {
	const [loading, set_loading] = useState(null);
	const [error, set_error] = useState(null);
	const [upload, set_upload] = useState(null);
	const [uploaded, set_uploaded] = useState(false);

	const onChange = (args) => {
		set_upload(args);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (upload === null) return;
		const formData = new FormData();
		formData.append('doc', upload, upload.name);
		set_loading(
			uploadUserFile(formData)
				.then(() => {
					set_uploaded(true);
				})
				.catch(
					(err) =>
						!ValidateResponse(err.response).status &&
						set_error(err.response.data.error)
				)
				.finally(() => {
					set_loading(null);
				})
		);
	};
	return (
		<UserUploadView
			onSubmit={onSubmit}
			onChange={onChange}
			loading={loading}
			error={error}
			uploaded={uploaded}
		/>
	);
};

export default UserUploadController;

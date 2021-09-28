import fileDownload from 'js-file-download';
import { useEffect, useState } from 'react';
import { ValidateResponse } from '../../Utils/ValidateResponse.util';
import { deleteFile, getFile, getFiles, sendFile } from './Dashboard.api';
import DashboardView from './Dashboard.view';

const DashboardController = () => {
	const [files, set_files] = useState([]);
	const [loading, set_loading] = useState(null);
	const [error, set_error] = useState(null);
	const [upload, set_upload] = useState(null);

	const loadFiles = (loading_process = true) => {
		if (loading_process)
			set_loading(
				getFiles()
					.then((res) => set_files(ValidateResponse(res).payload))
					.catch(
						(err) =>
							!ValidateResponse(err.response).status &&
							set_error(err.response.data.error)
					)
					.finally(() => set_loading(null))
			);
		else
			getFiles()
				.then((res) => set_files(ValidateResponse(res).payload))
				.catch(
					(err) =>
						!ValidateResponse(err.response).status &&
						set_error(err.response.data.error)
				)
				.finally(() => set_loading(null));
	};

	useEffect(() => {
		loadFiles();
		//eslint-disable-next-line
	}, []);

	const onChange = (args) => {
		set_upload(args);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (upload === null) return;
		const formData = new FormData();
		formData.append('doc', upload, upload.name);
		set_loading(
			sendFile(formData)
				.then(() => {
					loadFiles(false);
				})
				.catch(
					(err) =>
						!ValidateResponse(err.response).status &&
						set_error(err.response.data.error)
				)
		);
	};

	const download = (name) => {
		set_loading(
			getFile(name)
				.then((res) => fileDownload(res.data, name))
				.catch(
					(err) =>
						!ValidateResponse(err.response).status &&
						set_error(err.response.data.error)
				)
				.finally(() => set_loading(null))
		);
	};
	const deleteFileFn = (name) => {
		set_loading(
			deleteFile(name)
				.then(() => loadFiles())
				.catch(
					(err) =>
						!ValidateResponse(err.response).status &&
						set_error(err.response.data.error)
				)
				.finally(() => set_loading(null))
		);
	};
	return (
		<DashboardView
			error={error}
			loading={loading}
			files={files}
			deleteFile={deleteFileFn}
			onChange={onChange}
			onSubmit={onSubmit}
			download={download}
		/>
	);
};

export default DashboardController;

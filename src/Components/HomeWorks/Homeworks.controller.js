import { useEffect, useState } from 'react';
import { ValidateResponse } from '../../Utils/ValidateResponse.util';
import {
	deleteHomework,
	getHomeworks,
	getSpecifiedHomework,
} from './Homeworks.api';
import HomeworksView from './Homeworks.view';
import fileDownload from 'js-file-download';

const HomeworksController = () => {
	const [files, set_files] = useState([]);
	const [loading, set_loading] = useState(null);
	const [error, set_error] = useState(null);

	const createHRFFromDate = (date) => new Date(date).toLocaleString('hu-HU');

	const loadFiles = (loading_process = true) => {
		if (loading_process)
			set_loading(
				getHomeworks()
					.then((res) =>
						set_files(
							ValidateResponse(res)
								.payload.sort(
									(a, b) => new Date(b.birthtime) - new Date(a.birthtime)
								)
								.map((data) => {
									data.birthtime = createHRFFromDate(data.birthtime);
									return data;
								})
						)
					)
					.catch(
						(err) =>
							!ValidateResponse(err.response).status &&
							set_error(err.response.data.error)
					)
					.finally(() => set_loading(null))
			);
		else
			getHomeworks()
				.then((res) =>
					set_files(
						ValidateResponse(res)
							.payload.sort(
								(a, b) => new Date(b.birthtime) - new Date(a.birthtime)
							)
							.map((data) => {
								data.birthtime = createHRFFromDate(data.birthtime);
								return data;
							})
					)
				)
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

	const download = (name) => {
		set_loading(
			getSpecifiedHomework(name)
				.then((res) => fileDownload(res.data, name))
				.catch(
					(err) =>
						!ValidateResponse(err.response).status &&
						set_error(err.response.data.error)
				)
				.finally(() => set_loading(null))
		);
	};
	const deleteHomeworkFn = (name) => {
		set_loading(
			deleteHomework(name)
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
		<HomeworksView
			error={error}
			loading={loading}
			files={files}
			deleteFile={deleteHomeworkFn}
			download={download}
		/>
	);
};

export default HomeworksController;

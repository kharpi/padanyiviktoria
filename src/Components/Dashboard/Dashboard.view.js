import { useContext } from 'react';
import { UserContext } from '../Auth/User.context';
import Button from '../UI/Button';
import FileUpload from '../UI/FileUpload';
import Spinner from '../UI/Spinner';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';

const DashboardView = (props) => {
	const userContext = useContext(UserContext);
	if (props.loading) return <Spinner isTiny />;
	return (
		<section className='section-wrapper dashboard glass'>
			{userContext.getRole() && (
				<div style={{ marginBottom: '2rem' }}>
					<h2>Feltöltés:</h2>
					<form>
						<FileUpload onChange={props.onChange} onSubmit={props.onSubmit} />
					</form>
				</div>
			)}
			<h2>Dokumentumok:</h2>
			<ul>
				{props.files.map((file, idx) => (
					<li key={`file-${idx}`}>
						{file}
						<Button onClick={() => props.download(file)} small>
							<FontAwesomeIcon icon={faDownload} />
						</Button>
						{userContext.getRole() && (
							<Button onClick={() => props.deleteFile(file)} small>
								<FontAwesomeIcon icon={faTrash} />
							</Button>
						)}
					</li>
				))}
			</ul>
		</section>
	);
};

export default DashboardView;

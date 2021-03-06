import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../UI/Spinner';
import Button from '../UI/Button';
import './Homeworks.css';

const HomeworksView = (props) => {
	if (props.loading) return <Spinner isTiny />;
	return (
		<section className='section-wrapper homeworks-wrapper glass'>
			<h2>Házi feladatok:</h2>
			<ul>
				{props.files.map((file, idx) => (
					<li key={`file-${idx}`}>
						{`${file.birthtime} - ${file.file}`}
						<Button onClick={() => props.download(file.file)} small>
							<FontAwesomeIcon icon={faDownload} />
						</Button>
						<Button onClick={() => props.deleteFile(file.file)} small>
							<FontAwesomeIcon icon={faTrash} />
						</Button>
					</li>
				))}
			</ul>
		</section>
	);
};

export default HomeworksView;

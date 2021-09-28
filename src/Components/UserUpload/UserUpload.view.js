import FileUpload from '../UI/FileUpload';
import Spinner from '../UI/Spinner';

const UserUploadView = (props) => {
	if (props.loading) return <Spinner />;
	return (
		<section className='section-wrapper glass'>
			{!props.uploaded && (
				<div style={{ marginBottom: '2rem' }}>
					<h2>Prezentáció feltöltése:</h2>
					<p style={{ color: 'white', marginBottom: '1rem' }}>
						<small>
							A fájl neve az alábbi sémát kövesse:{' '}
							<strong>kiss_janos-nagy_antal.pptx</strong>
						</small>
					</p>
					<form>
						<FileUpload onChange={props.onChange} onSubmit={props.onSubmit} />
					</form>
				</div>
			)}
			<p className='input-warning centered'>
				{props.error || (props.uploaded && 'Sikeres feltöltés!')}
			</p>
		</section>
	);
};

export default UserUploadView;

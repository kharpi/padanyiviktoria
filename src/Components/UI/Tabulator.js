import { useState } from 'react';
import './Tabulator.css';

const Tabulator = (props) => {
	const [active, setActive] = useState(0);
	return (
		<>
			<div className='tabulator'>
				{props.tabs.map((tab, idx) => (
					<h3
						key={`tab-${idx}`}
						onClick={() => setActive(idx)}
						className={`tab${active === idx ? ' active' : ''}`}
					>
						{tab}
					</h3>
				))}
			</div>
			{props.contents.map((content, idx) => (
				<div key={`tab-content-${idx}`}>
					<div className={`tab-content${active === idx ? ' show' : ''}`}>
						{content}
					</div>
				</div>
			))}
		</>
	);
};

export default Tabulator;

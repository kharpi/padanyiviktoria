import React from 'react';
import Tabulator from '../UI/Tabulator';
import './Presentation.css';

const PresentationView = () => {
	const data = require('./Presentation.static.json');
	const headings = data.map((d) => d.heading);
	const contents_array = data.map((d) => d.themesAndDates);
	const contents = contents_array.map((tad, idx) => (
		<ul key={`tad-${idx}`}>
			{tad.map((p, idx) => (
				<React.Fragment key={`p-${idx}`}>
					<li className='sublead'>{p.lead}</li>
					<ul>
						{p.pres.map((pp, idx) => (
							<li key={`pp-${idx}`}>{pp}</li>
						))}
					</ul>
				</React.Fragment>
			))}
		</ul>
	));

	return (
		<section className='section-wrapper presentation-wrapper glass'>
			<Tabulator tabs={headings} contents={contents} />
		</section>
	);
};

export default PresentationView;

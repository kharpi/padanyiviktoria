import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouterView from './Components/Router/Router.view';
import { BrowserRouter } from 'react-router-dom';
import UserContextWrapper from './Components/Auth/User.context';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<UserContextWrapper>
				<RouterView />
			</UserContextWrapper>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

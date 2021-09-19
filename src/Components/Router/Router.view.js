import { useContext } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { UserContext } from '../Auth/User.context';
import LoginController from '../Login/Login.controller';
import { isExpired } from 'react-jwt';
import Layout from '../Layout/Layout.view';
import DashboardController from '../Dashboard/Dashboard.controller';
import UsersController from '../Users/Users.controller';
import UserUploadController from '../UserUpload/UserUpload.controller';
import HomeworksController from '../HomeWorks/Homeworks.controller';

const Router = () => {
	const userContext = useContext(UserContext);

	const getRoutes = () => {
		if (isExpired(userContext.user.token))
			return (
				<Route key={`login`} component={LoginController} path={`*`} exact />
			);

		const elements = [
			<Route
				key={`mainPage`}
				component={DashboardController}
				path={`/`}
				exact
			/>,
			<Route
				key={`userUploadPage`}
				component={UserUploadController}
				path={`/upload`}
				exact
			/>,
		];

		const privateRoutes = [
			<Route
				key={`usersPage`}
				component={UsersController}
				path={`/users`}
				exact
			/>,
			<Route
				key={`homeworksPage`}
				component={HomeworksController}
				path={`/homeworks`}
				exact
			/>,
		];
		if (userContext.getRole()) elements.push(privateRoutes);
		elements.push(
			<Route
				key={`mainPage`}
				component={DashboardController}
				path={`*`}
				exact
			/>
		);
		return elements;
	};

	return (
		<Layout>
			<Switch>{getRoutes()}</Switch>
		</Layout>
	);
};

export default withRouter(Router);

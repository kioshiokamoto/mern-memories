import { Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
	const user = JSON.parse(localStorage.getItem('profile'));
	return (
		<Router>
			<Container maxWidth="xl">
				<Navbar />
				<Switch>
					<Route path="/" exact component={() => <Redirect to="/posts" />} />
					<Route path="/posts" exact component={Home} />
					<Route path="/posts/search" exact component={Home} />
					<Route path="/posts/:id" exact component={PostDetails} />
					<Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
				</Switch>
			</Container>
		</Router>
	);
};

export default App;

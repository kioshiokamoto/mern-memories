import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid, Paper } from '@material-ui/core';
import { Posts } from '../Posts/Posts';
import { Form } from '../Form/Form';

import { getPosts } from '../../actions/posts';
import useStyles from './styles';
import { useDispatch } from 'react-redux';

import Pagination from '../Pagination';

const Home = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [currentId, setCurrentId] = useState(0);
	//console.log(currentId)
	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);
	return (
		<Grow in>
			<Container>
				<Grid
					container
					className={classes.mainContainer}
					justify="space-between"
					alignItems="stretch"
					spacing={3}
				>
					<Grid item xs={12} sm={7}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						<Paper elevation={6}>
							<Pagination />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;

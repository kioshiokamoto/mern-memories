import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid, Paper, TextField, Button } from '@material-ui/core';
import { Posts } from '../Posts/Posts';
import { Form } from '../Form/Form';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPosts, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import { useDispatch } from 'react-redux';

import Pagination from '../Pagination';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Home = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [currentId, setCurrentId] = useState(0);

	const query = useQuery();
	const history = useHistory();
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');

	const [search, setSearch] = useState('');
	const [tags, setTags] = useState([]);

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);

	const searchPost = () => {
		if (search.trim().length > 0 || tags.length > 0) {
			dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
			history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
		} else {
			history.push('/');
		}
	};

	const handleKeyPress = (e) => {
		if (e.charCode === 13) {
			searchPost();
		}
	};
	const handleAdd = (tag) => setTags([...tags, tag]);
	const handleDelete = (tagDelete) => setTags(tags.filter((tag) => tag !== tagDelete));

	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid
					container
					className={classes.gridContainer}
					justify="space-between"
					alignItems="stretch"
					spacing={3}
				>
					<Grid item xs={12} sm={6} md={9}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppBar className={classes.appBarSearch} position="static" color="inherit">
							<TextField
								name="search"
								variant="outlined"
								label="Search memories"
								fullWidth
								onKeyPress={handleKeyPress}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<ChipInput
								style={{ margin: '10px 0' }}
								value={tags}
								onAdd={handleAdd}
								onDelete={handleDelete}
								label="Search Tags"
								variant="outlined"
							/>
							<Button onClick={searchPost} className={classes.searchButton} color="primary">
								Search
							</Button>
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						<Paper elevation={6}>
							<Pagination className={classes.pagination} />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;

import React, { useState, useEffect } from 'react';

import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';

import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';
export const Form = ({ currentId, setCurrentId }) => {
	const post = useSelector((state) => (currentId ? state.posts.posts.find((p) => p._id === currentId) : null));
	const [postData, setPostData] = useState({
		title: '',
		message: '',
		tags: '',
		selectedFile: '',
	});
	const user = JSON.parse(localStorage.getItem('profile'));
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);
	//console.log(postData)
	const clear = () => {
		setCurrentId(0);

		setPostData({
			title: '',
			message: '',
			tags: '',
			selectedFile: '',
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		//console.log(postData);
		if (currentId) {
			await dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
		} else {
			await dispatch(createPost({ ...postData, name: user?.result?.name }));
		}
		clear();
	};
	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant="h6" align="center">
					Please Sign In to create your own memories and like other's memories
				</Typography>
			</Paper>
		);
	}

	return (
		<Paper className={classes.paper} elevation={6}>
			<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
				<Typography variant="h6">{currentId ? 'Editando ' : 'Creando'} un recuerdo</Typography>

				<TextField
					name="title"
					variant="outlined"
					label="Titulo"
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
				/>
				<TextField
					name="message"
					variant="outlined"
					label="Mensaje"
					fullWidth
					value={postData.message}
					onChange={(e) => setPostData({ ...postData, message: e.target.value })}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Etiquetas"
					fullWidth
					value={postData.tags}
					onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
				/>
				<div className={classes.fileInput}>
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
					/>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
					onClick={handleSubmit}
				>
					Crear
				</Button>
				<Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
					Limpiar
				</Button>
			</form>
		</Paper>
	);
};

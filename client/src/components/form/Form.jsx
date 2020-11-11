import React from 'react';
import './form.css';
import { Button, FormControl, Input } from '@material-ui/core';

const Form = ({ placeholder }) => {
	return (
		<section className='top'>
			<form>
				<FormControl fullWidth>
					<Input placeholder={placeholder} color='primary' fullWidth />
				</FormControl>
				<Button color='primary' variant='contained'>
					Post
				</Button>
			</form>
		</section>
	);
};

export default Form;

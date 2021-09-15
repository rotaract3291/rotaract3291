import React from 'react';
import { useEffect, useState } from 'react';
import { Paper, Container, TextField, Button, Grid, FormControl, InputLabel, Input, FormHelperText, Select, MenuItem, FormGroup, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import clubs from '../data/clubs.json';
import axios from 'axios';
//import PrimarySearchAppBar from './PrimarySearchAppBar';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
//import EnhancedTable from './EnhancedTableMeeting';
import { animateScroll as scroll } from 'react-scroll';
import { useRouter } from 'next/router';
import { PARTICIPATIONS_API } from '../urls';
import { handleImageUpload } from '../uploadFile';
import NavbarAdmin from '../../components/NavbarAdmin';
import { Account } from '../../components/Account';

const useStyles = makeStyles((theme) => ({
  container: {
	display: 'flex',
	flexWrap: 'wrap',
  },
  textField: {
	marginLeft: theme.spacing(1),
	marginRight: theme.spacing(1),
	width: 200,
  },
  formControl: {
	width: '100%',
	margin: '0.75rem 0'
  }
}));

export { AddEdit };

function AddEdit(props) {
	const participation = props?.data;
	const id = participation?.id;
	//debugger;
	const isAdd = !participation;
	console.log(participation);
  	const classes = useStyles();

	const router = useRouter();

	const [loading, setLoading] = useState(false);
	//debugger;

  	const [state, setState] = useState(
			isAdd ? {
				club: 'tollygunge',
				organisers: '',
				project_name: '',
				project_date: '',
				rid: '',
				members: '',
			} : {
				club: participation.club,
				organisers: participation.organisers,
				project_name: participation.project_name,
				project_date: participation.project_date,
				rid: participation.rid,
				members: participation.members,
			}
	);

	const [error, setError] = useState(null);
	const [submitError, setSubmitError] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);

	const handleChange = (evt) => {
		//debugger;
		const value = evt.target.value;
		setState({
			...state,
			[evt.target.name]: value,
		});
	}

	useEffect(() => console.log(state), [state])

  	const onSubmit = (event, state) => {
		console.log(state);
		event.preventDefault();
		const participation = {
			club: state.club,
			organisers: state.organisers,
			project_name: state.project_name,
			project_date: state.project_date,
			rid: state.rid,
			members: state.members,
		};

		const url = PARTICIPATIONS_API + '/participation';

		debugger;
		axios({
			method: isAdd ? 'POST' : 'PUT',
			url: isAdd ? url : url + '/' + id,
			data: participation
		}).then((response) => {
			//debugger;
			console.log(response.data);
			router.push('/participations');
			//setSubmitLoading(false);
		}).catch((error) => {
				console.log(error);
		});
	}

  	return (
        <Account>
            <NavbarAdmin />
			<div className="my-8" style={{ overflowX: 'hidden' }} >
			<Container>
				<Grid container direction="column" justify="center" alignItems="center">
					<Grid container xs={12} sm={6}>
						<div className={classes.formControl} style={{textAlign: 'center'}}><h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{(participation) ? 'Edit' : 'Add'} Participation</h1></div>

						<Alert variant="outlined" severity="info" className={classes.formControl} 
						style={{ display: (submitLoading)?'':'none', margin: ' 1rem 0 1rem 0' }}>
						Please wait...
						</Alert>
						
						<Alert variant="outlined" severity="error" className={classes.formControl} 
						style={{ display: (submitError)?'':'none', margin: ' 1rem 0 1rem 0' }}>
						Some error occured, please try again later.
						</Alert>

						<Alert variant="outlined" severity="error" className={classes.formControl} 
						style={{ display: (error)?'':'none', margin: ' 1rem 0 1rem 0' }}>
						Kindly fix the errors below.
						</Alert>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Club Name</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								name="club"
								value={state.club}
								onChange={(event) => handleChange(event)}
								disabled
								>
								{clubs.map((club) => {
									return (<MenuItem key={club.club_name} value={club.club_name}>
										{club.club_name}
									</MenuItem>);
								})}
							</Select>
						</FormControl>						

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Project Name</InputLabel>
							<Input id="project_name" name="project_name"
								value={state.project_name}
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Organised By</InputLabel>
							<Input id="organisers" name="organisers"
								value={state.organisers}
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">RI District</InputLabel>
							<Input id="rid" name="rid"
								value={state.rid}
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">No. of Members</InputLabel>
							<Input id="members" name="members"
								value={state.members} type="number"
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<FormHelperText>Date</FormHelperText>
							<TextField
								name="project_date"
								id="project_date"
								type="date"
								value={state.project_date}
								onChange={handleChange} />
						</FormControl>

						<Button
							variant="contained" 
							onClick={(event) => onSubmit(event, state)} >
							Submit
						</Button>
					</Grid>
				</Grid>
			</Container>
		</div>
	</Account>
	);
}

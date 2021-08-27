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
import { PROJECTS_API } from '../urls';
import { handleImageUpload } from '../uploadFile';

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
	const project = props?.data;
	const id = project?.id;
	//debugger;
	const isAdd = !project;
	console.log(project);
  	const classes = useStyles();

	const router = useRouter();

	const [loading, setLoading] = useState(false);
	//debugger;

  	const [state, setState] = useState(
			isAdd ? {
				club: '',
				project_name: '',
				project_type: '',
				brownie_type: '',
				venue_type: '',
				poster: '',
				start: '',
				end: '',
				description: '',
				report: '',
				rotaractors: '',
				rotarians: '',
				avenue: '',
				guests: '',
				media: '',
				attendance: '',

			} : {
				club: project.club,
				project_name: project.project_name,
				project_type: project.project_type,
				brownie_type: project.brownie_type,
				venue_type: project.venue_type,
				poster: project.poster,
				start: project.start,
				end: project.end,
				description: project.description,
				report: project.report,
				rotaractors: project.rotaractors,
				rotarians: project.rotarians,
				avenue: project.avenue,
				guests: project.guests,
				media: project.media,
				attendance: project.attendance,
			}
	);

	const [error, setError] = useState(null);
	const [submitError, setSubmitError] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);

	const handleChange = (evt) => {
		//debugger;
		const value = evt.target.value;
		if (evt.target.type === 'file') {
			const file = evt.target.files[0];
			handleImageUpload(file).then(x => {
				debugger;
				console.log(x);
				setState({
					...state,
					[evt.target.name]: file,
					[evt.target.name + '_file']: file,
					[evt.target.name + '_link']: x.Location
				});
			});
		} else {
			setState({
				...state,
				[evt.target.name]: value,
			});
		}
	}

	useEffect(() => console.log(state), [state])

  	const onSubmit = (event, state) => {
		console.log(state);
		event.preventDefault();
		const project = {
			club: state.club,
			project_name: state.project_name,
			project_type: state.project_type,
			brownie_type: state.brownie_type,
			venue_type: state.venue_type,
			poster: state.poster_link,
			start: state.start,
			end: state.end,
			description: state.description,
			report: state.report,
			rotaractors: state.rotaractors,
			rotarians: state.rotarians,
			avenue: state.avenue,
			guests: state.guests,
			media: state.media,
			attendance: state.attendance,
		};

		const url = PROJECTS_API + '/project';

		debugger;
		axios({
			method: isAdd ? 'POST' : 'PUT',
			url: isAdd ? url : url + '/' + id,
			data: project
		}).then((response) => {
			//debugger;
			console.log(response.data);
			router.push('/projects');
			//setSubmitLoading(false);
		}).catch((error) => {
				console.log(error);
		});
	}

  	return (
		<div style={{ overflowX: 'hidden' }} >
			<Container>
				<Grid container direction="column" justify="center" alignItems="center">
					<Grid container xs={12} sm={6}>
						<div className={classes.formControl} style={{textAlign: 'center'}}><h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{(project) ? 'Edit' : 'Add'} Project</h1></div>

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

						<FormControl className={classes.formControl} >
							<InputLabel id="gov_id">Project Type</InputLabel>
							<Select
								labelId="project_type"
								id="project_type"
								name="project_type"
								value={state.project_type}
								onChange={(event) => handleChange(event)}
								>
								<MenuItem value={'Solo Project'}>Solo Project</MenuItem>
								<MenuItem value={'Collaboration (Hosting / Co-hosting etc.)'}>Collaboration (Hosting / Co-hosting etc.)</MenuItem>
								<MenuItem value={'With Intra-district Twin'}>With Intra-district Twin</MenuItem>
								<MenuItem value={'With Multi-district Twin'}>With Multi-district Twin</MenuItem>
								<MenuItem value={'With International Twin'}>With International Twin</MenuItem>
								<MenuItem value={'Letterhead Exchange (outside RID 3291)'}>Letterhead Exchange (outside RID 3291)</MenuItem>
								<MenuItem value={'With Parent/Sponsor Club(s)'}>With Parent/Sponsor Club(s)</MenuItem>
								<MenuItem value={'With RCC(s) or Interact Club(s)'}>With RCC(s) or Interact Club(s)</MenuItem>
							</Select>
						</FormControl>

						<FormControl component="fieldset">
							<FormLabel component="legend">More Details</FormLabel>
							<RadioGroup aria-label="brownie_type" name="brownie_type" value={state.brownie_type} onChange={handleChange} row>
								<FormControlLabel value={'Thrust Area'} control={<Radio />} label="DRR's Thrust Area" />
								<FormControlLabel value={'COTS'} control={<Radio />} label="COTS" />
							</RadioGroup>
						</FormControl>
						
						<FormControl className={classes.formControl} >
							<InputLabel id="avenue">Avenue of Project *</InputLabel>
							<Select
								labelId="avenue"
								id="avenue"
								name="avenue"
								value={state.avenue}
								onChange={(event) => handleChange(event)}
								>
								<MenuItem value={'Community Service'}>Community Service</MenuItem>
								<MenuItem value={'Club Service'}>Club Service</MenuItem>
								<MenuItem value={'Professional Development'}>Professional Development</MenuItem>
								<MenuItem value={'International Service'}>International Service</MenuItem>
							</Select>
						</FormControl>

						<FormControl component="fieldset">
							<FormLabel component="legend">Project Venue Type</FormLabel>
							<RadioGroup aria-label="venue_type" name="venue_type" value={state.venue_type} onChange={handleChange} row>
								<FormControlLabel value={'Offline'} control={<Radio />} label="Offline" />
								<FormControlLabel value={'Online'} control={<Radio />} label="Online" />
							</RadioGroup>
						</FormControl>

						<FormControl className={classes.formControl}>
							<FormHelperText>Project Poster</FormHelperText>
							<Input id="poster" name="poster" type="file"
								onChange={handleChange}
							/>
						</FormControl>
						
						<FormControl className={classes.formControl}>
							<FormHelperText>Start Date & Time</FormHelperText>
							<TextField
								name="start"
								id="start"
								type="datetime-local"
								value={state.start}
								onChange={handleChange} />
						</FormControl>

						<FormControl className={classes.formControl}>
							<FormHelperText>End Date & Time</FormHelperText>
							<TextField
								name="end"
								id="end"
								type="datetime-local"
								value={state.end}
								onChange={handleChange} />
						</FormControl>

						<FormControl className={classes.formControl}>
							<TextField
								id="description"
								label="Short Description"
								multiline
								name="description"
								rows={3}
								onChange={handleChange}
								value={state.description}
							/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<TextField
								id="report"
								label="Project Report"
								multiline
								name="report"
								rows={8}
								onChange={handleChange}
								value={state.report}
							/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Rotaractors Present</InputLabel>
							<Input id="rotaractors" name="rotaractors"
								value={state.rotaractors} type="number"
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Rotarians Present</InputLabel>
							<Input id="rotarians" name="rotarians"
								value={state.rotarians} type="number"
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Guests Present</InputLabel>
							<Input id="guests" name="guests"
								value={state.guests} type="number"
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Photos/Videos Drive Link</InputLabel>
							<Input id="media" name="media"
								value={state.media}
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Attendance Sheet Drive Link</InputLabel>
							<Input id="attendance" name="attendance"
								value={state.attendance}
								onChange={(event) => handleChange(event)}
							/>
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
	);
}

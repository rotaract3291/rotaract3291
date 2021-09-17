import React from 'react';
import { useEffect, useState, useContext } from 'react';
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
import NavbarAdmin from '../../components/NavbarAdmin';
import { AccountContext } from '../../components/Account';

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
	const [session, setSession] = useState();
	const [club, setClub] = useState();
    const { getSession, logout } = useContext(AccountContext);

	const [state, setState] = useState({
		club: '',
		project_name: '',
		project_type: '',
		thrust_area: false,
		cots: false,
		venue_type: '',
		poster: '',
		start_date: '',
		end_date: '',
		description: '',
		report: '',
		rotaractors: '',
		rotarians: '',
		avenue: '',
		guests: '',
		media: '',
		attendance: '',
	});

    useEffect(() => {
        getSession().then((sessionData) => {
            setSession(sessionData);
			const club_name = sessionData['idToken']['payload']['cognito:username'].toLowerCase()
			setState(isAdd ? {
					club: club_name,
					project_name: '',
					project_type: '',
					thrust_area: false,
					cots: false,
					venue_type: '',
					poster: '',
					start_date: '',
					end_date: '',
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
					thrust_area: project.thrust_area,
					cots: project.cots,
					venue_type: project.venue_type,
					poster_link: project.poster,
					start_date: project.start_date,
					end_date: project.end_date,
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
		}).catch((error) => {
			router.push('/admin');
		});
	}, []);

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
		} else if (evt.target.type === 'checkbox') {
			setState({
				...state,
				[evt.target.name]: evt.target.checked,
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
			thrust_area: state.thrust_area,
			cots: state.cots,
			venue_type: state.venue_type,
			poster: state.poster_link,
			start_date: state.start_date,
			end_date: state.end_date,
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
			debugger;
			console.log(error);
		});
	}

  	return (
        <>
            <NavbarAdmin session={session} />
			<div className="my-8" style={{ overflowX: 'hidden' }} >
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
								disabled
								>
								{clubs.map((club) => {
									return (<MenuItem key={club.alias} value={club.alias}>
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
								<FormControlLabel control={
									<Checkbox
										defaultChecked={state.thrust_area}
										name='thrust_area'
										value={state.thrust_area}
										onChange={handleChange}
										inputProps={{ 'aria-label': 'DRR\'s Thrust Area' }}
									/>
								} label="DRR's Thrust Area" />
								<FormControlLabel control={
									<Checkbox
										defaultChecked={state.cots}
										name='cots'
										value={state.cots}
										onChange={handleChange}
										inputProps={{ 'aria-label': 'COTS' }}
									/>
								} label="COTS" />
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
							{(state.poster_link) ? <FormHelperText><a className="text-theme-blue underline" href={state.poster_link} target="_blank" rel="noreferrer">Last Uploaded Poster</a></FormHelperText> : ""}
						</FormControl>
						
						<FormControl className={classes.formControl}>
							<FormHelperText>Start Date & Time</FormHelperText>
							<TextField
								name="start_date"
								id="start_date"
								type="datetime-local"
								value={state.start_date}
								onChange={handleChange} />
						</FormControl>

						<FormControl className={classes.formControl}>
							<FormHelperText>End Date & Time</FormHelperText>
							<TextField
								name="end_date"
								id="end_date"
								type="datetime-local"
								value={state.end_date}
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
	</>
	);
}

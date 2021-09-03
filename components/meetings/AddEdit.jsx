import React from 'react';
import { useEffect, useState } from 'react';
import { Container, TextField, Button, Grid, FormControl, InputLabel, Input, FormHelperText, Select, MenuItem, FormGroup, FormLabel, FormControlLabel } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import clubs from '../data/clubs.json';
import axios from 'axios';
import { animateScroll as scroll } from 'react-scroll';
import { useRouter } from 'next/router';
import { MEETINGS_API, MEMBERS_API } from '../urls';
import Multiselect from 'multiselect-react-dropdown';

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
	const meeting = props?.data;
	const id = meeting?.id;
	//debugger;
	const isAdd = !meeting;
	console.log(meeting);
  	const classes = useStyles();

	const [loading, setLoading] = useState(true);
	const [clubMembers, setClubMembers] = useState([]);
	const [selectedClubMembers, setSelectedClubMembers] = useState(
		isAdd ? [] : meeting.members);

	const onSelect = (selectedValues, member) => {
		debugger;
		setSelectedClubMembers([...selectedClubMembers, member]);
	}

	const onRemove = (selectedValues, member) => {
		debugger;
		const newSelectedClubMembers = selectedClubMembers.filter((m) => m.id !== member.id);
		setSelectedClubMembers(newSelectedClubMembers);
	}

	//debugger;
	useEffect(() => {
		axios.get(MEMBERS_API + '/members').then(m => {
			//debugger;
			for (let i = 0; i<m.data.length; i++)
				clubMembers.push({name: m.data[i].full_name, id: m.data[i].id});
			console.log(clubMembers);
			setLoading(false);
		})
	}, []);

	useEffect(() => {
		console.log(selectedClubMembers);
	}, [selectedClubMembers]);

	const router = useRouter();
	//debugger;

  	const [state, setState] = useState(
			isAdd ? {
				club: 'RC Tollygunge',
				meeting_type: '',
				venue: '',
				meeting_date: '',
				members: '',
				rotarians: '',
				guests: '',
				participating_clubs: '',
			} : {
				club: meeting.club,
				meeting_type: meeting.meeting_type,
				venue: meeting.venue,
				meeting_date: meeting.meeting_date,
				members: selectedClubMembers,
				rotarians: meeting.rotarians,
				guests: meeting.guests,
				participating_clubs: meeting.participating_clubs,
			}
	);

	const [error, setError] = useState(null);
	const [submitError, setSubmitError] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);

	const handleChange = (evt) => {
		//console.log('else');
		const value = evt.target.value;
		//console.log(evt.target.name, value);
		//console.log(state);
		setState({
			...state,
			[evt.target.name]: value
		});
	}

  	const onSubmit = (event, state) => {
		console.log(state);
		event.preventDefault();
		const meeting = {
			club: state.club,
			meeting_type: state.meeting_type.toString(),
			venue: state.venue,
			meeting_date: state.meeting_date,
			members: selectedClubMembers,
			rotarians: state.rotarians,
			guests: state.guests,
			participating_clubs: state.participating_clubs,
		};

		const url = MEETINGS_API + '/meeting';

		debugger;
		axios({
			method: isAdd ? 'POST' : 'PUT',
			url: isAdd ? url : url + '/' + id,
			data: meeting
		}).then((response) => {
			debugger;
			console.log(response.data);
			router.push('/meetings');
			//setSubmitLoading(false);
		}).catch((error) => {
			debugger;
			console.log(error);
		});
	}

  	return (
		<div style={{ overflowX: 'hidden' }} >
			<Container>
				<Grid container direction="column" justify="center" alignItems="center">
					<Grid container xs={12} sm={6}>
						<div className={classes.formControl} style={{textAlign: 'center'}}><h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{(meeting) ? 'Edit' : 'Add'} Meeting</h1></div>

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

						<FormControl className={classes.formControl} >
							<InputLabel id="meeting_type">Meeting Type</InputLabel>
							<Select
								labelId="meeting_type"
								id="meeting_type"
								name="meeting_type"
								value={state.meeting_type}
								onChange={(event) => handleChange(event)}
								>
								<MenuItem value={0} disabled>Select Meeting Type</MenuItem>
								<MenuItem value={'RGM'}>RGM</MenuItem>
								<MenuItem value={'Joint Meeting'}>Joint Meeting</MenuItem>
								<MenuItem value={'Board Meeting'}>Board Meeting</MenuItem>
							</Select>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Venue</InputLabel>
							<Input id="venue" name="venue"
								value={state.venue}
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<FormHelperText>Date</FormHelperText>
							<TextField
								name="meeting_date"
								id="meeting_date"
								type="date"
								//defaultValue={state.meeting_date} 
								value={state.meeting_date}
								onChange={(event) => handleChange(event)} />
						</FormControl>
						{
							(loading) ? '' :
							<FormControl className={classes.formControl}>
								<FormHelperText>Members</FormHelperText>
								<Multiselect
									options={clubMembers} // Options to display in the dropdown
									placeholder="Members Present"
									onSelect={onSelect}
									onRemove={onRemove}
									selectedValues={state.members}
									displayValue="name" // Property name to display in the dropdown options
									showCheckbox="true"
								/>
							</FormControl>
						}

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Rotarians</InputLabel>
							<Input id="rotarians" name="rotarians"
								value={state.rotarians}
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Guests</InputLabel>
							<Input id="guests" name="guests"
								value={state.guests}
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

						<FormControl style={{ display: (state.meeting_type === 'Joint Meeting') ? '' : 'none' }} className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Participating Clubs</InputLabel>
							<Input id="participating_clubs" name="participating_clubs"
								value={state.participating_clubs}
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

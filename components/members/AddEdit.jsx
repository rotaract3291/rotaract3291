import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Container, TextField, Button, Grid, FormControl, InputLabel, Input, FormHelperText, Select, MenuItem, FormGroup, FormLabel, FormControlLabel } from '@material-ui/core';
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
import { MEMBERS_API } from '../urls';
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
	const member = props?.data;
	const id = member?.id;
	//debugger;
	const isAdd = !member;
	console.log(member);
  	const classes = useStyles();

	const router = useRouter();
	
	const [session, setSession] = useState();
    const { getSession, logout } = useContext(AccountContext);

	const [state, setState] = useState({
		full_name: '',
		club: '',
		phone: '',
		email: '',
		address: '',
		dob: '',
		doi: '',
		ri_id: '',
		gov_id: '',
		gov_id_number: '',
		blood_group: '',
		occupation: '',
		previous_positions: '',
		current_positions: '',
		photo: '',
		gov_id_doc: ''
	});
  
    useEffect(() => {
        getSession().then((sessionData) => {
            setSession(sessionData);
			const club_name = sessionData['idToken']['payload']['name'].toLowerCase();
			setState(isAdd ? {
				full_name: '',
				club: club_name,
				phone: '',
				email: '',
				address: '',
				dob: '',
				doi: '',
				ri_id: '',
				gov_id: '',
				gov_id_number: '',
				blood_group: '',
				occupation: '',
				previous_positions: '',
				current_positions: '',
				photo: '',
				gov_id_doc: ''
			} : {
				full_name: member.full_name,
				club: member.club,
				phone: member.phone,
				email: member.email,
				address: member.address,
				dob: member.dob,
				doi: member.doi,
				ri_id: member.ri_id,
				gov_id: member.gov_id,
				gov_id_number: member.gov_id_number,
				blood_group: member.blood_group,
				occupation: member.occupation,
				previous_positions: member.previous_positions,
				current_positions: member.current_positions,
				photo: null,
				gov_id_doc: null,
				photo_link: member.photo,
				gov_id_doc_link: member.gov_id_doc
			});
		}).catch((error) => {
			router.push('/admin');
		});
	}, []);

	//const [members, setMembers] = useState(null);
	const [loading, setLoading] = useState(false);
	//debugger;

	const [error, setError] = useState(null);
	const [submitError, setSubmitError] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);

	//useEffect(() => {console.log(members)}, [members]);
	//useEffect(() => {console.log(attendance)}, [attendance]);

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
		const member = {
			full_name: state.full_name,
			club: state.club,
			phone: state.phone,
			email: state.email,
			address: state.address,
			dob: state.dob,
			doi: state.doi,
			ri_id: state.ri_id,
			gov_id: state.gov_id,
			gov_id_number: state.gov_id_number,
			blood_group: state.blood_group,
			occupation: state.occupation,
			previous_positions: state.previous_positions,
			current_positions: state.current_positions,
			photo: state.photo_link,
			gov_id_doc: state.gov_id_doc_link,
		};

		const url = MEMBERS_API + '/member';

		debugger;
		axios({
			method: isAdd ? 'POST' : 'PUT',
			url: isAdd ? url : url + '/' + id,
			data: member
		}).then((response) => {
			//debugger;
			console.log(response.data);
			router.push('/members');
			//setSubmitLoading(false);
		}).catch((error) => {
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
						<div className={classes.formControl} style={{textAlign: 'center'}}><h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{(member) ? 'Edit' : 'Add'} Member</h1></div>

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
							<InputLabel id="demo-simple-select-label">Full Name</InputLabel>
							<Input id="full_name" name="full_name"
								value={state.full_name}
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

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
										Rotaract Club of {club.club_name}
									</MenuItem>);
								})}
							</Select>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Email Address</InputLabel>
							<Input id="email" name="email"
								value={state.email}
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Contact No.</InputLabel>
							<Input id="phone" name="phone"
								value={state.phone}
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Full Address</InputLabel>
							<Input id="address" name="address"
								value={state.address}
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">RI Membership ID</InputLabel>
							<Input id="ri_id" name="ri_id"
								value={state.ri_id}
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Occupation</InputLabel>
							<Input id="occupation" name="occupation"
								value={state.occupation}
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

						<FormControl className={classes.formControl} >
							<InputLabel id="gov_id">Government ID</InputLabel>
							<Select
								labelId="gov_id"
								id="gov_id"
								name="gov_id"
								value={state.gov_id}
								onChange={(event) => handleChange(event)}
								>
								<MenuItem value={0}>Select Goverment ID</MenuItem>
								<MenuItem value={1}>Aadhar Card</MenuItem>
								<MenuItem value={2}>Driving License</MenuItem>
								<MenuItem value={3}>Passport</MenuItem>
								<MenuItem value={4}>Voter Card</MenuItem>
							</Select>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Govt. ID Number</InputLabel>
							<Input id="gov_id_number" name="gov_id_number"
								value={state.gov_id_number}
								onChange={(event) => handleChange(event)}
							/>
						</FormControl>

						<FormControl className={classes.formControl} >
							<InputLabel id="blood_group">Blood Group *</InputLabel>
							<Select
								labelId="blood_group"
								id="blood_group"
								name="blood_group"
								value={state.blood_group}
								onChange={(event) => handleChange(event)}
								>
								<MenuItem value={0}>Select Blood Group</MenuItem>
								<MenuItem value={1}>A +ve</MenuItem>
								<MenuItem value={2}>A -ve</MenuItem>
								<MenuItem value={3}>B +ve</MenuItem>
								<MenuItem value={4}>B -ve</MenuItem>
								<MenuItem value={5}>AB +ve</MenuItem>
								<MenuItem value={6}>AB -ve</MenuItem>
								<MenuItem value={7}>O +ve</MenuItem>
								<MenuItem value={8}>O -ve</MenuItem>
							</Select>
						</FormControl>

						<FormControl className={classes.formControl}>
							<FormHelperText>Date of Birth</FormHelperText>
							<TextField
								name="dob"
								id="dob"
								type="date"
								value={state.dob}
								onChange={(event) => handleChange(event)} />
						</FormControl>

						<FormControl className={classes.formControl}>
							<FormHelperText>Date of Induction</FormHelperText>
							<TextField
								name="doi"
								id="doi"
								type="date"
								value={state.doi}
								onChange={(event) => handleChange(event)} />
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Previous Positions Held</InputLabel>
							<Input id="previous_positions" name="previous_positions"
								value={state.previous_positions}
								onChange={(event) => handleChange(event)}
								/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Current Positions</InputLabel>
							<Input id="current_positions" name="current_positions"
								value={state.current_positions}
								onChange={(event) => handleChange(event)}
								/>
						</FormControl>

						<FormControl className={classes.formControl}>
							<FormHelperText>Passport Size Photo</FormHelperText>
							<Input id="photo" name="photo" type="file"
								onChange={(event) => handleChange(event)}
							/>
							{(state.photo_link) ? <FormHelperText><a className="text-theme-blue underline" href={state.photo_link} target="_blank" rel="noreferrer">Last Uploaded Photo</a></FormHelperText> : ""}
						</FormControl>

						<FormControl className={classes.formControl}>
							<FormHelperText>Govt. ID Scan</FormHelperText>
							<Input id="gov_id_doc" name="gov_id_doc" type="file"
								onChange={(event) => handleChange(event)}
							/>
							{(state.gov_id_doc_link) ? <FormHelperText><a className="text-theme-blue underline" href={state.gov_id_doc_link} target="_blank" rel="noreferrer">Last Uploaded Photo</a></FormHelperText> : ""}
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

import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Container, TextField, Button, Grid, FormControl, InputLabel, Input, FormHelperText, MenuItem, FormGroup, FormLabel, FormControlLabel } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import clubs from '../data/clubs.json';
import axios from 'axios';
import { useRouter } from 'next/router';
import { LETTERHEAD_API} from '../urls';
import Multiselect from 'multiselect-react-dropdown';
import NavbarAdmin from '../../components/NavbarAdmin';
import { AccountContext } from '../../components/Account';
import { useFormik, Field } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';

const LetterheadSchema = Yup.object().shape({
	participating_club: Yup.string().required('Required'),
	district_of_participant: Yup.string().required('Required'),
	doe: Yup.date('Invalid date').required('Required'),
	venue_type: Yup.string().required('Required'),
	media: Yup.string().url('Enter a valid URL').required('Required')
});

export { AddEdit };

function AddEdit(props) {
	const letterhead = props?.data;
	const id = letterhead?.id;

	const isAdd = !letterhead;
	console.log(letterhead);


	
	const router = useRouter();

	const [session, setSession] = useState();
	const [clubName, setClubName] = useState();
    const { getSession, logout } = useContext(AccountContext);

	const [state, setState] = useState({
		club: '',
		participating_club: '',
		district_of_participant: '',
		doe: '',
		venue_type: '',
		media: ''
	});
  
    useEffect(() => {
        getSession().then((sessionData) => {
            setSession(sessionData);

			setClubName(sessionData['clubName']);
			setState(isAdd ? {
					club: sessionData['username'],
					participating_club: '',
					district_of_participant: '',
					doe: '',
					venue_type: '',
					media: ''
				} : {
					club: letterhead.club,
					participating_club: letterhead.participating_club,
					district_of_participant: letterhead.district_of_participant,
					doe: letterhead.doe,
					venue_type: letterhead.venue_type,
					media: letterhead.media
				}
			);
		}).catch((error) => {
			router.push('/admin');
		});
	}, []);
	
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			club: state.club,
			participating_club: state.participating_club,
			district_of_participant: state.district_of_participant,
			doe: state.doe,
			venue_type: state.venue_type,
			media: state.media
		},
		validationSchema: LetterheadSchema,
		onSubmit: (values) => {

			const letterhead = {
				club: values.club,
				participating_club: values.participating_club,
				district_of_participant: values.district_of_participant,
				doe: values.doe,
				venue_type: values.venue_type,
				media: values.media
			};
			console.log(letterhead);
			const url = LETTERHEAD_API + '/letterhead';   //change
			
			debugger;
			axios({
				method: isAdd ? 'POST' : 'PUT',
				url: isAdd ? url : url + '/' + id,
				data: letterhead
			}).then((response) => {
				debugger;
				console.log(response.data);
				router.push('/letterheads');
				//setSubmitLoading(false);
			}).catch((error) => {
				debugger;
				console.log(error);
			});
		}
	});

  	return (
        <>
            <NavbarAdmin session={session} />
			<div className="my-8" style={{ overflowX: 'hidden' }} >
			<Container>
				<Grid container direction="column" justifyContent="center" alignItems="center">
					<Grid container xs={12} sm={6}>
						<div className="text-3xl font-sub-heading text-center">{(letterhead) ? 'Edit' : 'Add'} Letterhead</div>

						
						<div className="w-full my-8 font-text">
							<form onSubmit={formik.handleSubmit}>	  
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Rotaract Club of
									</label>
									<input disabled value={clubName} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Participating Club
									</label>
									<input onChange={formik.handleChange} value={formik.values.participating_club} name="participating_club"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text" placeholder="Participating Club" />
									{formik.errors.participating_club && formik.touched.participating_club ? (
										<div className="text-red-700">{formik.errors.participating_club}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										District of Participant
									</label>
									<input onChange={formik.handleChange} value={formik.values.district_of_participant} name="district_of_participant"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text" placeholder="District of Participant" />
									{formik.errors.district_of_participant && formik.touched.district_of_participant ? (
										<div className="text-red-700">{formik.errors.district_of_participant}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Date of Exchange
									</label>
									<input onChange={formik.handleChange} value={formik.values.doe} name="doe"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="date" placeholder="Date of Exchange" />
									{formik.errors.doe && formik.touched.doe ? (
										<div className="text-red-700">{formik.errors.doe}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">Letterhead Exchange Type</label>
									<div className="grid grid-cols-2 grid-rows-1">
										<div>
											<label class="text-gray-700 text-sm mb-2">
												<input checked={formik.values.venue_type === 'offline'} onChange={formik.handleChange} value={'offline'} name="venue_type" type="radio"/>
												<span className="ml-2">Offline</span>
											</label>
										</div>
										<div>
											<label class="text-gray-700 text-sm mb-2">
												<input checked={formik.values.venue_type === 'online'} onChange={formik.handleChange} value={'online'} name="venue_type" type="radio"/>
												<span className="ml-2">Online</span>
											</label>
										</div>
									</div>
									{formik.errors.venue_type && formik.touched.venue_type ? (
										<div className="text-red-700">{formik.errors.venue_type}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Photos/Video Link
									</label>
									<input onChange={formik.handleChange} value={formik.values.media} name="media" class="shadow appearance-none border 
									rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="url" placeholder="Photos/Videos Link" />
									{formik.errors.media && formik.touched.media ? (
										<div className="text-red-700">{formik.errors.media}</div>
									) : null}
								</div>
								<div class="inline-block relative w-full">
									<button className="bg-theme-blue text-theme-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
								</div>
							</form>
						</div>

					</Grid>
				</Grid>
			</Container>
		</div>
	</>
	);
}

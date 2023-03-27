import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Paper, Container, TextField, Button, Grid, FormControl, InputLabel, Input, FormHelperText, Select, MenuItem, FormGroup, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import clubs from '../data/clubs.json';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import { useRouter } from 'next/router';
import { PROJECTS_API } from '../urls';
import { handleImageUpload } from '../uploadFile';
import NavbarAdmin from '../../components/NavbarAdmin';
import { AccountContext } from '../../components/Account';
import { useFormik, Field } from 'formik';
import * as Yup from 'yup';

const ProjectSchema = Yup.object().shape({
	project_name: Yup.string().required('Required'),
	project_type: Yup.string().required('Required'),
	more_details: Yup.string(),
	venue: Yup.string().required('Required'),
	venue_type: Yup.string().required('Required'),
	poster: Yup.string().url('Enter a valid URL'),
	start_date: Yup.date('Invalid date').required('Required'),
	end_date: Yup.date('Invalid date').required('Required'),
	description: Yup.string().required('Required').max(300, 'Must be less than 300 characters.'),
	report: Yup.string().required('Required').max(2000, 'Must be less than 2000 characters.'),
	rotaractors: Yup.number().required('Required').integer(),
	rotarians: Yup.number().required('Required').integer(),
	avenue: Yup.string().required('Required'),
	guests: Yup.number().required('Required').integer(),
	media: Yup.string().url('Enter a valid URL').required('Required'),
	attendance: Yup.string().url('Enter a valid URL'),
	lives_touched: Yup.number().integer(),
	money_value: Yup.number().integer(),
	in_kind_value: Yup.number().integer()
});

export { AddEdit };

function AddEdit(props) {
	const project = props?.data;
	const id = project?.id;
	//debugger;
	const isAdd = !project;
	console.log(project);

	const router = useRouter();

	const [session, setSession] = useState();
	const [clubName, setClubName] = useState();
    const { getSession, logout } = useContext(AccountContext);

	const [state, setState] = useState({
		club: '',
		project_name: '',
		project_type: '',
		more_details:'',
		venue: '',
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
		lives_touched: '',
		money_value: '',
		in_kind_value: ''
	});

    useEffect(() => {
        getSession().then((sessionData) => {
            setSession(sessionData);

			setClubName(sessionData['clubName']);
			setState(isAdd ? {
					club: sessionData['username'],
					project_name: '',
					project_type: 'Solo Project',
					more_details:'',
					venue: '',
					venue_type: '',
					poster: '',
					start_date: '',
					end_date: '',
					description: '',
					report: '',
					rotaractors: '',
					rotarians: '',
					avenue: 'Community Service',
					guests: '',
					media: '',
					attendance: '',
					lives_touched: '',
					money_value: '',
					in_kind_value: ''
				} : {
					club: project.club,
					project_name: project.project_name,
					project_type: project.project_type,
					more_details:project.more_details,
					venue: project.venue,
					venue_type: project.venue_type,
					start_date: project.start_date,
					end_date: project.end_date,
					poster: project.poster,
					description: project.description,
					report: project.report,
					rotaractors: project.rotaractors,
					rotarians: project.rotarians,
					avenue: project.avenue,
					guests: project.guests,
					media: project.media,
					attendance: project.attendance,
					lives_touched: project.lives_touched,
					money_value: project.money_value,
					in_kind_value: project.in_kind_value
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
			project_name: state.project_name,
			project_type: state.project_type,
			more_details:state.more_details,
			venue: state.venue,
			venue_type: state.venue_type,
			poster: state.poster,
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
			lives_touched: state.lives_touched,
			money_value: state.money_value,
			in_kind_value: state.in_kind_value
		},
		validationSchema: ProjectSchema,
		onSubmit: (values) => {
			debugger;
			console.log(values);
			const project = {
				club: values.club,
				project_name: values.project_name,
				project_type: values.project_type,
				more_details:values.more_details,
				venue: values.venue,
				venue_type: values.venue_type,
				poster: values.poster,
				start_date: values.start_date,
				end_date: values.end_date,
				description: values.description,
				report: values.report,
				rotaractors: values.rotaractors,
				rotarians: values.rotarians,
				avenue: values.avenue,
				guests: values.guests,
				media: values.media,
				attendance: values.attendance,
				lives_touched: values.lives_touched,
				money_value: values.money_value,
				in_kind_value : values.in_kind_value
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
	});

	const handleChange = (evt) => {
		//debugger;
		const file = evt.target.files[0];
		
		if (file.type === "image/jpeg" ||
			file.type === "image/png") {
			handleImageUpload(file).then(x => {
				debugger;
				console.log(x);
				formik.setFieldValue("poster", x.Location);
			});
		}
	}

  	return (
        <>
            <NavbarAdmin session={session} />
			<div className="my-8" style={{ overflowX: 'hidden' }} >
			<Container>
				<Grid container direction="column" justify="center" alignItems="center">
					<Grid container xs={12} sm={6}>
						<div className="text-3xl font-sub-heading text-center">{(project) ? 'Edit' : 'Add'} Project</div>

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
										Project Name
									</label>
									<input onChange={formik.handleChange} value={formik.values.project_name} name="project_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Project Name" />
									{formik.errors.project_name && formik.touched.project_name ? (
										<div className="text-red-700">{formik.errors.project_name}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Project Type
									</label>
									<select
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										name="project_type"
										value={formik.values.project_type}
										onChange={formik.handleChange}
									>
										<option value={'Solo Project'}>Solo Project</option>
										<option value={'With Intra-district Twin'}>With Intra-district Twin</option>
										<option value={'With Multi-district Twin'}>With Multi-district Twin</option>
										<option value={'With International Twin'}>With International Twin</option>
										<option value={'With Parent/Sponsor Club(s)'}>With Parent/Sponsor Club(s)</option>
										<option value={'With RCC(s) or Interact Club(s)'}>With RCC(s) or Interact Club(s)</option>
									</select>
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">More Details</label>
									<div className="grid grid-cols-2 grid-rows-1">
										<div>
											<label class="text-gray-700 text-sm mb-2">
												<input checked={formik.values.more_details === 'thrust_area' } onChange={formik.handleChange} value={'thrust_area'} name="more_details" type="radio"/>
												<span className="ml-2">DRR's Thrust Area</span>
											</label>
											{formik.errors.thrust_area && formik.touched.thrust_area ? (
												<div className="text-red-700">{formik.errors.thrust_area}</div>
											) : null}
										</div>
										<div>
											<label class="text-gray-700 text-sm mb-2">
												<input checked={formik.values.more_details === 'cots'} onChange={formik.handleChange} value={'cots'} name="more_details" type="radio"/>
												<span className="ml-2">COTS</span>
											</label>
											{formik.errors.more_details && formik.touched.more_details ? (
												<div className="text-red-700">{formik.errors.more_details}</div>
											) : null}
										</div>
									</div>
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Project Avenue
									</label>
									<select
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										name="avenue"
										value={formik.values.avenue}
										onChange={formik.handleChange}
									>
										<option value={'Community Service'}>Community Service</option>
										<option value={'Club Service'}>Club Service</option>
										<option value={'Professional Development'}>Professional Development</option>
										<option value={'International Service'}>International Service</option>
									</select>
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Project Venue
									</label>
									<input onChange={formik.handleChange} value={formik.values.venue} name="venue"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text" placeholder="Project Venue" />
									{formik.errors.venue && formik.touched.venue ? (
										<div className="text-red-700">{formik.errors.venue}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">Project Venue Type</label>
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
										Project Poster (upload jpg/png file only) (optional)
									</label>
									<input onChange={handleChange} name="poster" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" placeholder="Project Poster" />
									{(formik.values.poster) ? <label class="underline text-gray-700 text-sm text-theme-blue"><a href={formik.values.poster} rel="noreferrer" target="_blank">Last Uploaded File</a></label> : '' }
									{formik.errors.poster && formik.touched.poster ? (
										<div className="text-red-700">{formik.errors.poster}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Start Date & Time
									</label>
									<input onChange={formik.handleChange} value={formik.values.start_date} name="start_date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="datetime-local" placeholder="Start Date & Time" />
									{formik.errors.start_date && formik.touched.start_date ? (
										<div className="text-red-700">{formik.errors.start_date}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										End Date & Time
									</label>
									<input onChange={formik.handleChange} value={formik.values.end_date} name="end_date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="datetime-local" placeholder="End Date & Time" />
									{formik.errors.end_date && formik.touched.end_date ? (
										<div className="text-red-700">{formik.errors.end_date}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Short Description
									</label>
									<textarea onChange={formik.handleChange} value={formik.values.description} name="description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Short Description (Less than 300 characters)" ></textarea>
									{formik.errors.description && formik.touched.description ? (
										<div className="text-red-700">{formik.errors.description}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Project Report
									</label>
									<textarea rows="5" onChange={formik.handleChange} value={formik.values.report} name="report" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Project Report (Less than 2000 characters)" ></textarea>
									{formik.errors.report && formik.touched.report ? (
										<div className="text-red-700">{formik.errors.report}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Rotaractors Present
									</label>
									<input onChange={formik.handleChange} value={formik.values.rotaractors} name="rotaractors" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="No. of Rotaractors" />
									{formik.errors.rotaractors && formik.touched.rotaractors ? (
										<div className="text-red-700">{formik.errors.rotaractors}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Rotarians Present
									</label>
									<input onChange={formik.handleChange} value={formik.values.rotarians} name="rotarians" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="No. of Rotarians" />
									{formik.errors.rotarians && formik.touched.rotarians ? (
										<div className="text-red-700">{formik.errors.rotarians}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Guests Present
									</label>
									<input onChange={formik.handleChange} value={formik.values.guests} name="guests" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="No. of Guests" />
									{formik.errors.guests && formik.touched.guests ? (
										<div className="text-red-700">{formik.errors.guests}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										No. of lives touched 
									</label>
									<input onChange={formik.handleChange} value={formik.values.lives_touched} name="lives_touched" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="How many beneficiaries/participants were there in the event" />
									{formik.errors.lives_touched && formik.touched.lives_touched ? (
										<div className="text-red-700">{formik.errors.lives_touched}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Monetary value
									</label>
									<input onChange={formik.handleChange} value={formik.values.money_value} name="money_value" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Monetary value(in INR)" />
									{formik.errors.money_value && formik.touched.money_value ? (
										<div className="text-red-700">{formik.errors.money_value}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										In kind value
									</label>
									<input onChange={formik.handleChange} value={formik.values.in_kind_value} name="in_kind_value" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="In Kind value(in equivalent INR)" />
									{formik.errors.in_kind_value && formik.touched.in_kind_value ? (
										<div className="text-red-700">{formik.errors.in_kind_value}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Photos/Video Link
									</label>
									<input onChange={formik.handleChange} value={formik.values.media} name="media" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="url" placeholder="Photos/Videos Link" />
									{formik.errors.media && formik.touched.media ? (
										<div className="text-red-700">{formik.errors.media}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Attendance Sheet Link (optional)
									</label>
									<input onChange={formik.handleChange} value={formik.values.attendance} name="attendance" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="url" placeholder="Attendance Sheet Link" />
									{formik.errors.attendance && formik.touched.attendance ? (
										<div className="text-red-700">{formik.errors.attendance}</div>
									) : null}
								</div>
								<div class="inline-block relative w-full">
									<button className="bg-theme-blue text-theme-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
								</div>
							</form>
						</div>

						<br />
						<br />

					</Grid>
				</Grid>
			</Container>
		</div>
	</>
	);
}

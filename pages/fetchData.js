import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { DynamoDB, config } from "aws-sdk";
import { useState } from 'react';

export default function Home() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	config.update({
		region: "ap-south-1",
		endpoint: 'https://dynamodb.ap-south-1.amazonaws.com',
		// accessKeyId default can be used while using the downloadable version of DynamoDB. 
		// For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
		accessKeyId: "AKIAVJYVTJED7B6KF463",
		// secretAccessKey default can be used while using the downloadable version of DynamoDB. 
		// For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
		secretAccessKey: "72dBkUlYVC5DlLoMNO7DUNGwFizwHaF9yvjWPj0c"
	})
	var docClient = new DynamoDB.DocumentClient();

	var table = "members";

	var year = 2015;
	var title = "The Big New Movie";

	var params = {
		TableName: "members"
	};
		
	const onSubmit = event => {
		event.preventDefault();
		console.log("Scanning Movies table.");
		debugger;
		docClient.scan(params, function (err, data) {
			if (!err) {
				console.log(data);
			} else {
				console.log(err);
			}
		});
	}
		
	return (
		<div>
			<form onSubmit={onSubmit}>
		
				<button type='submit'>Signup</button>
			</form>
		</div>
	);
};

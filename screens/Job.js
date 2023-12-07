import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { AppContext } from '../App';

const Job = ({ route }) => {
	const { isRecruiter } = useContext(AppContext);
	const { jobDetails } = route.params;
	console.log(jobDetails);

	return (
		<ScrollView style={styles.container}>
			<Card style={styles.card}>
				<Card.Title
					title={jobDetails.role}
					subtitle={jobDetails.company}
				/>
				<Card.Content>
					<Text>Experience Required: {jobDetails.experience}</Text>
					<Text>Description: {jobDetails.description}</Text>
					<Text>Skills Required: {jobDetails.skills.join(', ')}</Text>
				</Card.Content>
			</Card>

			{isRecruiter && (
				<View>
					<Text style={styles.applicantsHeading}>Applicants</Text>
					{/* Render applicant cards here */}
					{jobDetails.applicants.map((applicant, index) => (
						<ApplicantCard key={index} applicant={applicant} />
					))}
				</View>
			)}
		</ScrollView>
	);
};

const ApplicantCard = ({ applicant }) => {
	const handleScheduleCall = () => {
		// Add logic to schedule a call
		console.log(`Schedule call for ${applicant.name}`);
	};

	return (
		<Card style={styles.card}>
			<Card.Title
				title={applicant.name}
				subtitle={`Experience: ${applicant.experience}`}
			/>
			<Card.Content>
				<Text>Skills: {applicant.skills.join(', ')}</Text>
				<Button
					onPress={handleScheduleCall}
					mode='contained'
					style={styles.scheduleButton}>
					Schedule Call
				</Button>
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	card: {
		color: 'white',
		marginBottom: 16,
	},
	applicantsHeading: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 16,
		marginBottom: 8,
	},
	scheduleButton: {
		marginTop: 8,
	},
});

export default Job;

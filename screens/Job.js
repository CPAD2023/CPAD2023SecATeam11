import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { AppContext } from '../App';

const screenWidth = Dimensions.get('window').width;
const Job = ({ route }) => {
	const { isRecruiter } = useContext(AppContext);
	const { jobDetails } = route.params;
	const [applicants, setApplicants] = useState([]);

	useEffect(() => {
		console.log(jobDetails);
		if (isRecruiter) {
			jobDetails.appliedBy.map((userId) => {
				fetch(`http://localhost:3000/employee/${userId}`)
					.then((response) => response.json())
					.then(({ employee }) => {
						console.log(employee);
						setApplicants((prevApplicants) => [
							...prevApplicants,
							employee,
						]);
					})
					.catch((error) =>
						console.error('Error fetching employee: ', error)
					);
			});
		}
		console.log(applicants);
	}, [isRecruiter, jobDetails]);

	return (
		<ScrollView style={styles.container}>
			<Card style={[styles.card, { width: screenWidth - 30 }]}>
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
					{applicants.length == 0 && 'No applications yet!'}
					{applicants.map((applicant, index) => (
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
		console.log(`Schedule call for ${applicant.fname}`);
	};

	return (
		<Card style={[styles.card, { width: screenWidth - 30 }]}>
			<Card.Title
				title={applicant.fname + ' ' + applicant.lname}
				subtitle={`Experience: ${applicant.experience}`}
			/>
			<Card.Content>
				<View style={styles.container}>
					Skills:{' '}
					{applicant.skills.map((skill, index) => (
						<Text
							style={[styles.pill, styles.pillText]}
							key={index}>
							{skill}
						</Text>
					))}
				</View>
				<Button
					onPress={handleScheduleCall}
					mode='contained'
					style={styles.scheduleButton}>
					Schedule Call
				</Button>
				<Button
					onPress={handleScheduleCall}
					mode='contained'
					style={styles.scheduleButton}>
					Download Resume
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
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 10,
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
	pill: {
		backgroundColor: '#3498db',
		borderRadius: 20,
		paddingHorizontal: 15,
		paddingVertical: 8,
		marginHorizontal: 5,
		marginVertical: 5,
	},
	pillText: {
		color: '#fff',
		fontSize: 16,
		padding: 4,
	},
});

export default Job;

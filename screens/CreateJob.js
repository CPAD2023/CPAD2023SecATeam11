import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { nonTechnicalSkills, technicalSkills } from '../resources/skills';
import ListComponent from '../components/ListComponent';
import experienceArray from '../resources/experience';
import { AppContext } from '../App';

const CreateJob = ({ navigation }) => {
	const { userId } = useContext(AppContext);
	const [role, setRole] = useState('');
	const [description, setDescription] = useState('');
	const [company, setCompany] = useState('');
	const [allSkills, setAllSkills] = useState(technicalSkills);
	const [mySkills, setMySkills] = useState([]);
	const [allExperience, setAllExperience] = useState(experienceArray);
	const [myExperience, setMyExperience] = useState([]);

	const handleCreateJob = async () => {
		try {
			const apiUrl = 'http://localhost:3000/publishJob';

			const formData = new URLSearchParams();
			formData.append('role', role);
			formData.append('description', description);
			formData.append('company', company);
			formData.append('skills', mySkills);
			formData.append(
				'experience',
				myExperience.length > 0 ? myExperience[0] : ''
			);
			formData.append('postedBy', userId);

			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: formData.toString(),
			});
			setRole('');
			setDescription('');
			setCompany('');
			setAllSkills(technicalSkills);
			setMySkills([]);
			setMyExperience([]);
			setAllExperience(experienceArray);
		} catch (error) {
			console.error('Error creating job:', error);
		}
	};

	return (
		<ScrollView>
			<ImageBackground blurRadius={1}
				source={require("../assets/create_job.jpg")}
				style={{ height: "100%", width: "100%", flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
				<View style={styles.container}>
					<View style={styles.fieldContainer}>
						<Text style={{ color: 'black', fontWeight: 700 }} variant='titleMedium'>Role</Text>
						<TextInput textColor="black" mode="outlined"
							// label={'Role:'}
							style={styles.input}
							value={role}
							onChangeText={setRole}
						/>
					</View>

					<View style={styles.fieldContainer}>
						<Text style={{ color: 'black', fontWeight: 700 }} variant='titleMedium'>Job Description</Text>
						<TextInput textColor="black" mode="outlined"
							// label={'Description:'}
							style={styles.input}
							value={description}
							onChangeText={setDescription}
						/>
					</View>

					<View style={styles.fieldContainer}>
						<Text style={{ color: 'black', fontWeight: 700 }} variant='titleMedium'>Company</Text>
						<TextInput textColor="black" mode="outlined"
							// label={'Company:'}
							style={styles.input}
							value={company}
							onChangeText={setCompany}
						/>
					</View>
					<View style={styles.fieldContainer}>
						<Text style={{ color: 'black', fontWeight: 700 }} variant='titleMedium'>Skills</Text>
						<ListComponent
							fullList={allSkills}
							setFullList={setAllSkills}
							chosenList={mySkills}
							setChosenList={setMySkills}
							max={7}
							showFull={true}
						/>
					</View>

					<Text style={{ color: 'black', fontWeight: 700 }} variant='titleMedium'>Experience</Text>
					<ListComponent
						fullList={allExperience}
						setFullList={setAllExperience}
						chosenList={myExperience}
						setChosenList={setMyExperience}
						max={1}
						showFull={true}
					/>

					<View style={styles.fieldContainer}>
						<Button mode='contained' onPress={handleCreateJob} style={styles.button}>
							<Text style={{ fontWeight: 600, color: "black" }}>Create Job</Text>
						</Button>
					</View>
				</View>
			</ImageBackground>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.2)",
		padding: 16
	},
	fieldContainer: {
		marginBottom: 16,
	},
	input: {
		marginTop: 8,
		color: "black",
		backgroundColor: "#fff"
	},
	pillButtonContainer: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-evenly',
		maxWidth: 'content',
	},
	button: {
		marginTop: 16
	}
});

export default CreateJob;

import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
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
		<View>
			<View style={styles.fieldContainer}>
				<TextInput
					label={'Role:'}
					style={styles.input}
					value={role}
					onChangeText={setRole}
				/>
			</View>

			<View style={styles.fieldContainer}>
				<TextInput
					label={'Description:'}
					style={styles.input}
					value={description}
					onChangeText={setDescription}
				/>
			</View>

			<View style={styles.fieldContainer}>
				<TextInput
					label={'Company:'}
					style={styles.input}
					value={company}
					onChangeText={setCompany}
				/>
			</View>

			<Text style={{ color: 'black' }}>Skills:</Text>
			<ListComponent
				fullList={allSkills}
				setFullList={setAllSkills}
				chosenList={mySkills}
				setChosenList={setMySkills}
				max={7}
				showFull={true}
			/>

			<Text style={{ color: 'black' }}>Experience:</Text>
			<ListComponent
				fullList={allExperience}
				setFullList={setAllExperience}
				chosenList={myExperience}
				setChosenList={setMyExperience}
				max={1}
				showFull={true}
			/>

			<View style={styles.fieldContainer}>
				<Button mode='contained' onPress={handleCreateJob}>
					Create Job
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	fieldContainer: {
		margin: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 8,
		marginTop: 8,
	},
	pillButtonContainer: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-evenly',
		maxWidth: 'content',
	},
});

export default CreateJob;

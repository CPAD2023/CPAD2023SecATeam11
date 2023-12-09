import React, { useContext } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../App';
import { Icon } from 'react-native-paper';
const LogoutButton = () => {
	const { setToken } = useContext(AppContext);
	const navigation = useNavigation();

	const handleLogout = async () => {
		setToken(null);
		navigation.navigate('Login');
	};

	return (
		<Pressable style={styles.logoutButton} onPress={handleLogout}>
			<Icon source="logout">Logout</Icon>

		</Pressable>
	);
};

const styles = StyleSheet.create({
	logoutButton: {
		margin: 10,
		padding: 4,
		backgroundColor: 'red',
		borderRadius: 5,
	},
	logoutText: {
		color: 'white',
		fontWeight: 'bold',
	},
});

export default LogoutButton;

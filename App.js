import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Jobs from './screens/Jobs';
import MyJobs from './screens/MyJobs';
import Profile from './screens/Profile';

export const AppContext = createContext();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
	const [userId, setUserId] = useState(null);
	const [userData, setUserData] = useState(null);
	const [isRecruiter, setIsRecruiter] = useState(false);
	const [token, setToken] = useState(null);

	const HomeTabs = () => {
		return (
			<Tab.Navigator>
				<Tab.Screen name='MyJobs' component={MyJobs} />
				{isRecruiter ? (
					<Tab.Screen name='CreateJob' component={Dashboard} />
				) : (
					<Tab.Screen name='Jobs' component={Jobs} />
				)}
				<Tab.Screen name='Profile' component={Profile} />
			</Tab.Navigator>
		);
	};

	return (
		<AppContext.Provider
			value={{
				userId,
				setUserId,
				userData,
				setUserData,
				isRecruiter,
				setIsRecruiter,
				token,
				setToken,
			}}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName='SignUp'>
					<Stack.Screen name='SignUp' component={SignUp} />
					<Stack.Screen name='Login' component={Login} />
					<Stack.Screen name='Dashboard' component={HomeTabs} />
				</Stack.Navigator>
			</NavigationContainer>
		</AppContext.Provider>
	);
};

Login.navigationOptions = {
	headerLeft: null,
};

export default App;

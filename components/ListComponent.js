import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import React, { useState } from 'react';

export default function ListComponent({
	fullList,
	setFullList,
	chosenList,
	setChosenList,
	max,
	showFull,
}) {
	const handlePress = ({ value }) => {
		if (showFull) {
			if (chosenList.includes(value)) {
				setChosenList((chosenList) => {
					return chosenList.filter((item) => item != value);
				});
				setFullList((fullList) => [...fullList, value]);
			} else {
				if (chosenList.length < max) {
					setChosenList((chosenList) => [...chosenList, value]);
					setFullList((fullList) => {
						return fullList.filter((item) => item != value);
					});
				} else {
					return;
				}
			}
		}
	};

	return (
		<View>
			<Text style={{ color: 'black', fontSize: 12 }}>{`Select any ${max}`}</Text>
			<View style={styles.container}>
				{chosenList?.map((value, index) => {
					return (
						<View style={{ padding: 4, }}>
							<Button
								key={index}
								style={[styles.pillSelected, styles.pillText]}
								onPress={() => handlePress({ value })}>
								<Text style={{ fontWeight: 600, color: "white" }}>{value}</Text>
							</Button>
						</View>
					);
				})}
			</View>
			{showFull && (
				<View style={styles.container}>
					{fullList?.map((value, index) => {
						return (
							<View style={{ padding: 4, }}>
								<Button
									key={index}
									style={[styles.pill, styles.pillText]}
									onPress={() => handlePress({ value })}>
									<Text style={{ fontWeight: 600, color: "white" }}>{value}</Text>
								</Button>
							</View>
						);
					})}
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 5,
	},
	pill: {
		backgroundColor: '#3498db',
		borderRadius: 5,
	},
	pillSelected: { backgroundColor: "red", borderRadius: 5 },
	pillText: {
		color: '#fff',
		fontSize: 16,
		padding: 4,
	},
});

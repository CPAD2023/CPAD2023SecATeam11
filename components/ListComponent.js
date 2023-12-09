import { View, Text, StyleSheet, Button } from 'react-native';
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
			<Text style={{ color: 'black' }}>{`Max- ${max}`}</Text>
			<View style={styles.container}>
				{chosenList?.map((value, index) => {
					return (
						<Button
							key={index}
							title={value}
							style={[styles.pill, styles.pillText]}
							onPress={() => handlePress({ value })}>
							{value}
						</Button>
					);
				})}
			</View>
			{showFull && (
				<View style={styles.container}>
					{fullList?.map((value, index) => {
						return (
							<Button
								key={index}
								title={value}
								style={[styles.pill, styles.pillText]}
								onPress={() => handlePress({ value })}>
								{value}
							</Button>
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
		padding: 10,
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

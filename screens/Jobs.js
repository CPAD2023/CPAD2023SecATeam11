import React, { useState, useCallback, useContext } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { AppContext } from "../App";

const JobsScreen = ({ navigation }) => {
  const { userId } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);

	useFocusEffect(
		useCallback(() => {
			fetch('http://localhost:3000/getJobs')
				.then((response) => response.json())
				.then((data) => {
					// const jobsArray = [];
					// console.log(data);
					// if (data != null) {
					// 	Object.entries(data).forEach(([key, value]) => {
					// 		jobsArray.push(value);
					// 	});
					// }
					const jobsArray = data.jobs.filter(
						(job) =>
							!job.appliedBy.includes(userId) &&
							!job.inactiveFor.includes(userId)
					);
					setJobs(jobsArray);
				})
				.catch((error) => console.error('Error fetching jobs:', error));
		}, [])
	);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate("IndividualJob", { jobId: item._id })}
    >
      <View style={styles.jobCard}>
        <Text style={styles.jobTitle}>{item.role}</Text>
        <Text style={styles.company}>{item.company}</Text>
        <Text style={styles.experience}>Experience: {item.experience}</Text>
        <Text style={styles.skills}>Skills: {item.skills.join(", ")}</Text>
        <Pressable
          style={styles.applyButton}
          onPress={() => handleApply(item._id)}
        >
          <Text>Apply</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  const handleApply = (jobId) => {
    const formData = new URLSearchParams();
    formData.append("jobId", jobId);
    formData.append("employeeId", userId);
    console.log(`Applying for job ${jobId}`);
    fetch("http://localhost:3001/applyJob", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })
      .then((res) => setJobs((jobs) => jobs.filter((job) => job._id != jobId)))
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  jobCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    marginVertical: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  company: {
    fontSize: 16,
    marginBottom: 8,
  },
  experience: {
    fontSize: 14,
    marginBottom: 8,
  },
  skills: {
    fontSize: 14,
    marginBottom: 8,
  },
  applyButton: {
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
});

export default JobsScreen;

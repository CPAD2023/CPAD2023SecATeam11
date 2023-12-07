import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { nonTechnicalSkills, technicalSkills } from "../resources/skills";

const CreateJob = ({ navigation }) => {
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [allSkills, setAllSkills] = useState(technicalSkills);
  const [mySkills, setMySkills] = useState("");
  const [experience, setExperience] = useState("0 - 2 years");

  const handleCreateJob = async () => {
    try {
      const apiUrl = "http://10.0.2.2:3000/publishJob";

      const formData = new URLSearchParams();
      formData.append("role", role);
      formData.append("description", description);
      formData.append("company", company);
      formData.append("skills", skills);
      formData.append("experience", experience);
      formData.append("postedBy", userId);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <View>
      <View style={styles.fieldContainer}>
        <TextInput
          label={"Role:"}
          style={styles.input}
          value={role}
          onChangeText={setRole}
        />
      </View>

      <View style={styles.fieldContainer}>
        <TextInput
          label={"Description:"}
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View style={styles.fieldContainer}>
        <TextInput
          label={"Company:"}
          style={styles.input}
          value={company}
          onChangeText={setCompany}
        />
      </View>

      <View style={styles.pillButtonContainer}>
        <Text>Skills:</Text>
        {mySkills &&
          mySkills.map((skill) => (
            <Button key={skill} mode="contained">
              {skill}
            </Button>
          ))}
        {allSkills &&
          allSkills.map((skill) => (
            <Button key={skill} mode="contained">
              {skill}
            </Button>
          ))}
      </View>

      <View style={styles.fieldContainer}>
        <TextInput
          label={"Experience:"}
          style={styles.input}
          value={experience}
          onChangeText={setExperience}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Button mode="contained" onPress={handleCreateJob}>
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
    borderColor: "#ccc",
    padding: 8,
    marginTop: 8,
  },
  pillButtonContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    maxWidth: "content",
  },
});

export default CreateJob;

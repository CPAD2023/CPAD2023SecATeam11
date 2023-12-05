const technicalSkills = [
	// Technical Skills
	'JavaScript',
	'React',
	'Node.js',
	'Python',
	'Java',
	'C++',
	'HTML',
	'CSS',
	'SQL',
	'MongoDB',
	'Git',
	'AWS',
	'Docker',
	'RESTful API',
	'Go',
	'Rust',
	'React',
	'Angular',
	'Jenkins',
];

const nonTechnicalSkills = [
	'Communication',
	'Teamwork',
	'Problem Solving',
	'Adaptability',
	'Time Management',
	'Leadership',
	'Critical Thinking',
	'Attention to Detail',
	'Creativity',
	'Emotional Intelligence',
];

const techSkillOptions = technicalSkills.map((skill) => ({
	label: skill,
	value: skill,
}));

const nonTechSkillOptions = nonTechnicalSkills.map((skill) => ({
	label: skill,
	value: skill,
}));

export {
	technicalSkills,
	nonTechnicalSkills,
	techSkillOptions,
	nonTechSkillOptions,
};

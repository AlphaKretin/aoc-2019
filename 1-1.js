const fs = require("fs").promises;
fs.readFile("inputs/1.txt", "utf-8").then(input => {
	const nums = input.split("\n").map(n => parseInt(n, 10));
	let sum = 0;
	for (const num of nums) {
		const div = num/3;
		console.log(div);
		const round = Math.floor(div);
		const final = round - 2;
		sum += final;
	}
	console.log(sum);
});
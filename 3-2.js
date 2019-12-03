const fs = require("fs").promises;

function distSplit(val) {
	const letter = val[0];
	const number = parseInt(val.slice(1), 10);
	return [letter, number];
}

fs.readFile("inputs/3.txt", "utf-8").then(input => {
	const values = input.split("\n");
	const first = values[0].split(",").map(distSplit);
	const second = values[1].split(",").map(distSplit);
	const coords = [];
	let x = 0;
	let y = 0;
	let steps = 0;
	for (const val of first) {
		let old;
		let nu;
		let ax;
		switch(val[0]) {
		case "U": old = y; y += val[1]; nu = y; ax = 0; break;
		case "D": nu = y; y -= val[1]; old = y; ax = 0; break;
		case "L": nu = x; x -= val[1]; old = x; ax = 1; break;
		case "R": old = x; x += val[1]; nu = x; ax = 1; break;
		}
		for (let i = old; i <= nu; i++) {
			if (ax === 0) {
				coords.push([x, i, steps]);
			} else {
				coords.push([i, y, steps]);
			}
			steps++;
		}
	}
	x = 0;
	y = 0;
	steps = 0;
	const overlaps = [];
	for (const val of second) {
		let old;
		let nu;
		let ax;
		switch(val[0]) {
		case "U": old = y; y += val[1]; nu = y; ax = 0; break;
		case "D": nu = y; y -= val[1]; old = y; ax = 0; break;
		case "L": nu = x; x -= val[1]; old = x; ax = 1; break;
		case "R": old = x; x += val[1]; nu = x; ax = 1; break;
		}
		for (let i = old; i <= nu; i++) {
			if (ax === 0) {
				const coord = coords.find(c => c[0] === x && c[1] === i);
				if (coord !== undefined) {
					overlaps.push(coord[2] + steps);
				}
			} else {
				const coord = coords.find(c => c[0] === i && c[1] === y);
				if (coord !== undefined) {
					overlaps.push(coord[2] + steps);
				}
			}
			steps++;
		}
		
	}
	console.log(overlaps);
	const ind = overlaps.indexOf(0);
	if (ind > -1) {
		overlaps.splice(ind, 1);
	}
	const min = Math.min(...overlaps);
	console.log(min);
});
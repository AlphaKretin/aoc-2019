const fs = require("fs").promises;

function distSplit(val) {
	const letter = val[0];
	const number = parseInt(val.slice(1), 10);
	return [letter, number];
}

function manDist(val) {
	return Math.abs(val[0]) + Math.abs(val[1]);
}

fs.readFile("inputs/3.txt", "utf-8").then(input => {
	const values = input.split("\n");
	const first = values[0].split(",").map(distSplit);
	const second = values[1].split(",").map(distSplit);
	const coords = [];
	let x = 0;
	let y = 0;
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
				coords.push([x, i]);
			} else {
				coords.push([i, y]);
			}
		}
	}
	x = 0;
	y = 0;
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
				if (coords.find(c => c[0] === x && c[1] === i) !== undefined) {
					overlaps.push([x, i]);
				}
			} else {
				if (coords.find(c => c[0] === i && c[1] === y) !== undefined) {
					overlaps.push([i, y]);
				}
			}
		}
		
	}
	const dists = overlaps.map(manDist);
	const ind = dists.indexOf(0);
	if (ind > -1) {
		dists.splice(ind, 1);
	}
	const min = Math.min(...dists);
	console.log(min);
});
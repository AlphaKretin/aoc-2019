const fs = require("fs");

const input = fs.readFileSync("inputs/2.txt", "utf-8");
const st = input.split(",").map(i => parseInt(i,10));

async function compute(one, two) {
	let index = 0;
	const stack = st.slice(0);
	stack[1] = one;
	stack[2] = two;
	while (stack[index] !== 99) {
		switch(stack[index]) {
		case 1: stack[stack[index+3]] = stack[stack[index+1]]+stack[stack[index+2]]; break;
		case 2: stack[stack[index+3]] = stack[stack[index+1]]*stack[stack[index+2]]; break;
		}
		index += 4;
	}
	return stack[0];
}

for (let one = 0; one < 100; one++) {
	for (let two=0; two < 100; two++) {
		compute(one,two).then(result => {
			if (result === 19690720) {
				console.log(one);
				console.log(two);
				console.log(100*one + two);
			}
		});
	}
}
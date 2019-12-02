const fs = require("fs").promises;
fs.readFile("inputs/2.txt", "utf-8").then(input => {
    const stack = input.split(",").map(i => parseInt(i,10));
    let index = 0;
    stack[1] = 12;
    stack[2] = 2;
    while (stack[index] !== 99) {
        switch(stack[index]) {
            case 1: stack[stack[index+3]] = stack[stack[index+1]]+stack[stack[index+2]]; break;
            case 2: stack[stack[index+3]] = stack[stack[index+1]]*stack[stack[index+2]]; break;
        }
        index += 4;
    }
    console.log(stack[0]);
});
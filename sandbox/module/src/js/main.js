function myModule() {
    this.hello = function() {
        console.log("hello");
    };

    this.goodbye = function() {
        console.log("bye!");
    };
}

module.exports = myModule; //for export

// ES6
/*
export let one = 1;

let two = 2;

export {two} //named syntax

export function sayHi() {
    console.log('Hello');
}

//default export* can be one
export default function sayHi() {
    console.log('Hello');
}

*/
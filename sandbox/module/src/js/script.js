import $ from 'jquery';
const myModule = require('./main'); //for import

//es6 
/*
    import {one as first, two} from './main';
    one as first //rename one as first
    -or-

    import * as data from './main'; //impord obj that name data
    data.sayHi(); //Hello

    -or- (for default export)
    import sayHi from './main';
    sayHi(); //Hello
*/

const myModuleInstance = new myModule();


myModuleInstance.hello();
myModuleInstance.goodbye();

//jquery
$(document).ready(function() {
    $(".button:first").hover(function(){
        $(this).toggleClass('active');
    });
    $(".button:eq(1)").on("click", function(){
        $('.paragraph:even').fadeToggle(200);
    });
    $(".button:eq(2)").on("click", function(){
        $('.paragraph:odd').animate({
            opacity: 'toggle',
            height: "toggle"
        }, 1000);
    });
});
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
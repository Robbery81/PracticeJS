const employers = ['Alex', '', 'ludmila', 'Viktor', '', 'oleg', 'iNna', 'Ivan', 'Alex', 'Olga', ' Ann'];

let employersNames = employers
.filter(item => item.length != '')
.map(item => item.toLowerCase().trim());

const sponsors = {
    cash: [40000, 5000, 30400, 12000],
    eu: ['SRL', 'PLO', 'J&K'],
    rus: ['RusAuto', 'SBO']
};

const reducer = (acum, current) => acum + current;
const money = sponsors.cash.reduce(reducer, 0);

function makeBusiness([owner, cash, emp, director = 'Victor']) {
    const sumSponsors = [...sponsors.eu, ...sponsors.rus, 'unexpected sponsor'];
    console.log(`We have a business. Owner: ${owner}, director: ${director}. Our budget:${cash}. And our employers: ${emp}`);
    console.log('And we have a sponsors: ');
    console.log(...sumSponsors);
    console.log(`Note. Be careful with ${sponsors.eu[0]}. It's a huge risk.`);
}
makeBusiness(['Sam', money, employersNames]);
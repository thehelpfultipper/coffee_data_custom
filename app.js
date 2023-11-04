import { getCoffeeData } from "./coffeeData";

const apiUrls = [
    'https://api.sampleapis.com/coffee/hot',
    'https://api.sampleapis.com/coffee/iced'
];

const path = 'coffee.json';

getCoffeeData(apiUrls, path)
    .then( result => console.log(result))
    .catch( err => console.log(err));
import axios, { all } from "axios";
import { writeFileSync } from "fs/promises";

function generateRandomPrice() {
    let num = Math.floor(Math.random() * 890 + 100) // number between 100 - 890
    let price = (num / 100).toFixed(2);

    return price;
}

// @urls is array of URLs to fetch data 
export async function getCoffeeData(urls, filePath) {
    try {
        // Fetch coffee data
        let allData = [];

        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const data = await Promise.all(responses.map(resp => resp.data));

        data.forEach(type => allData.push(...type));

        // Do something with data ~ add price & quantity
        let customData = allData.map( item => ({...item, price: generateRandomPrice(), count: 1}));

        // Write data to JSON file
        await writeFileSync(filePath, JSON.stringify(customData, null, 2));
        console.log('Data written to ', filePath);
        return 'Data written successfully';
    } catch (err) {
        console.log('Error fetching data or writing to file: ', err);
        throw 'Error fetching data or writing to file.';
    }

}
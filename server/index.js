const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const iconv = require('iconv-lite');
const { parseString: parseXMLString } = require('xml2js');

const app = express();
const PORT = 3000;
app.use(cors());

app.get('/getCurrencyRates', async (req, res) => {
	const { date } = req.query;
	const json = await fetch(`http://www.cbr.ru/scripts/XML_daily.asp?date_req=${date}`)
		.then((response) => response.arrayBuffer())
		.then((arrayBuffer) => iconv.decode(Buffer.from(arrayBuffer), 'win1251').toString())
		.then((xmlString) => {
			let jsonString;

			parseXMLString(xmlString, (err, result) => {
				if (err) {
					throw err;
				}
				jsonString = JSON.stringify(result);
			});

			return jsonString;
		});

	res.send(json);
});

app.listen(PORT, (error) => (error ? console.log(error) : console.log(`Listening on port ${PORT}`)));

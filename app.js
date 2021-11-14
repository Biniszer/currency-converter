//http://api.nbp.pl/api/exchangerates/rates/a/${code}/
//zaimportowane moduły
import fetch from 'node-fetch';
import request from 'request';
import * as fs from 'fs';

//dodane waluty
const validCodes = ['usd', 'chf', 'pln', 'eur', 'gbp'];

const code = process.argv[2];

const isValid = validCodes.find(currency =>currency === code) ? true : false;

//link do tabeli API z kursami
const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`

request(url, {json:true}, (err, res, body) => {
    if (!isValid) {
        return console.log('Błąd: ', err);
        
    }
    if(res.statusCode !== 200) {
        console.log("problem z linkiem");
    }
    
    //wypisanie wiadomości z Api o wartości waluty
    const message = `Cena ${body.currency} w dniu ${body.rates[0].effectiveDate} wynosi ${body.rates[0].mid}zł`
    

    //dodanie wyniku do pliku, dodaje linijke po linijce
    fs.appendFile('historia.txt', message + '\n', ()=>{
        console.log("Dane dodane do pliku");
        
    })
    
    console.log(message);
    
})
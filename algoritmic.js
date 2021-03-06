'use strict';

const cities =
    `15,20,Кропивницкий,200000
10,25,Киев,200000000
10,20,Харьков,90000000

#ababalamaga
30,29,Днепр,60000000
19,34,Мариуполь,5000000
37,89,Львов,4000000
12,98,Полтава,47000000

23,13,Запорожье,5700000
78,34,Одесса,67000000
07,45,Ужгород,37000000
09,12,Луцк,9900000
99,11,Тернополь,1500000
`
const someText = `Киев был основан в 905 году гетьманом Святославом Мудрым. 
Многие выдающиеся личности говорили про Киев как про родину хлебопекарства в Украине.`;


console.log(parseCSV(cities)(someText));

function parseCSV(cities) {
    const citiesInformation = cities.split('\n')
        .filter((cityData) => {
            if (cityData[0] !== '#' && cityData.length !== 0) {
                return cityData;
            }
        })
        .map((cityData) => {
            const city = {};
            cityData.split(',')
                .forEach((item, index) => {
                    switch (index) {
                        case 0: city.x = item; break;
                        case 1: city.y = item; break;
                        case 2: city.name = item; break;
                        case 3: city.population = item; break;
                    }
                })
            return city;
        })
        .sort((a, b) => (b.population - a.population))
        .slice(0, 10)
        .reduce((cities, currentCity, index) => {
            const cityName = currentCity.name;
            cities[cityName] = {
                population: currentCity.population,
                rating: index + 1
            };
            return cities;
        }, {})


    return (someText) => {

        Object.keys(citiesInformation)
            .forEach(city => {
                if (someText.search(city) >= 0) {
                    someText = someText.replace(city, `${city} (${citiesInformation[city].rating} место в ТОП-10 самых крупных городов Украины, население ${citiesInformation[city].population} человек)`);
                }
            })
        return someText;
    }
}


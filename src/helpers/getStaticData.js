import countries from '../config/countriesData.json';

// const countryData = (id) => {
//   for (let country of countries) {
//     if (country.cca2 === id) return country;
//   }
// };

export default (id) => {
  for (let country of countries) {
    if (country.cca2 === id) return country.geojson;
  }
};

// export default {
//   countryData,
//   geojson,
// };

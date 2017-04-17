import defaultData from '../defaultDatabase.json';

export const defaultDb = (() => {
  let result = {};
  Object.keys(defaultData).forEach( (id) => {
    let country = {
      id,
      commonName: defaultData[id].commonName,
      fillColor: defaultData[id].fillColor,
      status: defaultData[id].status,
    }
    result[id] = country;
  });
  return result;
})();
/*eslint-disable*/
export default (fillColor) => { 
  return {
    style: {
      fillColor,
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7,
    },
    hoverfillColor: 'teal',
    visitedfillColor: 'orangered',
  };
};
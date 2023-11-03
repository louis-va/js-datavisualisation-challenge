function getData() {
  fetch('https://canvasjs.com/services/data/datapoints.php', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
      setTimeout(() => getData(), 1000);
    })
}
getData()
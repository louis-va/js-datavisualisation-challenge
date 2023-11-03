import * as Plot from "@observablehq/plot";

const container = document.getElementById('mw-content-text')
const table = document.getElementById('table1')

let data = []
let years = []

document.querySelectorAll('#table1 tbody tr').forEach((col, i) => {
  // Get year values
  if (i==0) {
    col.querySelectorAll('th').forEach((row, j) => {
      if (j >= 2) {
        years.push(row.textContent)
      }
    })
  }

  // Get countries data
  else {
    let country
    col.querySelectorAll('td').forEach((row, j) => {
      if (j==0) {
        country = row.textContent
        if(country.indexOf("(") > 0)
          country = country.slice(0, country.indexOf("("))
      } else {
        let dataPoint = {}
        dataPoint.Country = country
        dataPoint.Year = years[j-1]
        dataPoint.Crimes = parseInt(row.textContent)
        data.push(dataPoint)
      }
    })
  }
})

const graph = Plot.plot({
  width: 800,
  x: {type: "point"},
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(data, {x: "Year", y: "Crimes", stroke: "Country", marker: true, tip: "x"})
  ]
})

container.insertBefore(graph, table);
import * as Plot from "@observablehq/plot";

const container = document.getElementById('mw-content-text')
const table = document.getElementById('table2')

let data = []

document.querySelectorAll('#table2 tbody tr').forEach((col) => {
  // Get countries data
  let country
  col.querySelectorAll('td').forEach((row, i) => {
    if (i==0) {
      country = row.textContent
      if(country.indexOf("(") > 0)
        country = country.slice(0, country.indexOf("("))
    } else {
      let dataPoint = {}
      dataPoint.Country = country
      dataPoint.Year = (i==1) ? 'Sept. 2007' : 'Dec. 2010'
      dataPoint['Prison population'] = parseInt(row.textContent)
      data.push(dataPoint)
    }
  })
})

const graph = Plot.plot({
  marginBottom: 100,
  width: 800,
  fx: {padding: 0, tickRotate: 90, tickSize: 6},
  x: {axis: null, paddingOuter: 0.2},
  y: {grid: true},
  color: {legend: true},
  marks: [
    Plot.barY(data, {
      x: "Year",
      y: "Prison population",
      fill: "Year",
      fx: "Country",
      sort: {x: null, color: null, fx: {value: "-y", reduce: "sum"}},
      tip: "x"
    }),
    Plot.ruleY([0])
  ]
})

container.insertBefore(graph, table);
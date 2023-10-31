import * as Plot from "@observablehq/plot";

const container = document.getElementById('graph-table1')

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
        dataPoint.country = country
        dataPoint.years = years[j-1]
        dataPoint.crimes = parseInt(row.textContent)
        data.push(dataPoint)
      }
    })
  }
})

const graph = Plot.plot({
  color: {legend: true},
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(data, {x: "years", y: "crimes", stroke: "country", marker: true, tip: "x"})
  ]
})

container.append(graph)
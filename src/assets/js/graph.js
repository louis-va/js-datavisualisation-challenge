import * as Plot from "@observablehq/plot";

// TABLE 1
let data_table1 = []
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
    let country = {}
    col.querySelectorAll('td').forEach((row, j) => {
      if (j==0) {
        country.country = row.textContent
      } else {
        country[years[j-1]] = row.textContent
      }
    })
    data_table1.push(country)
  }
})

console.log(data_table1)
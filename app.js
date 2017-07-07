const express = require('express')
const app = express()
const { filter, propEq, pathOr, toLower } = require('ramda')
const medications = [
  { id: 1, name: 'Tylenol', form: 'tablet', amt: '100 mg' },
  { id: 1, name: 'Advil', form: 'tablet', amt: '100 mg' },
  { id: 2, name: 'Zyrtec', form: 'patch', amt: '100 mg' },
  { id: 3, name: 'Oxycontin', form: 'syrup', amt: '200 mg' }
]

app.get('/medications', function(req, res) {
  // req.query.name
  const filterCriteria = pathOr('N/A', ['query', 'form'], req)
  console.log('filter:', filterCriteria)
  if (filterCriteria != 'N/A') {
    // do some filtering with filter
    // Ex: GET http://localhost:4000/medications?name=Tylenol
    const isForm = med => med.form === toLower(filterCriteria)
    res.send(filter(isForm, medications))
  } else {
    // no filtering needed, send all meds back.
    // Ex: GET http://localhost:4000/medications
    res.send(medications)
  }
})
// send a single med back
// Ex: GET http://localhost:4000/medications/3
app.get('/medications/:medId', function(req, res) {
  res.send(find(propEq('id', Number(req.params.medId)), medications))
})

app.listen(4000, () => console.log('Listening on 4000!'))

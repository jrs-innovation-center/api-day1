const express = require('express')
const app = express()
const { filter, propEq, pathOr, toLower, compose, take } = require('ramda')
const medications = [
  { id: 1, name: 'Tylenol', form: 'tablet', amt: '100 mg' },
  { id: 1, name: 'Advil', form: 'tablet', amt: '100 mg' },
  { id: 1, name: 'Pepto', form: 'tablet', amt: '100 mg' },
  { id: 1, name: 'Aspirin', form: 'tablet', amt: '100 mg' },
  { id: 1, name: 'Flonase', form: 'tablet', amt: '100 mg' },
  { id: 1, name: 'Nyquil', form: 'tablet', amt: '100 mg' },
  { id: 1, name: 'Melatonin', form: 'tablet', amt: '100 mg' },
  { id: 1, name: 'Advil', form: 'tablet', amt: '100 mg' },
  { id: 2, name: 'Zyrtec', form: 'patch', amt: '100 mg' },
  { id: 3, name: 'Oxycontin', form: 'syrup', amt: '200 mg' }
]

app.get('/medications', function(req, res) {
  const filterCriteria = pathOr('N/A', ['query', 'form'], req)
  const limit = pathOr(10, ['query', 'limit'], req)

  if (filterCriteria != 'N/A') {
    // Ex: GET http://localhost:4000/medications?name=Tylenol
    // ex: GET http://localhost:4000/medications?form=tablet&limit=4
    const isForm = med => med.form === toLower(filterCriteria)
    const composeResult = compose(take(limit), filter(isForm))(medications)

    res.send(composeResult)
  } else {
    // no filtering needed, send all meds back.
    // Ex: GET http://localhost:4000/medications
    const results = compose(take(limit))(medications)
    res.send(results)
  }
})
// send a single med back
// Ex: GET http://localhost:4000/medications/3
app.get('/medications/:medId', function(req, res) {
  res.send(find(propEq('id', Number(req.params.medId)), medications))
})

app.listen(4000, () => console.log('Listening on 4000!'))

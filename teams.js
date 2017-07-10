const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const teams = [
  {
    id: 1,
    university: 'South Carolina',
    teamNickName: 'Gamecocks',
    conference: 'SEC',
    division: 'East'
  },
  {
    id: 2,
    university: 'Georgia',
    teamNickName: 'Bulldogs',
    conference: 'SEC',
    division: 'West'
  },
  {
    id: 3,
    university: 'Alabama',
    teamNickName: 'Crimson Tide',
    conference: 'SEC',
    division: 'East'
  },
  {
    id: 4,
    university: 'Clemson',
    teamNickName: 'Tigers',
    conference: 'ACC',
    division: 'East'
  },
  {
    id: 5,
    university: 'North Carolina',
    teamNickName: 'Tar Heels',
    conference: 'ACC',
    division: 'West'
  },
  {
    id: 6,
    university: 'Virginia Tech',
    teamNickName: 'Hokies',
    conference: 'ACC',
    division: 'East'
  },
  {
    id: 7,
    university: 'Arkansas',
    teamNickName: 'Razorbacks',
    conference: 'SEC',
    division: 'East'
  },
  {
    id: 8,
    university: 'Tennessee',
    teamNickName: 'Vols',
    conference: 'SEC',
    division: 'west'
  },
  {
    id: 9,
    university: 'Oregon State',
    teamNickName: 'Beavers',
    conference: 'PAC 12',
    division: 'N/A'
  },
  {
    id: 10,
    university: 'Louiville',
    teamNickName: 'Cardnals',
    conference: 'BIG 10',
    division: 'N/A'
  }
]
const { find, pathOr, filter, split, head, last } = require('ramda')

app.get('/teams/:id', function(req, res) {
  //req.params.id
  const teamId = pathOr('No Value', ['params', 'id'], req)

  if (teamId != 'No Value') {
    const team = find(team => team.id === Number(teamId), teams)
    res.status(200).send(team)
  } else {
    res.status(404)
    res.end()
    return
  }
})

app.get('/teams', function(req, res) {
  //?filter=conference:SEC
  //?filter=division:north

  const myFilter = pathOr('No filter', ['query', 'filter'], req)
  console.log('myFilter: ', myFilter)

  const splitFilter = split(':', myFilter)
  console.log('splitFilter: ', splitFilter)

  const filterName = head(splitFilter)
  console.log('filterName:', filterName)

  const filterValue = last(splitFilter)
  console.log('filterValue: ', filterValue)

  if (myFilter != 'No filter') {
    res
      .status(200)
      .send(filter(team => team[filterName] === filterValue, teams))
  } else {
    res.status(200).send(teams)
  }
})

app.listen(port, () => console.log('API is running, PORT: ', port))

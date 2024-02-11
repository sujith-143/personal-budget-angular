const { log } = require('console');
const express = require('express');
const cors = require('cors');
const app=express()
const port=3000;
const fileSystem = require('fs');
const importJSON = fileSystem.readFileSync('data.json','utf8');
const dataSource = JSON.parse(importJSON);

app.use(cors());

app.use('/', express.static('public'));

const budget = []

// app.get('/hello', (req, res) => {
//   res.send('Hello World!');
// });

app.get('/budget', (req,res)=>{
  
  res.json(dataSource);
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
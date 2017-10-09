import Express from 'express';

const apiRoutes = Express.Router();


apiRoutes.get('/', (req, res) => {
  const obj = {
    name: req.query.name,
    job: req.query.job,
    Skills: [
      'Fire Arrow', 'Ice Arrow', 'Thunder', 'Storm', 'Fire Wall'
    ],
    items: [
      { name: 'white potion', count: 100 },
      { name: 'fly', count: 120 },
      { name: 'butterfly', count: 6 },
      { name: 'blue gemstone', count: 50 }
    ]
  }
  res.header('Access-Control-Allow-Origin', '*')
  res.send(obj);
})

export default apiRoutes;
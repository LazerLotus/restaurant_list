//require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

//require restautant list here
const restaurantList = require('./restaurant.json')

//setting static files
app.use(express.static('public'))

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//render index page
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
//render detail page of restaurant
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

//render result of search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  console.log(restaurants.length)
  console.log(!keyword.trim().length)

  if (!keyword.trim().length) {
    let alert = '<script>alert("請輸入有效字串！(不能僅含有空白字元)")</script>'
    res.render('index', { restaurants: restaurantList.results, alert: alert })
    return
  }
  console.log("a")
  if (restaurants.length === 0) {
    let alert = '<script> alert("' + `您輸入的關鍵字 ${keyword} 沒有找到結果` + '")</script>'
    res.render('index', { restaurants: restaurantList.results, alert: alert })
    console.log(restaurants)
    console.log(alert)
    return
  }
  console.log("b")
  res.render('index', { restaurants: restaurants })
  console.log("c")
})

//start and listen on the Express Server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

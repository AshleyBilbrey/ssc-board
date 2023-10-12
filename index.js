import express from 'express'

const app = express()
const port = 3008

app.set("view engine", "ejs");
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render("dash.ejs")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const Jimp = require('jimp')
const express = require('express')
const probe = require('probe-image-size')
const app = express()
app.use(express.json())
const PORT = 3000

app.get('/',(req,res)=>{
  res.status(200).send({"Message":"OK"})
})

async function getSize(url,callback) {
let result = await probe(url);
callback(result)
}

app.get('/getImageSize',(req,res) => {
  let url = req.query.url
  getSize(url,function(result) {
    res.status(200).send(result)
  })
})

app.get('/getPixelColor/:x/:y/',(req,res) => {
  let url = req.query.url
  let x = Number(req.params.x)-1
  let y = Number(req.params.y)-1
  Jimp.read(url.toString(),(err,img) => {
res.status(200).send(Jimp.intToRGBA(img.getPixelColor(x,y)))
  })
})

app.listen(PORT, () => {
  console.log("Server is running🎉")
})

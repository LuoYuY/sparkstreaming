let express = require('express')
let app = express()
let mongodb = require('mongodb')

const MongoClient = require('mongodb').MongoClient

const url = "mongodb://115.29.208.141:27017"
const dbName = 'testDB'

app.get('/insert',function (req,res) {
// let server = new mongodb.Server('115.29.208.141',27017,{auto_reconnect:true })
// let db = new mongodb.Db('exampleDb', server//
//
//
// 连接数据库
  console.log("in insert")
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err
    console.log('数据库已连接')
    const db = client.db(dbName)
    // ----------------------插入一条数据
    let user = db.collection("user")
    let alias = db.collection("alias")
    let myInfo = { name: '贾克斯', age: 18 }
    user.insertOne(myInfo, (err, res) => {
      if(err) throw err
      console.log('成功插入一条数据')
    })
    alias.insertOne({_id: Math.random()}, (err, res) => {
      if(err) throw err
      console.log('成功插入一条数据')
    })
    // db.close()

  })
  // res.sendFile(__dirname + "/" + "hello")
})

let server = app.listen(3000,function (){
  console.log("getstreaming server starts--")
})

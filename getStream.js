let express = require('express')
let app = express()
let mongodb = require('mongodb')

let Client = require('ssh2-sftp-client');

function put(localPath, romotePath) {
  let sftp = new Client();
  sftp.connect({
    host: '115.29.208.141', // 服务器 IP
    port: '22',
    username: 'root',
    password: 'lyy.19971221'
  }).then(() => {
    // console.log(sftp.url)
    // 上传文件
    // return sftp.fastPut(localPath, romotePath);
    // 下载文件
    // return sftp.get(localPath, romotePath);
  }).then((data) => {
    // console.log(localPath + "上传完成");
    // console.log(localPath + "下载完成");
    sftp.end();
  }).catch((err) => {
    console.log(err, 'catch error');
  });
}

let localPath = '/home/lyy/Documents/test.test',
  // localPath = path.join(__dirname, 'test.test'),
  romotePath = '/home/test.test';

// 上传文件
// 第一个参数是需要上传的文件的本地路径；第二个参数是服务器存放的地址
// put(localPath, romotePath);
// 下载文件
// 第一个参数是需要下载的文件在服务器存放的地址；第二个参数是本地存放的路径
put(localPath,romotePath);


//
//
//
// // var FTPS = require('ftps');
// // var ftps = new FTPS({
// //   host: '172.19.241.194',
// //   username: 'hadoop',
// //   password: 'gy18851835309',
// //   protocol: 'ftp'
// // });
// //
// // ftps.exec(function (err, res) {
// //   console.log();
// // });
//
// const ftp = require('ftp');//连接FTP
// const client = new ftp();
// client.on('ready',()=>{
//   console.log('ftp client is ready');
// });
// client.connect({
//   // host : '172.19.241.194',
//   host : '115.29.208.141',
//   port : '21',
//   // user : 'hadoop',
//   // password : 'gy18851835309',
//   user : 'root',
//   password : 'lyy.19971221',
//   keepalive : 1000
// });
// let list = client.list('/')
// console.log(list)
// function list(dirpath){
//   console.log("hello");
//   return new Promise((resolve,reject)=>{
//     client.list((err,files)=>{
//       console.log(err);
//       resolve({err : err,files : files});
//     })
//   });
// }
// async function test (){
//   //list 列表功能
//   console.log("test");
//   let {err,files} = await list();
//   console.log("test3");
//   if(err){
//     console.log(err);
//     return
//   }
//   console.log("test2");
//   console.log(`获得文件列表:`+files.length);
//   console.log(files);
// }
// test();

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
  res.send("hello")
})

let server = app.listen(3000,function (){
  console.log("getstreaming server starts--")
})

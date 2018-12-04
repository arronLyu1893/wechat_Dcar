//销售统计数据服务器
const express=require('express');
var pool = require("./pool");
const qs=require('querystring');

var app = express();
app.use(express.static(__dirname+'/public'));
app.listen(8080,()=>{console.log('success'); });


//小程练习
//http://127.0.0.1:8080/test01
app.get("/test01",(req,res)=>{
  var id = req.quert.id;
  var age = req.query.age;
  res.send(id+1+age);
})


//小程项目
//功能一：轮播图
//http://127.0.0.1:8080/imagelist
app.get("/imagelist",(req,res)=>{
  var obj = [
    {id:1,img_url:"http://127.0.0.1:8080/img/index/banner-1.jpg"},
    {id:2,img_url:"http://127.0.0.1:8080/img/index/banner-2.jpg"},
    {id:3,img_url:"http://127.0.0.1:8080/img/index/banner-3.jpg"},
    {id:4,img_url:"http://127.0.0.1:8080/img/index/banner-4.jpg"},
    {id:4,img_url:"http://127.0.0.1:8080/img/index/banner-5.jpg"},
    {id:4,img_url:"http://127.0.0.1:8080/img/index/banner-6.jpg"},
  ];
  res.send(obj);
});



//功能二：九宫格
//http://127.0.0.1:8080/imagelist2
app.get("/imagelist2",(req,res)=>{
  var obj = [
    {id:1,img_url:"http://127.0.0.1:8080/img/assets/icons/grid-01.png",name:"美食1"},
    {id:2,img_url:"http://127.0.0.1:8080/img/assets/icons/grid-02.png",name:"美食2"},
    {id:3,img_url:"http://127.0.0.1:8080/img/assets/icons/grid-03.png",name:"美食3"},
    {id:4,img_url:"http://127.0.0.1:8080/img/assets/icons/grid-04.png",name:"美食4"},
    {id:5,img_url:"http://127.0.0.1:8080/img/assets/icons/grid-05.png",name:"美食5"},
    {id:6,img_url:"http://127.0.0.1:8080/img/assets/icons/grid-06.png",name:"美食6"},
    {id:7,img_url:"http://127.0.0.1:8080/img/assets/icons/grid-07.png",name:"美食7"},
    {id:8,img_url:"http://127.0.0.1:8080/img/assets/icons/grid-08.png",name:"美食8"},
    {id:9,img_url:"http://127.0.0.1:8080/img/assets/icons/grid-09.png",name:"美食9"}];
  res.send(obj);
});

//功能三：新闻列表数据
app.get("/newslist",(req,res)=>{
  var obj = [
    {id:1,ctime:"2018-09-11",img_url:"http://127.0.0.1:8080/img/banner1.png",title:"小米笔记本1",desc:"东半球最好用的笔记本"},
    {id:2,ctime:"2018-09-12",img_url:"http://127.0.0.1:8080/img/banner2.png",title:"小米笔记本2",desc:"东半球最好用的笔记本"},
    {id:3,ctime:"2018-09-13",img_url:"http://127.0.0.1:8080/img/banner3.png",title:"小米笔记本3",desc:"东半球最好用的笔记本"},
    {id:4,ctime:"2018-09-14",img_url:"http://127.0.0.1:8080/img/banner4.png",title:"小米笔记本4",desc:"东半球最好用的笔记本"}];
  res.send(obj);
});

//
app.post("/postPorduct",(req,res)=>{
  req.on("data",(buff)=>{
    var obj = qs.parse(buff.toString());
    var pno = obj.pno;
    var price = obj.price;
    res.send({code:1,msg:":"+pno+":"+price});
  })
})


//功能二：分页显示:新闻分页  借用VUE-UI的app.js
app.get("/newslist2",(req,res)=>{
  //1:参数  当前页码  页大小(一页显示几行数据)
  var pno = req.query.pno;            //2
  var pageSize = req.query.pageSize;  //5
  console.log(pno,pageSize)
  //2:sql
  //2.1:查找总记录数->转换总页数  15->3
  var sql = "SELECT count(id) as c FROM xz_news";

  var obj = {};      //保存发送客户端数据
  var progress = 0;  //进度
  pool.query(sql,(err,result)=>{
      if(err)throw err;
      var c = Math.ceil(result[0].c/pageSize);
      obj.pageCount = c;
      progress+=50;
      if(progress==100){
        res.send(obj);
      }
  });
  //2.2:查找当前页内容           中间5行
  var sql = " SELECT id,title,img_url,ctime,point";
     sql += " FROM xz_news";
     sql += " LIMIT ?,?";
  var offset = parseInt((pno-1)*pageSize);   //计算分页偏移量
  pageSize = parseInt(pageSize)
  pool.query(sql,[offset,pageSize],(err,result)=>{
      if(err)throw err;
      //console.log(result);
      obj.data = result;
      progress+=50;
      if(progress==100){
        res.send(obj);
      }
  })
  //3:结果格式
  //res.send({code:"ok"})
});
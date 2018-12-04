//node.js ws 服务器
//1:下载ws模块 npm i ws
//2:引入ws模块
const ws = require("ws");
//3:创建ws服务器并且指定端口 9001
var server = new ws.Server({port:9001});
console.log("ws 服务器开始监听端口");
//4:绑定事件 connection 客户端连接事件
server.on("connection",(socket)=>{
  console.log("ws 服务器接收连接");
  //5:服务器不停向客户端发送数据 定时器
  var counter = 1;
  var timer = setInterval(function(){
    counter++;
    socket.send("I am Server - "+counter);
  },1000);
  //6:服务器接收客户端数据
  socket.on("message",(msg)=>{
    console.log("服务器接收到消息"+msg);
  })
  //7:如果客户端发来断开连接请求停止定时器
  socket.on("close",()=>{
    console.log("客户端断开连接...");
    clearInterval(timer);
  })
});

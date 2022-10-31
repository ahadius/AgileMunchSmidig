const http =require('http');
const server = http.createServer((reg, res)=>{
  console.log(reg)

})
server.listen(3000,'localhost',()=> {
     console.log("lisning for requgest")    
     console.log("111111")                     
})
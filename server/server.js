const path=require('path')
const express=require('express')

const app=express()
const publicPath = path.resolve(__dirname,'..', 'ReactJS', 'dist')
const port=process.env.PORT ||8001;

if(process.env.NODE_ENV === 'production'){
    
    app.use(express.static(publicPath))
}
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(publicPath))
})
app.listen(port,()=>{
console.log("server on port "+port)
})
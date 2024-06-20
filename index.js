const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');


// Setting up parsers, we can use our form (mainly Get type)
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Setting up ejs as a view engine
app.set('view engine','ejs');

app.get("/",(req,res)=>{
    // Whatever fiele is there in the ./files folder will be treated as an Array
    // and it will be stored in a variable called data indicating to the array's data
    fs.readdir("./files",(err,data)=>{
        res.render("index2", {data:data})
    })
})

app.post("/create",(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(" ").join('')}.txt`, req.body.details ,(err,data)=>{
        res.redirect("/");
    })
})

// When you click on the 'readmore' button it will redirect you to the page which renders "new.ejs"
app.get("/files/:filename",(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`, "utf-8",(err,data)=>{
        res.render("new",{root:__dirname, filename:req.params.filename, data:data})
    })
})


// When you click on the 'edit' button it will redirect you to the page which renders "edit.ejs"
app.get("/edit/:filename",(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`, "utf-8",(err,data)=>{
        res.render("edit",{root:__dirname, filename:req.params.filename, data:data})
    })
})

app.post('/edit',(req,res)=>{
    fs.rename(`./files/${req.body.title}`,`./files/${req.body.new}`,(err,data)=>{
        res.redirect("/");
    })
})

app.listen(port,()=>{
    console.log(`App running at port ${port}`)
})
//Dependencies
const Serialize_Javascript = require("serialize-javascript")
const Body_Parser = require("body-parser")
const { MongoClient } = require("mongodb")
const Express = require("express")
const Path = require("path")

//Variables
const Port = process.env.PORT || 8080
const Web = Express()

const Client = new MongoClient("") //Your MongoDB cluster link.

///Configurations
//Express
Web.use(Body_Parser.json())

//Functions
async function Main(){
    console.log("Connecting to the database please wait.")
    await Client.connect()
    console.log("Successfully connected to the database.")

    const Database = Client.db("self") //MongoDB database name that is in the cluster.
    const Accounts = Database.collection("accounts") //MongoDB database collection name
    
    Web.use(Express.static(Path.resolve(__dirname, "public")), function(req, res, next){
        next()
    })

    Web.post("/api/login", async function(req, res){
        if(typeof(req.body) != "object"){
            res.json({
                "message": "Body is not json."
            })
            return
        }

        req.body = JSON.parse(Serialize_Javascript(req.body)) //Double security ¯\_(ツ)_/¯

        if(!req.body.username || req.body.username.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)){
            res.json({
                "message": "Invalid username, make sure to not use any special characters."
            })
            return
        }

        if(!req.body.password){
            res.json({
                "message": "Invalid password."
            })
            return
        }

        const account_exists = await Accounts.findOne({ username: req.body.username })

        if(!account_exists || account_exists.password != req.body.password){
            res.json({
                "message": "Invalid username & password."
            })
            return
        }

        res.json({
            "message": "Successfully login!"
        })
    })

    Web.post("/api/register", async function(req, res){
        if(typeof(req.body) != "object"){
            res.json({
                "message": "Body is not json."
            })
            return
        }

        req.body = JSON.parse(Serialize_Javascript(req.body)) //Double security ¯\_(ツ)_/¯

        if(!req.body.username || req.body.username.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)){
            res.json({
                "message": "Invalid username, make sure to not use any special characters."
            })
            return
        }

        if(!req.body.password){
            res.json({
                "message": "Invalid password."
            })
            return
        }

        const account_exists = await Accounts.findOne({ username: req.body.username })

        if(account_exists){
            res.json({
                "message": "Account already exists."
            })
            return
        }

        await Accounts.insertOne({ username: req.body.username, password: req.body.username })
        res.json({
            "message": "Account successfully created!"
        })
    })
    
    Web.listen(Port , async()=>{
        console.log(`Server is running in port ${Port}`)
    })
}

//Main
Main()
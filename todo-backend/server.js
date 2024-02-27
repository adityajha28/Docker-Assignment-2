const express = require("express");
const {MongoClient, ObjectId} = require("mongodb");
const cors = require("cors");
const PORT = 5000;

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use("/todo",router);

//Mongo Config

const uri = "mongodb://mongo:27017";

// "mongodb://127.0.0.1:27017


const client = new MongoClient(uri);
let db;


//Routes

//create
router.route("/add")
.post(async (req,res) => {
    db.collection("todo").insertOne(req.body);
    res.send(req.body);
});

//read
//all todo
router.route("/")
.get(async (req,res) => {
    let todo = await db.collection("todo").find().toArray();
    res.send(todo);
});

//get by id
router.route("/:id")
.get(async (req,res) => {
    let id = new ObjectId(req.params.id);
    let todo = await db.collection("todo").find({_id:id}).toArray();
    res.send(todo);
});

//get by title
router.route("/:search")
.get(async (req,res) => {
    let todo = await db.collection("todo").find({$text:{$search:req.params.search}}).toArray();
    res.send(todo);
});


//update
//update by id
router.route("/update/:id")
.put(async (req,res) => {
    //let s_id = req.params.id;
    let id = new ObjectId(req.params.id);
    let todo = await db.collection("todo").findOneAndUpdate(
        {_id:id},{
            $set:
            {
                "title":req.body.title,
                "description":req.body.description,
                "priority":req.body.priority,
                "responsible":req.body.responsible,
                "complete":req.body.complete

            }
        },{returnDocument:"after"});
    //res.write("Todo id: {"+s_id+"}  Updated Sucessfully");
    res.send(todo);
});

//mark as done/not-done all

router.route("/markAsDone/:cmplt")
.put(async (req,res) => {
    let status=(req.params.cmplt=="true");
    let todo = await db.collection("todo").updateMany(
        {},{
            $set:
            {
                "complete":status
            }
        },
        {
            multi:true
        });
    //res.write("Todo id: {"+s_id+"}  Updated Sucessfully");
    res.send(todo);
});


//mark as done one
router.route("/markAsDone/:id/:cmplt")
.put(async (req,res) => {
    //let s_id = req.params.id;
    let id = new ObjectId(req.params.id);
    let status=(req.params.cmplt=="true");
    let todo = await db.collection("todo").updateOne(
        {_id:id},{
            $set:
            {
                "complete":status
            }
        });
    //res.write("Todo id: {"+s_id+"}  Updated Sucessfully");
    res.send(todo);
});


//delete
router.route("/delete/:id")
.delete(async (req,res) => {
    let s_id = req.params.id;
    let id = new ObjectId(s_id);
    await db.collection("todo").deleteOne({_id:id});
    res.send("Todo id: {"+s_id+"}  Deleted Sucessfully");
});

//delete all

router.route("/delete")
.delete(async (req,res) => {
    await db.collection("todo").deleteMany({});
    res.send("All Todos Deleted Sucessfully");
});

const connectToMongoAndStartServer = async () =>
{
    await client.connect();
    db = client.db("todoApp");
    console.log("Connected to Mongo Sucessfully");

    //start the app when connection is sucessfull
    app.listen(PORT,()=>{
        console.log("Listening to PORT : ",PORT);
    })

}

connectToMongoAndStartServer().catch(console.error);
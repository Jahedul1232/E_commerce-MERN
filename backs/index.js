const express = require('express');
const cors = require('cors');
require('./dbs/Config');
const User = require('./dbs/Users');
const Item = require('./dbs/Item');
const Customer = require('./dbs/Customer');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/signup', async (req, res) => {
    
let check = await User.findOne({ email: req.body.email });
    if (check) {
        res.send({ message: "User Already Exist" });
    }
    else {
        let result = await new User(req.body).save();
        restul = result.toObject();
        delete restul.password;
        res.send(req.body);
    }

   
})



app.post('/login', async (req, res) => {
    
    let user = await User.findOne(req.body).select("-password");
    console.log(user)
    if (user) {
        res.send([user]);
    }
    else {

        res.send({ message: "Invalid Credentials" });
    }
    // res.send(req.body);
})

app.post('/updateuser', async (req, res) => {
    let check = await User.findById(req.body.uid);
    if(check){
        check.name = req.body.name;
        check.email = req.body.email;
        check.role = req.body.role;
        check.active = false;
        let result = await check.save();
        console.log(result);
        res.send(result);
    }
    else {
        let result = await new User(req.body).save();
        res.send(result);
    }
    res.send();
})


app.get('/userlst', async (req, res) => {
    let user = await User.find().select("-password");
    res.send(user);
})
app.get('/getuser/:id', async (req, res) => {
    
})

app.post('/productcreate', async (req, res) => {
    console.log(req.body);
    if(req.body.createdby!=undefined) {
        req.body.createdby = await User.findById(req.body.createdby);
        let mess = new Item(req.body);
        let result = await mess.save(req.body);
        res.send(result);
    }
})
app.post('/productupdate/:id', async (req, res) => {
    let mess = await Item.findById(req.params.id);
    if(mess.createdby==req.body.createdby) {
        mess.name = req.body.name;
        mess.address = req.body.address;
        mess.area = req.body.area;
        mess.upzila = req.body.upzila;
        mess.district = req.body.district;
        mess.members = req.body.members;
        let result = await mess.save();
        res.send(result);
    }
})

//Customer


app.post('/creatcustomer', async (req, res) => {
    let check = await Customer.findOne({ email: req.body.email });
    

        // console.log(req.body);
        if(req.body.createdby!=undefined) {
        // req.body.createdby =await User.findById(req.body.createdby);
        let cus = new Customer(req.body);
        let result = await cus.save(req.body);
        res.send(result);
    }
    
})

app.get('/getcustomer', async (req, res) => {
    let result = await Customer.find().select().populate({ path: 'createdby' });
    console.log(result);
    res.send(result);
})

app.get('/detailcustomer/:id',async (req, res) => {      
    let cus = await Customer.findById(req.params.id);
    console.log(cus);
    res.send(cus);
});

app.get('/getcustomer/:id',async (req, res) => {
    let mess = await Item.findById(req.params.id);
    res.send(mess);
});



//Items
app.get('/getitem', async (req, res) => {
    let result = await Item.find().select().populate({path:'createdby'});
    res.send(result);
})

app.get('/getitems/:id',async (req, res) => {
    let mess = await Item.findById(req.params.id);
    res.send(mess);
});

app.listen(5001)
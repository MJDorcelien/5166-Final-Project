var admin = require("firebase-admin");

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

let usersRef = db.collection('users')
let budgetsRef = db.collection('budgets')
let transactionsRef = db.collection('transactions')

const express = require('express')
const app = express();

const jwt = require('jsonwebtoken');
const { expressjwt: exjwt } = require('express-jwt');
const bodyParser = require('body-parser');
const path = require('path');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;

const secretKey = 'My super secret key';
const jwtMW = exjwt({
    secret: secretKey,
    algorithms: ['HS256']
});

// new api calls
app.get('/api/getUsers', async (req, res) => {
    const users = []
    await usersRef.get().then((querySnapshot) => {
        querySnapshot.forEach(document => {
            users.push(document.data())
        })
    })
    res.json(users)
})

app.get('/api/getUser', async (req, res) => {
    const { username, password, userID } = req.body
    res.json({username: username, userID: userID})
})


app.get('/api/transactions', async (req, res) => {
    const transactions = []
    await transactionsRef.get().then((querySnapshot) => {
        querySnapshot.forEach(document => {
            transactions.push(document.data())
        })
    })
    res.json(transactions)
})

app.post('/api/signup', (req, res) => {
    const { username, password, userID } = req.body

    if (req.body){
        let token = jwt.sign({id: userID, username: username}, secretKey, { expiresIn: '180000'})
        res.json({
            success: true,
            err: null,
            token
        })
    }
    else {
        res.status(401).json({
            success: false,
            token: null,
            err: 'SignUp Failed'
        })
    }    
})

app.post('/api/login', (req, res) => {
    const { username, password, userID } = req.body

    if (req.body){
        let token = jwt.sign({id: userID, username: username}, secretKey, { expiresIn: 60 })
        res.json({
            success: true,
            err: null,
            token
        })
    }
    else {
        res.status(401).json({
            success: false,
            token: null,
            err: 'LogIn Failed'
        })
    } 
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/'));
});

app.use(function(err, req, res, next){
    if(err.name==='UnauthorizedError'){
        res.status(401).json({
            success: false,
            officialError: err,
            err: 'Username or password is incorrect 2'
        });
    }
    else{
        next(err);
    }
});

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});

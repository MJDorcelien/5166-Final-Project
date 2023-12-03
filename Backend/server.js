const express = require('express');
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

// figure out a way to get the database of users

let usersOld = [
    {
        id: 1,
        username: 'mj',
        password: '123'
    },
    {
        id: 2,
        username: 'dorcelien',
        password: '456'
    }
];



app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
   
    for (let user of usersOld){
        if (username ==user.username && password == user.password) {
            let token = jwt.sign({id: user.id, username: user.username}, secretKey, { expiresIn: '180000' })
            console.log(user.id)
            console.log(user.username)
            res.json({
                success: true,
                err: null,
                token
            });

            break;
        }
        else{
            res.status(401).json({
                success: false,
                token: null,
                err: 'Username or password is incorrect'
            });
        }
    }
});

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

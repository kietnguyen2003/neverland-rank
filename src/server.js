const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app.js')
const db = require('./config/index.js');
const port = 3000;
// Connect to db
db.connect();


app.get('neverland-rank.vercel.app/', async (req, res) => {
    res.render('index')
});

// Router
const signInRouter = require('../routers/signInRouters.js');
const memberRouter = require('../routers/memberRouters.js');
const updateRouter = require('../routers/updateRouters.js');
const moveRouter = require('../routers/moveRouters.js');

app.use('/', moveRouter)
app.use('/login', signInRouter);
app.use('/member', memberRouter);
app.use('/update', updateRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
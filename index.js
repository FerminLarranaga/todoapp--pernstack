const express = require ("express");
const morgan = require("morgan");
// const cors = require("cors");
const path = require('path');

const taskRoutes = require("./src/routes/tasks.routes.js");
const authRoutes = require("./src/routes/auth.routes.js");

const app = express();

const port = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(express.json());
// app.use(cors());

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));
}

app.use('/taskRoutes', taskRoutes);
app.use('/authRoutes', authRoutes);

app.use((err, req, res, next) => {
    res.status(403).json({error: err.message});
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.listen(port);
console.log(`Server running on port ${port}`);
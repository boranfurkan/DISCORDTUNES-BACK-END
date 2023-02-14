require('dotenv').config()
require('express-async-errors')

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express')
const app = express()

// connect db
const connectDB = require('./db/connect')

// routers
const listsRouter = require("./routes/lists")
const songsRouter = require("./routes/songs")
const youtubeRouter = require("./routes/youtubeSearch")
const spotifyRouter = require("./routes/spotifySearch")

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// extra packages
app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300 // limit each IP to 300 requests per windowMs
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

// routes
app.get("/", (req, res) => {
    res.send("<h2>This route is not available.</h2>")
})

app.use("/api/v1/lists", listsRouter)
app.use("/api/v1/lists/songs", songsRouter)
app.use("/api/v1/youtube", youtubeRouter)
app.use("/api/v1/spotify", spotifyRouter)

// Middlewares
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 8080;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error)
    }
}

start()

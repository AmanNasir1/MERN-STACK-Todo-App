const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const TodoItemRoute = require("./routes/todoItems")
const cors = require("cors")

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 5500

app.use(cors())

app.use("/", TodoItemRoute)

mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`)
        })
    })
    .catch((err) => console.log("error ===> ", err))








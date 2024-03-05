const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const { Expense } = require('./schema.js')

const app = express()
app.use(bodyParser.json())
/**
 * git clone <link>
 * 
 * (add .gitignore file)
 * 
 * git add .
 * git commit -m "any msg"
 * git push origin main
 * 
 * git config --global user.name '<username>'
 * git config --global user.email <emailId>
 */

/**
 * Expense Tracker
 * 
 * Features and end points
 * 
 * Adding a new expense/income : /add-expense -> post
 * Displaying existing expenses : /get-expenses -> get
 * Editing existing entries : /edit-expense -> patch/put
 * Deleting expenses : /delete-expense -> delete
 * 
 * Budget reporting
 * Creating new user
 * Validating user
 * 
 * Defining schema
 * category, amount, date 
 */

async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://kavin0133:admin@kavin.r7zv7jm.mongodb.net/expensetracker?retryWrites=true&w=majority')


        console.log('DB connection established :)')
        const port = 8000
        app.listen(port, function() {
            console.log(`Listening on port ${port}...`)
        })
    } catch(error) {
        console.log(error)
        console.log('Couldn\'t establish connection :(')
    }
}
connectToDb()

app.post('/add-expense', async function(request, response) {
    try {
        await Expense.create({
            "amount" : request.body.amount,
            "category" : request.body.category,
            "date" : request.body.date
        })
        response.status(201).json({
            "status" : "success",
            "message" : "entry created"
        })
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "entry not created",
            "error" : error
        })
    }
})
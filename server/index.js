const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Question = require('./models/Question');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://khanrjaa480:ipl123xX@cluster0.l95eyhz.mongodb.net/';

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get('/api/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/seed', async (req, res) => {
    try {
        await Question.deleteMany({}); 

        const questions = [
            { 
                questionText: "Inside which HTML element do we put the JavaScript?", 
                options: ["<javascript>", "<scripting>", "<script>", "<js>"], 
                correctAnswer: "<script>" 
            },
            { 
                questionText: "Where is the correct place to insert a JavaScript?", 
                options: ["The <head> section", "The <body> section", "Both", "None"], 
                correctAnswer: "Both" 
            },
            { 
                questionText: "What is the correct syntax for referring to an external script called 'xxx.js'?", 
                options: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>", "<script file='xxx.js'>"], 
                correctAnswer: "<script src='xxx.js'>" 
            },
            { 
                questionText: "How do you write 'Hello World' in an alert box?", 
                options: ["msg('Hello World');", "alert('Hello World');", "msgBox('Hello World');", "alertBox('Hello World');"], 
                correctAnswer: "alert('Hello World');" 
            },
            { 
                questionText: "How do you create a function in JavaScript?", 
                options: ["function myFunction()", "function:myFunction()", "create myFunction()", "function = myFunction()"], 
                correctAnswer: "function myFunction()" 
            },
            { 
                questionText: "How do you call a function named 'myFunction'?", 
                options: ["call function myFunction()", "call myFunction()", "myFunction()", "Call.myFunction()"], 
                correctAnswer: "myFunction()" 
            },
            { 
                questionText: "How to write an IF statement in JavaScript?", 
                options: ["if i = 5 then", "if i == 5 then", "if (i == 5)", "if i = 5"], 
                correctAnswer: "if (i == 5)" 
            },
            { 
                questionText: "How to write an IF statement if 'i' is NOT equal to 5?", 
                options: ["if (i <> 5)", "if (i != 5)", "if i =! 5 then", "if (i not 5)"], 
                correctAnswer: "if (i != 5)" 
            },
            { 
                questionText: "How does a WHILE loop start?", 
                options: ["while (i <= 10; i++)", "while (i <= 10)", "while i = 1 to 10", "while (i++ <= 10)"], 
                correctAnswer: "while (i <= 10)" 
            },
            { 
                questionText: "How does a FOR loop start?", 
                options: ["for (i = 0; i <= 5)", "for (i = 0; i <= 5; i++)", "for i = 1 to 5", "for (i <= 5; i++)"], 
                correctAnswer: "for (i = 0; i <= 5; i++)" 
            },
            { 
                questionText: "How can you add a comment in a JavaScript?", 
                options: ["'This is a comment", "", "//This is a comment", "*This is a comment"], 
                correctAnswer: "//This is a comment" 
            },
            { 
                questionText: "How to insert a comment that has more than one line?", 
                options: ["/* Comment */", "// Comment //", "", "# Comment"], 
                correctAnswer: "/* Comment */" 
            },
            { 
                questionText: "What is the correct way to write a JavaScript array?", 
                options: ["var c = (1:'red', 2:'green')", "var c = ['red', 'green']", "var c = 'red', 'green'", "var c = 1 = ('red')"], 
                correctAnswer: "var c = ['red', 'green']" 
            },
            { 
                questionText: "How do you round the number 7.25, to the nearest integer?", 
                options: ["Math.round(7.25)", "round(7.25)", "rnd(7.25)", "Math.rnd(7.25)"], 
                correctAnswer: "Math.round(7.25)" 
            },
            { 
                questionText: "How do you find the number with the highest value of x and y?", 
                options: ["ceil(x, y)", "Math.ceil(x, y)", "Math.max(x, y)", "top(x, y)"], 
                correctAnswer: "Math.max(x, y)" 
            },
            { 
                questionText: "What is the correct JavaScript syntax for opening a new window?", 
                options: ["w2 = window.new('url');", "w2 = window.open('url');", "w2 = window.create('url');", "w2 = window.window('url');"], 
                correctAnswer: "w2 = window.open('url');" 
            },
            { 
                questionText: "JavaScript is the same as Java.", 
                options: ["True", "False", "Maybe", "Sometimes"], 
                correctAnswer: "False" 
            },
            { 
                questionText: "How can you detect the client's browser name?", 
                options: ["navigator.appName", "browser.name", "client.navName", "window.browser"], 
                correctAnswer: "navigator.appName" 
            },
            { 
                questionText: "Which event occurs when the user clicks on an HTML element?", 
                options: ["onmouseclick", "onchange", "onclick", "onmouseover"], 
                correctAnswer: "onclick" 
            },
            { 
                questionText: "How do you declare a JavaScript variable?", 
                options: ["v carName;", "var carName;", "variable carName;", "val carName;"], 
                correctAnswer: "var carName;" 
            }
        ];

        await Question.insertMany(questions);
        
        res.send("Success! 20 Questions Loaded.");
    } catch (err) {
        res.status(500).send("Error seeding database: " + err.message);
    }
});

app.get('/api/clear', async (req, res) => {
    try {
        await Question.deleteMany({});
        res.send("Database Cleared! All questions are gone.");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
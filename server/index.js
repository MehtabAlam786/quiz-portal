const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Question = require('./models/Question');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/quizdb')
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
                questionText: "1. What does HTML stand for?",
                options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Multi Language"],
                correctAnswer: "Hyper Text Markup Language"
            },
            {
                questionText: "2. Who is making the Web standards?",
                options: ["Mozilla", "Microsoft", "The World Wide Web Consortium (W3C)", "Google"],
                correctAnswer: "The World Wide Web Consortium (W3C)"
            },
            {
                questionText: "3. Choose the correct HTML element for the largest heading:",
                options: ["<heading>", "<h6>", "<head>", "<h1>"],
                correctAnswer: "<h1>"
            },
            {
                questionText: "4. What is the correct HTML element for inserting a line break?",
                options: ["<lb>", "<br>", "<break>", "<b>"],
                correctAnswer: "<br>"
            },
            {
                questionText: "5. Which character is used to indicate an end tag?",
                options: ["*", "/", "<", "^"],
                correctAnswer: "/"
            },
            {
                questionText: "6. How can you open a link in a new tab/browser window?",
                options: ["<a href='url' target='new'>", "<a href='url' target='_blank'>", "<a href='url' new>", "<a href='url' target='window'>"],
                correctAnswer: "<a href='url' target='_blank'>"
            },
            {
                questionText: "7. Which of these elements are all <table> elements?",
                options: ["<table> <head> <tfoot>", "<table> <tr> <td>", "<table> <tr> <tt>", "<thead> <body> <tr>"],
                correctAnswer: "<table> <tr> <td>"
            },
            {
                questionText: "8. How can you make a numbered list?",
                options: ["<dl>", "<ol>", "<list>", "<ul>"],
                correctAnswer: "<ol>"
            },
            {
                questionText: "9. What is the correct HTML for making a checkbox?",
                options: ["<input type='check'>", "<check>", "<checkbox>", "<input type='checkbox'>"],
                correctAnswer: "<input type='checkbox'>"
            },
            {
                questionText: "10. Which HTML attribute specifies an alternate text for an image?",
                options: ["title", "src", "alt", "longdesc"],
                correctAnswer: "alt"
            },

            {
                questionText: "11. What does CSS stand for?",
                options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
                correctAnswer: "Cascading Style Sheets"
            },
            {
                questionText: "12. Which HTML tag is used to define internal CSS?",
                options: ["<css>", "<script>", "<style>", "<design>"],
                correctAnswer: "<style>"
            },
            {
                questionText: "13. Which is the correct CSS syntax?",
                options: ["body {color: black;}", "{body;color:black;}", "body:color=black;", "body = color: black;"],
                correctAnswer: "body {color: black;}"
            },
            {
                questionText: "14. How do you insert a comment in a CSS file?",
                options: ["// this is a comment", "/* this is a comment */", "' this is a comment", "// this is a comment //"],
                correctAnswer: "/* this is a comment */"
            },
            {
                questionText: "15. Which property is used to change the background color?",
                options: ["color", "bgcolor", "background-color", "bg-color"],
                correctAnswer: "background-color"
            },
            {
                questionText: "16. How do you select an element with id 'demo'?",
                options: ["#demo", ".demo", "demo", "*demo"],
                correctAnswer: "#demo"
            },
            {
                questionText: "17. How do you select elements with class name 'test'?",
                options: ["#test", ".test", "test", "*test"],
                correctAnswer: ".test"
            },
            {
                questionText: "18. Which property controls the text size?",
                options: ["font-style", "text-size", "font-size", "text-style"],
                correctAnswer: "font-size"
            },
            {
                questionText: "19. How do you make each word in a text start with a capital letter?",
                options: ["text-transform: capitalize", "text-style: capitalize", "transform: capitalize", "font-transform: capitalize"],
                correctAnswer: "text-transform: capitalize"
            },
            {
                questionText: "20. How do you display hyperlinks without an underline?",
                options: ["text-decoration: no-underline", "text-decoration: none", "underline: none", "decoration: no-underline"],
                correctAnswer: "text-decoration: none"
            }
        ];

        await Question.insertMany(questions);
        
        res.send("Success! 20 Questions (HTML & CSS) Loaded.");
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
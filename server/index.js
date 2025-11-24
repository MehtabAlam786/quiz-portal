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
                questionText: "What does JVM stand for?", 
                options: ["Java Variable Machine", "Java Virtual Machine", "Java Visual Machine", "Java Version Machine"], 
                correctAnswer: "Java Virtual Machine" 
            },
            { 
                questionText: "Which is the entry point of a Java program?", 
                options: ["init()", "main()", "start()", "run()"], 
                correctAnswer: "main()" 
            },
            { 
                questionText: "Which data type is used to create a variable that should store text?", 
                options: ["String", "txt", "string", "Text"], 
                correctAnswer: "String" 
            },
            { 
                questionText: "How do you create a variable with the numeric value 5?", 
                options: ["num x = 5", "x = 5", "int x = 5", "float x = 5"], 
                correctAnswer: "int x = 5" 
            },
            { 
                questionText: "Which method can be used to find the length of a string?", 
                options: ["getLength()", "length()", "getSize()", "len()"], 
                correctAnswer: "length()" 
            },
            { 
                questionText: "Which operator is used to compare two values?", 
                options: ["=", "==", "<>", "><"], 
                correctAnswer: "==" 
            },
            { 
                questionText: "To declare an array in Java, define the variable type with:", 
                options: ["()", "{}", "[]", "<>"], 
                correctAnswer: "[]" 
            },
            { 
                questionText: "Array indexes start with:", 
                options: ["1", "0", "-1", "undefined"], 
                correctAnswer: "0" 
            },
            { 
                questionText: "Which keyword is used to create a class?", 
                options: ["class", "className", "myClass", "class()"], 
                correctAnswer: "class" 
            },
            { 
                questionText: "Which keyword is used to create an object?", 
                options: ["class", "obj", "new", "create"], 
                correctAnswer: "new" 
            },
            { 
                questionText: "Which keyword is used to inherit a class?", 
                options: ["this", "inherits", "extends", "super"], 
                correctAnswer: "extends" 
            },
            { 
                questionText: "What is the default value of an int variable?", 
                options: ["0", "0.0", "null", "undefined"], 
                correctAnswer: "0" 
            },
            { 
                questionText: "Which statement is used to stop a loop?", 
                options: ["stop", "break", "return", "exit"], 
                correctAnswer: "break" 
            },
            { 
                questionText: "Which keyword is used to access the parent class?", 
                options: ["this", "parent", "super", "base"], 
                correctAnswer: "super" 
            },
            { 
                questionText: "How do you create a method in Java?", 
                options: ["methodName()", "(methodName)", "methodName[]", "methodName{}"], 
                correctAnswer: "methodName()" 
            },
            { 
                questionText: "Which access modifier makes members visible only within the same class?", 
                options: ["public", "protected", "private", "default"], 
                correctAnswer: "private" 
            },
            { 
                questionText: "What is a correct constructor for a class named 'Car'?", 
                options: ["public car()", "public void Car()", "public Car()", "new Car()"], 
                correctAnswer: "public Car()" 
            },
            { 
                questionText: "The 'final' keyword creates a variable that:", 
                options: ["Is abstract", "Cannot be changed", "Is public", "Is static"], 
                correctAnswer: "Cannot be changed" 
            },
            { 
                questionText: "Which exception is thrown when dividing by zero?", 
                options: ["NullPointerException", "ArithmeticException", "NumberFormatException", "ArrayIndexOutOfBoundsException"], 
                correctAnswer: "ArithmeticException" 
            },
            { 
                questionText: "Which package contains the Scanner class?", 
                options: ["java.io", "java.util", "java.lang", "java.net"], 
                correctAnswer: "java.util" 
            },
            { 
                questionText: "What is the size of int in Java?", 
                options: ["8 bit", "16 bit", "32 bit", "64 bit"], 
                correctAnswer: "32 bit" 
            },
            { 
                questionText: "Which of these is NOT a primitive data type?", 
                options: ["int", "boolean", "String", "char"], 
                correctAnswer: "String" 
            },
            { 
                questionText: "Method overloading occurs when:", 
                options: ["Methods have same name but different parameters", "Methods have different names", "Methods have same parameters", "Methods are in different classes"], 
                correctAnswer: "Methods have same name but different parameters" 
            },
            { 
                questionText: "Which keyword is used to import a package?", 
                options: ["package", "import", "include", "using"], 
                correctAnswer: "import" 
            },
            { 
                questionText: "What is the result of 10 % 3?", 
                options: ["3", "10", "1", "3.33"], 
                correctAnswer: "1" 
            },
            { 
                questionText: "Which class is the superclass of every class in Java?", 
                options: ["Object", "String", "Main", "System"], 
                correctAnswer: "Object" 
            },
            { 
                questionText: "Which interface must be implemented for threads?", 
                options: ["Thread", "Runnable", "Process", "Runner"], 
                correctAnswer: "Runnable" 
            },
            { 
                questionText: "How do you cast a double 'd' to an int?", 
                options: ["int i = d;", "int i = (int)d;", "int i = d.toInt();", "int i = int(d);"], 
                correctAnswer: "int i = (int)d;" 
            },
            { 
                questionText: "Does Java support multiple inheritance for classes?", 
                options: ["Yes", "No", "Sometimes", "Only via abstract classes"], 
                correctAnswer: "No" 
            },
            { 
                questionText: "Which keyword allows a method to return a value?", 
                options: ["get", "void", "return", "break"], 
                correctAnswer: "return" 
            }
        ];

        await Question.insertMany(questions);
        
        res.send("Success! Question added");
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

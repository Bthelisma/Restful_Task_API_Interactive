// ========== CONFIG =============
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();

// app.use(express.static(path.join(__dirname, './static')));
app.use(express.static(__dirname + '/restfulApp/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'ejs');
// ===============================



// ==== NEW MONGOOSE CODE! =======
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restful_task_api');
mongoose.Promise = global.Promise;


let TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    completed: { type: Boolean, default: "false" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

// mongoose.model("User", UserSchema);
// let User = mongoose.model("User");

let Task = mongoose.model("Task", TaskSchema);
// ==============================




// ===== ROUTES! ======
app.get('/tasks', function(req, res) {
    Task.find({}, function(err, tasks) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "loading all tasks", error: err })
        } else {
            // respond with JSON
            res.json({ message: "Success", tasks: tasks })
        }
    })
})

app.post("/tasks", function(req, res) {
    task = new Task(req.body);
    task.save(function(err) {
        if (err) {
            res.json("Error creating new task");
        } else {
            res.json(task);
        }
    })
})

app.put("/tasks/:id", function(req, res) {
    Task.findOne({ _id: req.params.id }, function(err, task) {
        if (err) {
            res.json("Error updating task");
        } else {
            task.set(req.body);
            task.updated_at = Date.now();
            task.save(function(err, task) {
                if (err) {
                    res.json("Error updating task");
                } else {
                    res.json(task);
                }
            })
        };
    });
})

app.delete("/task/id", function(req, res) {
    Task.remove({ _id: req.params.id }, function(err) {
        if (err) {
            res.json("Error removing task");
        } else {
            res.json("Successfully deleted task");
        }
    })
})

app.get("/tasks/:id", function(req, res) {
    Task.findOne({ _id: req.params.id }, function(err, task) {
        if (err) {
            res.json("Error loading the task")
        } else {
            res.json(task);
        }
    })
})

// ======================




// ==== SERVER LISTENER! =======
app.listen(8000, function() {
    console.log("Express on port 8000!")
});
// =============================
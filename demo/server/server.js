const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request body

const PORT = 4000;
const DBCONNET = "mongodb://localhost:27017";
let db;

const connectDB = async () => {
    try {
        const client = new MongoClient(DBCONNET);
        await client.connect();
        db = client.db("Registration_Form");
        console.log("✅ Database Connected Successfully:", db.databaseName);
    } catch (error) {
        console.error("❌ Database Connection Error:", error);
        process.exit(1);
    }
};


app.get("/getStudent", async (req, res) => {
    try {
        console.log("Value of db:", db);
        const result = await db.collection("Users").find({}).toArray();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/addStudent", async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!email || !name) {
            return res.status(400).json({ error: "Name and Email are required" });
        }

        const newStudent = { name, email };
        const result = await db.collection("Users").insertOne(newStudent);

        res.status(201).json({ message: "✅ Student added successfully", data: result.insertedId });
    } catch (error) {
        console.error("❌ Error adding student:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const { ObjectId } = require("mongodb"); // Import ObjectId to convert string ID to MongoDB ObjectId

app.delete("/deleteStudent/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.collection("Users").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "✅ Student deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting student:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});

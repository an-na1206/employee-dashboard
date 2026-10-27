import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- Employee Schema & Model ---------------- */
const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    salary: { type: Number, required: true }
  },
  { timestamps: true, versionKey: false }
);

const Employee = mongoose.model('Employee', employeeSchema);

/* ---------------- Employee REST APIs ---------------- */

// GET all employees
app.get('/api/employees', async (req, res) => {
  const employees = await Employee.find().sort({ createdAt: 1 });
  res.status(200).json(employees);
});

// GET a single employee by id
app.get('/api/employees/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid employee id' });
  }
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  res.status(200).json(employee);
});

// POST a new employee
app.post('/api/employees', async (req, res) => {
  const employee = await Employee.create(req.body);
  res.status(201).json(employee);
});

// PUT (update) an employee by id
app.put('/api/employees/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid employee id' });
  }
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  res.status(200).json(employee);
});

// DELETE an employee by id
app.delete('/api/employees/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid employee id' });
  }
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  res.status(200).json({ message: 'Employee deleted successfully' });
});

/* ---------------- Static frontend (dist build) ---------------- */

app.use(express.static(path.join(__dirname, 'dist')));

// Unknown API routes -> 404 JSON, everything else -> React app
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'Route not found' });
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Central error handler
app.use((err, req, res, next) => {
  const status = err.name === 'ValidationError' ? 400 : 500;
  res.status(status).json({ message: err.message });
});

/* ---------------- Server & DB connection ---------------- */

async function seedEmployees() {
  const count = await Employee.estimatedDocumentCount();
  if (count === 0) {
    await Employee.create([
      { name: 'Aarav Sharma', designation: 'Software Developer', location: 'Bengaluru', salary: 850000 },
      { name: 'Priya Nair', designation: 'UI/UX Designer', location: 'Kochi', salary: 620000 },
      { name: 'Rahul Verma', designation: 'Project Manager', location: 'Mumbai', salary: 950000 }
    ]);
  }
}

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is missing. Add it to the .env file and restart the server.');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await seedEmployees();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });

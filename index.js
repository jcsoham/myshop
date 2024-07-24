const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');  // Add this line
const rolesRoutes = require('./routes/rolesRoutes');
const storeRouter = require('./routes/store');
const staffRouter = require('./routes/staff'); // Adjust path as per your project structure
const staffAttendanceRoutes = require('./routes/staffAttendance');
const holidayRoutes = require('./routes/holidayRoutes'); // Add holidayRoutes
const taskRouter = require('./routes/taskRoutes'); // Adjust path as per your project structure
const customerRoutes = require('./routes/customerRoutes');
const visitRoutes = require('./routes/visitRoutes');
const catalogRoutes = require('./routes/catalogRoutes'); // Adjust the path as per your project structure

const PORT = process.env.PORT || 5020;

dotenv.config();
const app = express();

// Middleware
app.use(cors());  // Add this line

app.use(express.json()); // Body parser middleware

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/store', storeRouter); // Connect storeRouter with /api/store prefix

// Routes for roles (new routes for roles)
app.use('/api/roles', rolesRoutes);

// Routes
app.use('/api/staff', staffRouter);

app.use('/api/attendance', staffAttendanceRoutes);

app.use('/api/holidays', holidayRoutes); // Use holidayRoutes for /api/holidays

app.use('/api/tasks', taskRouter); // Connect taskRouter with /api/tasks prefix

app.use('/api/customers', customerRoutes); // Connect customerRoutes with /api/customers prefix

app.use('/api/visits', visitRoutes); // Connect visits routes

app.use('/api/catalog', catalogRoutes); // Mount catalog routes under /api/catalog

// Start server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

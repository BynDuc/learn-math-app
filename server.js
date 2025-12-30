const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const database = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// ============================================
// API ROUTES - EXERCISES
// ============================================

// Get all exercises for a specific module
app.get('/api/exercises/:module', (req, res) => {
    const module = parseInt(req.params.module);

    if (module < 1 || module > 4) {
        return res.status(400).json({ error: 'Invalid module number. Must be 1-4.' });
    }

    const filePath = path.join(__dirname, 'data', `exercises-module${module}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading exercises:', err);
            return res.status(500).json({ error: 'Failed to load exercises' });
        }

        try {
            const exercises = JSON.parse(data);
            res.json(exercises);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).json({ error: 'Failed to parse exercises data' });
        }
    });
});

// Get a specific exercise from a module
app.get('/api/exercises/:module/:id', (req, res) => {
    const module = parseInt(req.params.module);
    const id = parseInt(req.params.id);

    if (module < 1 || module > 4) {
        return res.status(400).json({ error: 'Invalid module number. Must be 1-4.' });
    }

    const filePath = path.join(__dirname, 'data', `exercises-module${module}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to load exercises' });
        }

        try {
            const exercises = JSON.parse(data);
            const exercise = exercises.find(ex => ex.id === id);

            if (!exercise) {
                return res.status(404).json({ error: 'Exercise not found' });
            }

            res.json(exercise);
        } catch (parseErr) {
            res.status(500).json({ error: 'Failed to parse exercises data' });
        }
    });
});

// ============================================
// API ROUTES - STUDENTS
// ============================================

// Create new student
app.post('/api/students', (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Student name is required' });
    }

    database.createStudent(name, (err, studentId) => {
        if (err) {
            console.error('Error creating student:', err);
            return res.status(500).json({ error: 'Failed to create student' });
        }

        res.status(201).json({
            id: studentId,
            name: name,
            message: 'Student created successfully'
        });
    });
});

// Get student by ID
app.get('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);

    database.getStudent(id, (err, student) => {
        if (err) {
            console.error('Error getting student:', err);
            return res.status(500).json({ error: 'Failed to get student' });
        }

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(student);
    });
});

// Get all students
app.get('/api/students', (req, res) => {
    database.getAllStudents((err, students) => {
        if (err) {
            console.error('Error getting students:', err);
            return res.status(500).json({ error: 'Failed to get students' });
        }

        res.json(students);
    });
});

// ============================================
// API ROUTES - RESULTS
// ============================================

// Save exercise result
app.post('/api/results', (req, res) => {
    const { studentId, module, exerciseId, answer, isCorrect } = req.body;

    // Validation
    if (!studentId || !module || !exerciseId || answer === undefined || isCorrect === undefined) {
        return res.status(400).json({
            error: 'Missing required fields: studentId, module, exerciseId, answer, isCorrect'
        });
    }

    database.saveResult(studentId, module, exerciseId, answer, isCorrect, (err, resultId) => {
        if (err) {
            console.error('Error saving result:', err);
            return res.status(500).json({ error: 'Failed to save result' });
        }

        res.status(201).json({
            id: resultId,
            message: 'Result saved successfully'
        });
    });
});

// Get all results for a student
app.get('/api/results/:studentId', (req, res) => {
    const studentId = parseInt(req.params.studentId);

    database.getStudentResults(studentId, (err, results) => {
        if (err) {
            console.error('Error getting results:', err);
            return res.status(500).json({ error: 'Failed to get results' });
        }

        res.json(results);
    });
});

// Get results for a specific module
app.get('/api/results/:studentId/:module', (req, res) => {
    const studentId = parseInt(req.params.studentId);
    const module = parseInt(req.params.module);

    if (module < 1 || module > 4) {
        return res.status(400).json({ error: 'Invalid module number. Must be 1-4.' });
    }

    database.getModuleResults(studentId, module, (err, results) => {
        if (err) {
            console.error('Error getting module results:', err);
            return res.status(500).json({ error: 'Failed to get module results' });
        }

        res.json(results);
    });
});

// ============================================
// API ROUTES - PROGRESS
// ============================================

// Get progress for a specific module
app.get('/api/progress/:studentId/:module', (req, res) => {
    const studentId = parseInt(req.params.studentId);
    const module = parseInt(req.params.module);

    if (module < 1 || module > 4) {
        return res.status(400).json({ error: 'Invalid module number. Must be 1-4.' });
    }

    database.getModuleProgress(studentId, module, (err, progress) => {
        if (err) {
            console.error('Error getting progress:', err);
            return res.status(500).json({ error: 'Failed to get progress' });
        }

        res.json(progress);
    });
});

// Get overall progress for a student
app.get('/api/progress/:studentId', (req, res) => {
    const studentId = parseInt(req.params.studentId);

    database.getOverallProgress(studentId, (err, progress) => {
        if (err) {
            console.error('Error getting overall progress:', err);
            return res.status(500).json({ error: 'Failed to get overall progress' });
        }

        res.json(progress);
    });
});

// ============================================
// ROOT ROUTE
// ============================================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
    console.log('========================================');
    console.log('🎓 Học Toán Vui - Backend Server');
    console.log('========================================');
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📚 API Base URL: http://localhost:${PORT}/api`);
    console.log('========================================');
    console.log('Available endpoints:');
    console.log('  GET  /api/exercises/:module');
    console.log('  GET  /api/exercises/:module/:id');
    console.log('  POST /api/students');
    console.log('  GET  /api/students');
    console.log('  GET  /api/students/:id');
    console.log('  POST /api/results');
    console.log('  GET  /api/results/:studentId');
    console.log('  GET  /api/results/:studentId/:module');
    console.log('  GET  /api/progress/:studentId/:module');
    console.log('  GET  /api/progress/:studentId');
    console.log('========================================');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    database.close();
    process.exit(0);
});

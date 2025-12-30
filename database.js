const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const DB_PATH = path.join(__dirname, 'mathapp.db');

// Initialize database
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('✅ Connected to SQLite database');
        initializeTables();
    }
});

// Initialize database tables
function initializeTables() {
    // Students table
    db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
        if (err) {
            console.error('Error creating students table:', err.message);
        } else {
            console.log('✅ Students table ready');
        }
    });

    // Results table
    db.run(`
    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      module INTEGER NOT NULL,
      exercise_id INTEGER NOT NULL,
      answer TEXT NOT NULL,
      is_correct BOOLEAN NOT NULL,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES students(id)
    )
  `, (err) => {
        if (err) {
            console.error('Error creating results table:', err.message);
        } else {
            console.log('✅ Results table ready');
        }
    });
}

// Database operations
const database = {
    // Create new student
    createStudent: (name, callback) => {
        const sql = 'INSERT INTO students (name) VALUES (?)';
        db.run(sql, [name], function (err) {
            callback(err, this.lastID);
        });
    },

    // Get student by ID
    getStudent: (id, callback) => {
        const sql = 'SELECT * FROM students WHERE id = ?';
        db.get(sql, [id], callback);
    },

    // Get all students
    getAllStudents: (callback) => {
        const sql = 'SELECT * FROM students ORDER BY created_at DESC';
        db.all(sql, [], callback);
    },

    // Save exercise result
    saveResult: (studentId, module, exerciseId, answer, isCorrect, callback) => {
        const sql = `INSERT INTO results (student_id, module, exercise_id, answer, is_correct) 
                 VALUES (?, ?, ?, ?, ?)`;
        db.run(sql, [studentId, module, exerciseId, answer, isCorrect], function (err) {
            callback(err, this.lastID);
        });
    },

    // Get all results for a student
    getStudentResults: (studentId, callback) => {
        const sql = `SELECT * FROM results 
                 WHERE student_id = ? 
                 ORDER BY completed_at DESC`;
        db.all(sql, [studentId], callback);
    },

    // Get results for a specific module
    getModuleResults: (studentId, module, callback) => {
        const sql = `SELECT * FROM results 
                 WHERE student_id = ? AND module = ? 
                 ORDER BY completed_at DESC`;
        db.all(sql, [studentId, module], callback);
    },

    // Get progress statistics for a module
    getModuleProgress: (studentId, module, callback) => {
        const sql = `SELECT 
                  COUNT(*) as total_completed,
                  SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct_count,
                  COUNT(DISTINCT exercise_id) as unique_exercises
                 FROM results 
                 WHERE student_id = ? AND module = ?`;
        db.get(sql, [studentId, module], (err, row) => {
            if (err) {
                callback(err, null);
            } else {
                const percentage = row.total_completed > 0
                    ? Math.round((row.correct_count / row.total_completed) * 100)
                    : 0;
                callback(null, {
                    total_completed: row.total_completed,
                    correct_count: row.correct_count,
                    unique_exercises: row.unique_exercises,
                    percentage: percentage
                });
            }
        });
    },

    // Get overall progress for a student
    getOverallProgress: (studentId, callback) => {
        const sql = `SELECT 
                  module,
                  COUNT(*) as total_completed,
                  SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct_count
                 FROM results 
                 WHERE student_id = ? 
                 GROUP BY module`;
        db.all(sql, [studentId], callback);
    },

    // Close database connection
    close: () => {
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('✅ Database connection closed');
            }
        });
    }
};

module.exports = database;

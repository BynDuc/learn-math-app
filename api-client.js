// API Client for Học Toán Vui Backend
// Base URL for API (adjust if server is running on different port)
const API_BASE = 'http://localhost:3000/api';

const API = {
    // ============================================
    // EXERCISES
    // ============================================

    // Get all exercises for a module
    getExercises: async (module) => {
        try {
            const response = await fetch(`${API_BASE}/exercises/${module}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching exercises:', error);
            throw error;
        }
    },

    // Get a specific exercise
    getExercise: async (module, id) => {
        try {
            const response = await fetch(`${API_BASE}/exercises/${module}/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching exercise:', error);
            throw error;
        }
    },

    // ============================================
    // STUDENTS
    // ============================================

    // Create new student
    createStudent: async (name) => {
        try {
            const response = await fetch(`${API_BASE}/students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating student:', error);
            throw error;
        }
    },

    // Get student by ID
    getStudent: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/students/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching student:', error);
            throw error;
        }
    },

    // Get all students
    getAllStudents: async () => {
        try {
            const response = await fetch(`${API_BASE}/students`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching students:', error);
            throw error;
        }
    },

    // ============================================
    // RESULTS
    // ============================================

    // Save exercise result
    saveResult: async (studentId, module, exerciseId, answer, isCorrect) => {
        try {
            const response = await fetch(`${API_BASE}/results`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId,
                    module,
                    exerciseId,
                    answer,
                    isCorrect
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error saving result:', error);
            throw error;
        }
    },

    // Get all results for a student
    getResults: async (studentId) => {
        try {
            const response = await fetch(`${API_BASE}/results/${studentId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching results:', error);
            throw error;
        }
    },

    // Get results for a specific module
    getModuleResults: async (studentId, module) => {
        try {
            const response = await fetch(`${API_BASE}/results/${studentId}/${module}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching module results:', error);
            throw error;
        }
    },

    // ============================================
    // PROGRESS
    // ============================================

    // Get progress for a specific module
    getModuleProgress: async (studentId, module) => {
        try {
            const response = await fetch(`${API_BASE}/progress/${studentId}/${module}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching module progress:', error);
            throw error;
        }
    },

    // Get overall progress for a student
    getOverallProgress: async (studentId) => {
        try {
            const response = await fetch(`${API_BASE}/progress/${studentId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching overall progress:', error);
            throw error;
        }
    }
};

// Helper function to manage student ID in localStorage
const StudentManager = {
    // Get current student ID from localStorage
    getCurrentStudentId: () => {
        return localStorage.getItem('currentStudentId');
    },

    // Set current student ID
    setCurrentStudentId: (id) => {
        localStorage.setItem('currentStudentId', id);
    },

    // Get current student name
    getCurrentStudentName: () => {
        return localStorage.getItem('currentStudentName');
    },

    // Set current student name
    setCurrentStudentName: (name) => {
        localStorage.setItem('currentStudentName', name);
    },

    // Clear current student
    clearCurrentStudent: () => {
        localStorage.removeItem('currentStudentId');
        localStorage.removeItem('currentStudentName');
    },

    // Check if student is set
    hasCurrentStudent: () => {
        return !!localStorage.getItem('currentStudentId');
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API, StudentManager };
}

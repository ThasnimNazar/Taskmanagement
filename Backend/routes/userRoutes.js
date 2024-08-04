//? ===================================================== User Routes =====================================================

// ===================== Importing necessary modules/files =====================
import express from 'express';



// ===================== Configuring Express Router =====================
const router = express.Router();

import {
    authUser,
    registerUser,
    fetchMyProjects,
    addNewProject,
    addNewToDO,
    checkedStatus,
    MyTodos,
    deleteTodo
} from '../controllers/userController.js';




//? =============================== Routes ===============================


//* ==================== Authentication Routes ====================

router.post('/register', registerUser);

router.post('/Login', authUser);

router.post('/MyProjects',fetchMyProjects)

router.post('/addNewProject',addNewProject)

router.post('/addNewToDO',addNewToDO)

router.post('/checkedStatus',checkedStatus)

router.post('/MyTodos',MyTodos)

router.post('/deleteTodo',deleteTodo)








export default router;
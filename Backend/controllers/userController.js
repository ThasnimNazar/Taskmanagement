//? ===================================================== User Controller =====================================================


// ===================== Importing necessary modules/files =====================
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { Project, Todo } from '../models/projectToDoModel.js';



const authUser = asyncHandler ( async (req, res) => {

    /*
     # Desc: Auth user/set token
     # Route: POST /api/MyToDo/login
    */
     
    const { email, password } = req.body;

    if ( !email || !password ) {

        // If email or password is empty, return error

        res.json({error:"Email or Password is missing in the request, User authentication failed."});

        // throw new Error('Email or Password is missing in the request, User authentication failed.');

    }

    // Find the user in Db with the email and password
    const user = await User.findOne({ email: email});

    let passwordValid = false;
    
    if (user) {

        passwordValid = await user.matchPassword(password);

    }

    if ( passwordValid ) {

        // If user is created, send response back with jwt token


        let registeredUserData = {
            name: user.name,
            email: user.email,
            id:user._id
        }


        res.status(201).json(registeredUserData);

    } 
    
    if( !user || !passwordValid ) {

        // If user or user password is not valid, send error back

        res.json({error:"Invalid Email or Password, User authentication failed."})

        // throw new Error('Invalid Email or Password, User authentication failed.');
    
    }

});



const registerUser = asyncHandler ( async (req, res) => {

    /*
     # Desc: Register new user
     # Route: POST /api/MyToDo/register
    */

    const { userName, email, password } = req.body;

    // Check if user already exist
    const userExists = await User.findOne({ email });

    // If the user already exists, throw an error
    if (userExists) {

        res.json({error:'User already exists'})
        

    }

    // Store the user data to DB if the user dosen't exist already.
    const user = await User.create({
        name: userName,
        email: email,
        password: password
    });

    
    if (user) {

        // If user is created, send response back with jwt token


        const registeredUserData = {
            name: user.name,
            email: user.email,
            id:user._id,
        }

        res.status(201).json(registeredUserData);

    }else {

        // If user was NOT Created, send error back
        res.json({error:'Invalid user data, User registration failed.'})
    
    
    }


});




const fetchMyProjects = asyncHandler( async(req,res)=>{

     /*
     # Desc: fetch Projects 
     # Route: POST /api/MyToDo/fetchMyProject
    */

    const projects = await Project.find({user:req.body.id});
res.json({projects:projects})
})


const addNewProject = asyncHandler( async(req,res)=>{

    /*
     # Desc: add new  Projects 
     # Route: POST /api/MyToDo/addNewProject
    */
      
    const newProject = new Project({
        title: req.body.project,
        user:req.body.id
    })
    await newProject.save();
    const projects = await Project.find({ user:req.body.id})
    res.json({projects:projects})
    })


   const addNewToDO=asyncHandler(async(req,res)=>{

     /*
     # Desc: add new  To Dos 
     # Route: POST /api/MyToDo/addNewToDO
    */

    const newTodo = new Todo({
        description: req.body.description,
        user:req.body.id,
        project:req.body.projectId,
        status: 'pending'
    })
    await newTodo.save();

    const project = await Project.findByIdAndUpdate(
        req.body.projectId, // Project ID
        { $push: { todos: newTodo._id } }, // Push newTodo ID into todos array
        { new: true } // Return the updated project
    )
    const projects = await Project.find({user:req.body.id});
    const todos = await Todo.find({user:req.body.id})

    res.json({projects:projects,todos:todos})
   } )



   const checkedStatus =asyncHandler(async(req,res)=>{

       /*
     # Desc: change Todo status
     # Route: POST /api/MyToDo/checkedStatus
    */

   let  status= req.body.status

   if(status==="pending"){
    status="completed"
   }else{
    status="pending"
   }

    const todo = await Todo.findByIdAndUpdate(req.body.todoId,
    {$set:{status:status}}
    )

    const todos = await Todo.find({user:req.body.id})

    res.json({todos:todos})
   })

   const MyTodos=asyncHandler(async(req,res)=>{
    const todos = await Todo.find({user:req.body.id});
    res.json({todos:todos})
   })

   const deleteTodo =asyncHandler(async(req,res)=>{
    const todo = await Todo.findByIdAndDelete(req.body.todoId)
        const todos = await Todo.find({user:req.body.id})
            res.json({todos:todos})
   })


export {

    authUser,
    registerUser,
    fetchMyProjects,
    addNewProject,
    addNewToDO,
    checkedStatus,
    MyTodos,
    deleteTodo

};
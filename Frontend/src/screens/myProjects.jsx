import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { MDBNavbar, MDBContainer, MDBNavbarBrand, MDBNavbarToggler, MDBNavbarLink, MDBIcon } from 'mdb-react-ui-kit';
import {
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'; // Importing the delete icon

import { logout } from '../slices/authSlice.js';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import AddNewProject from '../components/AddNewProjectModal.jsx';
import AddNewToDO from '../components/AddNewToDoModal.jsx';

function MyProjects() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());

    navigate('/');
  }

  /////////////////////Sidebar Logics/////////////////////

  const [basicActive, setBasicActive] = useState('');
  const [selectedProject, setSelectedProject] = useState('')
  const [myProjects, setMyProjects] = useState([])
  const [todos, setTodos] = useState([])
  const [fetchToggle, setFetchToggle] = useState(false)
  const [checked, setChecked] = useState(false);

  const handleBasicClick = (value, id) => {
    if (value === basicActive) return;
    setBasicActive(value);
    setSelectedProject(id)

  }

  const handleChange = (toDoId, projectId, status) => {
    try {
      axios.post('http://localhost:5000/api/MyToDo/checkedStatus', {
        id: userInfo.id,
        todoId: toDoId,
        projectId: projectId,
        status: status
      }).then((response) => {
        setTodos(response.data.todos);
      });


    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    try {
      axios.post('http://localhost:5000/api/MyToDo/MyProjects', {
        id: userInfo.id
      }).then((response) => {
        setMyProjects(response.data.projects);
      });
      axios.post('http://localhost:5000/api/MyToDo/MyTodos', {
        id: userInfo.id
      }).then((response) => {
        setTodos(response.data.todos)
      })
    } catch (error) {
      console.log(error);
    }
  }, [fetchToggle]);


  ///////////////////////////addNewProject////////////////////

  const handleAddNewProject = async (name) => {

    await axios.post('http://localhost:5000/api/MyToDo/addNewProject', {
      id: userInfo.id,
      project: name
    }).then((response) => {
      setMyProjects(response.data.projects);
    })



  }

  ////////////////////////////addToDo////////////////////////////

  const HandleAddToDo = (description) => {
    axios.post('http://localhost:5000/api/MyToDo/addNewToDO', {
      id: userInfo.id,
      projectId: selectedProject,
      description: description
    }).then((response) => {
      setMyProjects(response.data.projects);
      setTodos(response.data.todos);
    })

  }

  //////////////////////////Delete ToDo Logic ///////////////////

  const handleDelete = (toDoId, projectId, status) => {
    try {
      axios.post('http://localhost:5000/api/MyToDo/deleteTodo', {
        id: userInfo.id,
        todoId: toDoId,
        projectId: projectId,
      }).then((response) => {
        setTodos(response.data.todos);
      });


    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>

      <MDBNavbar expand='lg' light bgColor='white'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>My ToDo's</MDBNavbarBrand>
          <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                {/* <MDBNavbarLink  onClick={"handleAddNewProject"} href='#'>Add New Project</MDBNavbarLink> */}
                <AddNewProject handleAddNewProject={handleAddNewProject} />
              </li>
              <li className='nav-item'>
                <MDBNavbarLink active onClick={handleLogout} href='#'>Logout</MDBNavbarLink>
              </li>
            </ul>
          </div>
        </MDBContainer>
      </MDBNavbar>
      <MDBRow className='py-3' >
        <MDBCol size={4} >
          <MDBListGroup light small >
            <MDBTabs >
              {myProjects?.map((project, index) => {
                return (
                  <MDBListGroupItem action active={basicActive === project.title} noBorders className='px-3'>
                    <MDBTabsItem className="bg-light"   >
                      <MDBTabsLink onClick={() => handleBasicClick(project.title, project._id)}>{project.title}</MDBTabsLink>
                    </MDBTabsItem>
                  </MDBListGroupItem>
                )
              })}

            </MDBTabs>
          </MDBListGroup>
        </MDBCol>

        <MDBCol size={3}>
          <MDBTabsContent>
            {basicActive ? 'Pending' : ""}
            {myProjects?.map((project, index) => {
              return (
                <MDBTabsPane className='py-3' open={basicActive === project.title}>
                  {todos.filter(todo => todo.status === 'pending' && selectedProject === todo.project)
                    ?.map((todo, index) => {
                      return (
                        <>

                          <label htmlFor='controlledCheckbox' className="d-flex align-items-center">
                            <MDBCheckbox
                              id='controlledCheckbox'
                              checked={checked}
                              onChange={() => {
                                handleChange(todo._id, todo.project, todo.status);
                                setChecked(!checked);
                              }}
                            />
                            {todo.description}
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ marginLeft: '20px', color: 'blue', transition: 'color 0.3s', }}
                              onMouseOver={(e) => { e.target.style.color = 'red'; }}
                              onMouseOut={(e) => { e.target.style.color = 'blue'; }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(todo._id, todo.project, todo.status);
                              }}
                            />

                          </label>

                        </>
                      )
                    })}

                </MDBTabsPane>
              )
            })}

          </MDBTabsContent>
        </MDBCol>

        <MDBCol size={3}>
          <MDBTabsContent>
            {basicActive ? 'Completed' : ""}
            {myProjects?.map((project, index) => {
              return (
                <MDBTabsPane className='py-3' open={basicActive === project.title}>

                  {todos.filter(todo => todo.status === 'completed' && selectedProject === todo.project)
                    ?.map((todo, index) => {
                      return (
                        <>


                          <div className="d-flex align-items-center">
                            <>
                              <MDBCheckbox
                                id='controlledCheckbox'
                                checked={todo.status === "completed" ? true : false}
                                onChange={() => {
                                  handleChange(todo._id, todo.project, todo.status)
                                }}
                              />
                              {todo.description}
                            </>

                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ marginLeft: '20px', color: 'blue', transition: 'color 0.3s', }}
                              onMouseOver={(e) => { e.target.style.color = 'red'; }}
                              onMouseOut={(e) => { e.target.style.color = 'blue'; }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(todo._id, todo.project, todo.status);
                              }}
                            />

                          </div>

                        </>
                      )
                    })}
                </MDBTabsPane>
              )
            })}

          </MDBTabsContent>
        </MDBCol>
        <MDBCol size={2}>
          {selectedProject ? < AddNewToDO HandleAddToDo={HandleAddToDo} /> : ""}
        </MDBCol>
      </MDBRow>
    </div>



  )
}

export default MyProjects
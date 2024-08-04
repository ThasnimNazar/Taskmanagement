import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBNavbarLink,
  MDBInput
} from 'mdb-react-ui-kit';

export default function AddNewProject({ handleAddNewProject }) {

  const [projectName, setProjectName] = useState('')
  const handleChange = (e) => {
    setProjectName(e.target.value);
  };
  const addProject = (e) => {
    handleAddNewProject(projectName)
    toggleOpen()
  }

  const [topRightModal, setTopRightModal] = useState(false);

  const toggleOpen = () => setTopRightModal(!topRightModal);

  return (
    <>
      <MDBNavbarLink onClick={toggleOpen} >Add New Project</MDBNavbarLink>

      <MDBModal
        animationDirection='right'
        open={topRightModal}
        tabIndex='-1'
        onClose={() => setTopRightModal(false)}
      >
        <MDBModalDialog position='top-right' side>
          <MDBModalContent>
            <MDBModalHeader className='bg-info text-white'>
              <MDBModalTitle>Add New Project</MDBModalTitle>
              <MDBBtn
                color='none'
                className='btn-close btn-close-white'
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className='row'>
                <div className='col-3 text-center'>
                  <i className='fas fa-clock fa-4x text-info'></i>
                </div>

                <div className='col-9'>
                  <MDBInput wrapperClass='mb-4' label='Project Name' id='formControlLg' type='text' size="lg" value={projectName} onChange={handleChange} />
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn onClick={addProject} color='info'>Add</MDBBtn>
              <MDBBtn outline color='info' onClick={toggleOpen}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
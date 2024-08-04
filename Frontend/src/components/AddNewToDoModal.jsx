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
  MDBInput
} from 'mdb-react-ui-kit';

export default function AddNewToDO({ HandleAddToDo }) {

  const [description, setDescription] = useState('')
  const handleChange = (e) => {
    setDescription(e.target.value);
  };
  const addNewToDo = (e) => {
    HandleAddToDo(description)
    toggleOpen()
  }

  const [topRightModal, setTopRightModal] = useState(false);

  const toggleOpen = () => setTopRightModal(!topRightModal);

  return (
    <>
      <MDBBtn onClick={toggleOpen}>Add New ToDO</MDBBtn>

      <MDBModal
        animationDirection='right'
        open={topRightModal}
        tabIndex='-1'
        onClose={() => setTopRightModal(false)}
      >
        <MDBModalDialog position='top-right' side>
          <MDBModalContent>
            <MDBModalHeader className='bg-info text-white'>
              <MDBModalTitle>Add New ToDO</MDBModalTitle>
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
                  <MDBInput wrapperClass='mb-4' label='Description' id='formControlLg' type='text' size="lg" value={description} onChange={handleChange} />
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn onClick={addNewToDo} color='info'>Add</MDBBtn>
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
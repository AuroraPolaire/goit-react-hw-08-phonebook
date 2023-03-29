import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  ModalBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { editContact } from 'redux/contacts/contactsOperations';
import { selectItems } from 'redux/contacts/selectors';
// import PropTypes from 'prop-types'

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.number().required('Required'),
});

const EditContactModal = ({ isOpen, onClose, id }) => {
  const contacts = useSelector(selectItems);
  const contactToEdit = contacts.filter(contact => contact.id === id);

  // console.log(id);
  const dispatch = useDispatch();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit contact</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              name: contactToEdit[0]?.name,
              number: contactToEdit[0]?.number,
            }}
            validationSchema={RegisterSchema}
            onSubmit={values => {
              dispatch(editContact({ id, values }));
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <FormControl mt={4}>
                  <FormLabel>
                    Name
                    <Field
                      as={Input}
                      isInvalid={errors.name && touched.name}
                      errorBorderColor="red.300"
                      type="name"
                      name="name"
                    ></Field>
                    {errors.name && touched.name ? (
                      <ErrorMessage name="name" component="div" />
                    ) : null}
                  </FormLabel>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>
                    Number
                    <Field
                      as={Input}
                      isInvalid={errors.number && touched.number}
                      errorBorderColor="red.300"
                      type="number"
                      name="number"
                    ></Field>
                    {errors.number && touched.number ? (
                      <ErrorMessage name="number" component="div" />
                    ) : null}
                  </FormLabel>
                </FormControl>
                <Button
                  type="submit"
                  mt={8}
                  mr={3}
                  disabled={isSubmitting}
                  onClick={onClose}
                >
                  Change
                </Button>
                <Button type="button" mt={8} mr={3} onClick={onClose}>
                  Close
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

// EditContactModal.propTypes = {}

export default EditContactModal;

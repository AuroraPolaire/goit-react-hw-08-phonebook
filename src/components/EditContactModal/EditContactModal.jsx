import React from 'react';
import { Formik, Form, Field } from 'formik';

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
  FormErrorMessage,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { editContact } from 'redux/contacts/contactsOperations';
import { selectItems } from 'redux/contacts/selectors';
import { EditSchema } from 'components/validation/validation';
import PropTypes from 'prop-types';

const EditContactModal = ({ isOpen, onClose, id }) => {
  const contacts = useSelector(selectItems);
  const contactToEdit = contacts.filter(contact => contact.id === id);

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
            validationSchema={EditSchema}
            onSubmit={values => {
              dispatch(editContact({ id, values }));
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <FormControl mt={4} isInvalid={errors.name && touched.name}>
                  <FormLabel>
                    Name
                    <Field
                      as={Input}
                      errorBorderColor="red.300"
                      type="text"
                      name="name"
                      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    ></Field>
                    {errors.name && touched.name ? (
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    ) : null}
                  </FormLabel>
                </FormControl>
                <FormControl mt={4} isInvalid={errors.number && touched.number}>
                  <FormLabel>
                    Number
                    <Field
                      as={Input}
                      errorBorderColor="red.300"
                      type="tel"
                      name="number"
                    ></Field>
                    {errors.number && touched.number ? (
                      <FormErrorMessage>{errors.number}</FormErrorMessage>
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

EditContactModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default EditContactModal;

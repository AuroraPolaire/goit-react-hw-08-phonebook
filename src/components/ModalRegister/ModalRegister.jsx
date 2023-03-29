import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { register } from 'redux/auth/operations';
import { useDispatch } from 'react-redux';
import { RegisterSchema } from 'components/validation/validation';

import PropTypes from 'prop-types';

const ModalRegister = ({ onClose, isOpen }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const dispatch = useDispatch();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Register new user</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={RegisterSchema}
            onSubmit={values => {
              dispatch(register(values));
              onClose();
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <FormControl>
                  <FormLabel>
                    Name
                    <Field
                      as={Input}
                      isInvalid={errors.name && touched.name}
                      errorBorderColor="red.300"
                      type="name"
                      name="name"
                      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    ></Field>
                    {errors.name && touched.name ? (
                      <ErrorMessage name="name" component="div" />
                    ) : null}
                  </FormLabel>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>
                    E-mail
                    <Field
                      as={Input}
                      isInvalid={errors.name && touched.name}
                      errorBorderColor="red.300"
                      type="email"
                      name="email"
                    ></Field>
                    {errors.email && touched.email ? (
                      <ErrorMessage name="email" component="div" />
                    ) : null}
                  </FormLabel>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>
                    Password
                    <InputGroup size="md">
                      <Field
                        as={Input}
                        isInvalid={errors.name && touched.name}
                        errorBorderColor="red.300"
                        type={show ? 'text' : 'password'}
                        name="password"
                      ></Field>
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && touched.password ? (
                      <ErrorMessage name="password" component="div" />
                    ) : null}
                  </FormLabel>
                </FormControl>
                <ModalFooter>
                  <Button type="submit" mr={3} disabled={isSubmitting}>
                    Submit
                  </Button>
                  <Button type="button " onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

ModalRegister.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default ModalRegister;

import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  FormErrorMessage,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { register } from 'redux/auth/operations';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterSchema } from 'components/validation/validation';

import PropTypes from 'prop-types';
import { selectIsLogging } from 'redux/auth/selectors';

const ModalRegister = ({ onClose, isOpen }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogging = useSelector(selectIsLogging);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={() => {
        navigate('/');
        isLogging ? navigate('/contacts') : navigate('/');
      }}
    >
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
                <FormControl isInvalid={errors.name && touched.name}>
                  <FormLabel>
                    Name
                    <Field
                      as={Input}
                      errorBorderColor="red.300"
                      type="text"
                      name="name"
                    ></Field>
                    {errors.name && touched.name ? (
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    ) : null}
                  </FormLabel>
                </FormControl>
                <FormControl mt={4} isInvalid={errors.email && touched.email}>
                  <FormLabel>
                    E-mail
                    <Field
                      as={Input}
                      errorBorderColor="red.300"
                      type="email"
                      name="email"
                    ></Field>
                    {errors.email && touched.email ? (
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    ) : null}
                  </FormLabel>
                </FormControl>
                <FormControl
                  mt={4}
                  isInvalid={errors.password && touched.password}
                >
                  <FormLabel>
                    Password
                    <InputGroup size="md">
                      <Field
                        as={Input}
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
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
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
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ModalRegister;

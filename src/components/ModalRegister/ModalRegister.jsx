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
import * as Yup from 'yup';
import { register } from 'redux/auth/operations';
import { useDispatch } from 'react-redux';

// import PropTypes from 'prop-types';
const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

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
              console.log(values);
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

// ModalRegister.propTypes = {};

export default ModalRegister;

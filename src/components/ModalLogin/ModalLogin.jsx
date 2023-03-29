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
import { logIn } from 'redux/auth/operations';
import { useDispatch } from 'react-redux';
// import PropTypes from 'prop-types'

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const ModalLogin = ({ onClose, isOpen }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const dispatch = useDispatch();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log in</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={RegisterSchema}
              onSubmit={values => {
                dispatch(logIn(values));
                onClose();
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
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
                      Log in
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
    </>
  );
};

// ModalLogin.propTypes = {}

export default ModalLogin;

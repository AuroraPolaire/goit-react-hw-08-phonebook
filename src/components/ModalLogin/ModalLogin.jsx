import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from 'redux/auth/operations';
import { useDispatch } from 'react-redux';
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
import { LoginSchema } from 'components/validation/validation';
import PropTypes from 'prop-types';

const ModalLogin = ({ onClose, isOpen }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log in</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              navigate('/');
              onClose();
            }}
          />
          <ModalBody pb={6}>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={values => {
                dispatch(logIn(values))
                  .unwrap()
                  .then(data => navigate('/contacts'))
                  .catch(error => navigate('/'));
                onClose();
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
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
                      Log in
                    </Button>
                    <Button
                      type="button "
                      onClick={() => {
                        navigate('/');
                        onClose();
                      }}
                    >
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

ModalLogin.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ModalLogin;

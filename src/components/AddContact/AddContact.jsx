import React from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  FormErrorMessage,
} from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/contactsOperations';
import { EditSchema } from 'components/validation/validation';
import { selectItems } from 'redux/contacts/selectors';

export const AddContact = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectItems);

  const checkIfContactExists = ({ name, number }) => {
    return contacts.some(
      contact => contact.name === name || contact.number === number
    );
  };

  return (
    <>
      <Accordion allowToggle>
        <AccordionItem p={4}>
          <h2>
            <AccordionButton w="400px" margin="auto">
              <Box as="span" flex="1" textAlign="left">
                Add new contact
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel p={4} w="400px" margin="auto">
            <Formik
              initialValues={{ name: '', number: '' }}
              validationSchema={EditSchema}
              onSubmit={(values, { resetForm }) => {
                const contactExists = checkIfContactExists(values);
                !contactExists
                  ? dispatch(addContact(values))
                  : toast.error('Such contact already exists');
                resetForm({ name: '', number: '' });
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
                      ></Field>
                      {errors.name && touched.name ? (
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                      ) : null}
                    </FormLabel>
                  </FormControl>
                  <FormControl
                    mt={4}
                    isInvalid={errors.number && touched.number}
                  >
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
                  <Button type="submit" mr={3} disabled={isSubmitting}>
                    Add
                  </Button>
                </Form>
              )}
            </Formik>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

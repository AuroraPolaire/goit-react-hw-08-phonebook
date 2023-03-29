import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/contacts/contactsOperations';
import { RegisterSchema } from 'components/validation/validation';

export const AddContact = () => {
  const dispatch = useDispatch();
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
              validationSchema={RegisterSchema}
              onSubmit={(values, { resetForm }) => {
                dispatch(addContact(values));
                resetForm({ name: '', number: '' });
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

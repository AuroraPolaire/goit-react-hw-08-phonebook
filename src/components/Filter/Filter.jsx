import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { filterContacts } from 'redux/contacts/contactsSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Heading as="h2" p="4" size="md" textAlign="center">
        Find contacts by name
      </Heading>
      <Flex align="center" justify="center">
        <InputGroup w="400px">
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="gray.300" />}
          />
          <Input
            width="400px"
            type="text"
            placeholder="Contact name"
            size="md"
            variant="filled"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={e =>
              dispatch(filterContacts(e.target.value.toLowerCase()))
            }
          ></Input>
        </InputGroup>
      </Flex>
    </>
  );
};

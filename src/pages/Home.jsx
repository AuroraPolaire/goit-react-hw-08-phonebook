import {
  Box,
  Heading,
  List,
  ListIcon,
  ListItem,
  Divider,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import React from 'react';

const Home = () => {
  return (
    <>
      <Box maxW="32rem" m="auto" pt="50px">
        <Heading mb={4}>Welcome to your personal phonebook</Heading>
        <Divider mb={4} />
        <List spacing={5}>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.500" />
            Private and secure app.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.500" />
            Store all your contacts in one place.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.500" />
            Easily search people by name.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.500" />
            Edit or delete existing contacts.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.500" />
            Dark or Light mode.
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default Home;

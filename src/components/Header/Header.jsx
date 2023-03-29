import React from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Spacer,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from 'redux/auth/selectors';
import { logOut } from 'redux/auth/operations';
import ModalLogin from 'components/ModalLogin/ModalLogin';
import ModalRegister from 'components/ModalRegister/ModalRegister';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    onOpen: onRegisterOpen,
    isOpen: isRegisterOpen,
    onClose: onCloseRegister,
  } = useDisclosure();
  const {
    onOpen: onLoginOpen,
    isOpen: isLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const isRegistered = useSelector(selectIsLoggedIn);
  const getUser = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <header>
      <Flex
        as="div"
        minWidth="max-content"
        alignItems="center"
        gap="4"
        padding="3"
        boxShadow="base"
      >
        <IconButton
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        >
          {colorMode === 'light' ? 'Dark' : 'Light'}
        </IconButton>

        {!isRegistered ? (
          <NavLink to="/">
            <Button colorScheme="gray" variant="outline">
              Home
            </Button>
          </NavLink>
        ) : (
          <NavLink to="/contacts">
            <Button colorScheme="gray" variant="outline">
              Contacts
            </Button>
          </NavLink>
        )}
        <Spacer />
        {!isRegistered ? (
          <>
            <NavLink to="/login">
              <Button
                colorScheme="gray"
                variant="outline"
                onClick={onLoginOpen}
              >
                Log In
              </Button>
            </NavLink>
            <NavLink to="/register">
              <Button
                colorScheme="gray"
                variant="outline"
                onClick={onRegisterOpen}
              >
                Register
              </Button>
            </NavLink>
          </>
        ) : (
          <>
            <Flex>
              <Avatar name={getUser.name} />
              <Box ml="3">
                <Text fontWeight="bold"> {getUser.name}</Text>
                <Text fontSize="sm">{getUser.email}</Text>
              </Box>
            </Flex>
            <NavLink to="/logout">
              <Button
                onClick={() => dispatch(logOut())}
                colorScheme="gray"
                variant="outline"
              >
                Log out
              </Button>
            </NavLink>
          </>
        )}
      </Flex>
      <ModalRegister isOpen={isRegisterOpen} onClose={onCloseRegister} />
      <ModalLogin isOpen={isLoginOpen} onClose={onLoginClose} />
    </header>
  );
};

export default Header;

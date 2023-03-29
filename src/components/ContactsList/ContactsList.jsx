import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/contactsOperations';
import {
  selectedContacts,
  selectIsLoading,
  selectItems,
} from 'redux/contacts/selectors';
import {
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  useDisclosure,
} from '@chakra-ui/react';
import EditContactModal from 'components/EditContactModal/EditContactModal';

const ContactsList = () => {
  const dispatch = useDispatch();
  const [contactId, setContactId] = useState('');
  const contacts = useSelector(selectItems);
  const isLoading = useSelector(selectIsLoading);
  const filteredContacts = useSelector(selectedContacts);
  const {
    onOpen: onEditOpen,
    isOpen: isEditOpen,
    onClose: onCloseEdit,
  } = useDisclosure();

  return (
    <>
      <TableContainer>
        <Table variant="simple" display="flex" justifyContent="center">
          <Tbody>
            {isLoading === false &&
              contacts.length !== 0 &&
              filteredContacts.map(({ id, name, number }) => {
                return (
                  <Tr key={id}>
                    <Td>{name}</Td>
                    <Td>{number}</Td>
                    <Td>
                      <Button
                        mr={5}
                        id={id}
                        onClick={e => {
                          setContactId(e.target.id);
                          onEditOpen();
                        }}
                      >
                        Edit
                      </Button>
                      <Button onClick={() => dispatch(deleteContact(id))}>
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>

      <EditContactModal
        isOpen={isEditOpen}
        onClose={onCloseEdit}
        id={contactId}
      />
    </>
  );
};

export default ContactsList;

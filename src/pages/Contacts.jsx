import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heading } from '@chakra-ui/react';
import ContactsList from 'components/ContactsList/ContactsList';
import SkeletonBox from 'components/Skeleton/Skeleton';
import { fetchContacts } from 'redux/contacts/contactsOperations';
import { selectIsLoading } from 'redux/contacts/selectors';
import { AddContact } from 'components/AddContact/AddContact';
import { Filter } from 'components/Filter/Filter';

const Contacts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Heading as="h1" size="lg" textAlign="center" p="4">
        My Contacts Book
      </Heading>
      <AddContact />
      <Filter />
      {!isLoading ? <ContactsList /> : <SkeletonBox />}
    </>
  );
};

export default Contacts;

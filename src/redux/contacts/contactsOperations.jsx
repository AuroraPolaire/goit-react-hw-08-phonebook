import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

// Get contacts

export const fetchContacts = createAsyncThunk(
  'contacts/fetch',
  async (_, thunkApi) => {
    try {
      const result = await axios.get('/contacts');
      return result.data;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

//Add contacts

export const addContact = createAsyncThunk(
  'contacts/add',
  async (data, thunkApi) => {
    try {
      const contact = await axios.post('/contacts', data);
      return contact.data;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

// Edit contact

export const editContact = createAsyncThunk(
  'contacts/edit',
  async ({ id, values }, thunkApi) => {
    // console.log(data);
    try {
      const result = await axios.patch(`/contacts/${id}`, { ...values });
      return result.data;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

// Delete contact

export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (id, thunkApi) => {
    try {
      const { data } = await axios.delete(`/contacts/${id}`);
      return data;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

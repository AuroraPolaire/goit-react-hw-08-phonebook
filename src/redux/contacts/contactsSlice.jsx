import { createSlice } from '@reduxjs/toolkit';

import {
  addContact,
  deleteContact,
  editContact,
  fetchContacts,
} from './contactsOperations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null, filter: '' },
  reducers: {
    filterContacts(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      // GET
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      // DELETE
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addCase(deleteContact.rejected, handleRejected)
      // ADD
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)

      // Edit
      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.items.forEach(item => {
          if (item.id === action.payload.id) {
            return (
              (item.name = action.payload.name),
              (item.number = action.payload.number)
            );
          }
        });
      })
      .addCase(editContact.rejected, handleRejected),
});

export const { filterContacts } = contactsSlice.actions;
export const сontactsReducer = contactsSlice.reducer;

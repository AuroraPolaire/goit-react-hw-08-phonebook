import axios from 'axios';
import toast from 'react-hot-toast';

import { createAsyncThunk } from '@reduxjs/toolkit';
// import userEvent from '@testing-library/user-event';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

// Saving token
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Removing JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Register user

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkApi) => {
    try {
      const result = await axios.post('/users/signup', credentials);
      setAuthHeader(result.data.token);
      return result.data;
    } catch (error) {
      toast.error('Such user already exists');
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

//Log in user

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials, thunkAPI) => {
    try {
      const result = await axios.post('/users/login', credentials);
      setAuthHeader(result.data.token);
      return result.data;
    } catch (error) {
      toast.error('Wrong e-mail or password.');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// LogOut user

export const logOut = createAsyncThunk('auth/logOut', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Refresh user

export const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) return thunkAPI.rejectWithValue();

    setAuthHeader(persistedToken);

    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

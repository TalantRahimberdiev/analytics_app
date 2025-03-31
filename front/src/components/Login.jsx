import axios from 'axios';
import { Badge, Divider, Button } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  setFormData,
  setError,
  setIsLoading,
  setSuccessMessage,
  setUsername,
} from '../rtk/authentication_slice';

import { useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.authentication.isLoading);
  const error = useSelector((state) => state.authentication.error);
  const formData = useSelector((state) => state.authentication.formData);

  const handleChange = (e) => {
    dispatch(
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      }),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    dispatch(setIsLoading(true));

    try {
      const response = await axios.post(
        '',
        formData,
      );
      dispatch(setSuccessMessage('Login Successful!'));
      dispatch(setUsername(response.data.username));
      localStorage.setItem('accessToken', response.data.tokens.access);
      localStorage.setItem('refreshToken', response.data.tokens.refresh);
      navigate('bank_tariff/');
    } catch (error) {
      dispatch(setError('Error!'));
      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach((field) => {
          const errorMessages = error.response.data[field];
          if (errorMessages && errorMessages.length > 0) {
            setError(errorMessages[0]);
          }
        });
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div>
      <Divider
        my="lg"
        color={'dark'}
        label={
          <Badge color={'dark'} variant="filled">
            Вводное
          </Badge>
        }
        labelPosition="center"
      />
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form>
        <br />
        <input
          style={{
            width: '300px',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
          }}
          placeholder="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        ></input>{' '}
        <br />
        <br />
        <input
          style={{
            width: '300px',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
          }}
          placeholder="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        ></input>{' '}
        <br />
        <br />
        <Button
          mt={'lg'}
          variant="outline"
          color="green"
          style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </form>
    </div>
  );
}

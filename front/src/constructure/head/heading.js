import {
  MediaQuery,
  Burger,
  useMantineTheme,
  Image,
  Badge,
  Text,
} from '@mantine/core';
import {
  setUsername,
  setLoggedIn,
  setSuccessMessage,
  setFormData,
} from '../../rtk/authentication_slice';
import { useMediaQuery } from '@mantine/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { changeBurger } from '../../rtk/burger_slice';
import { useEffect } from 'react';
import logo from '../../public/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Heading() {
  const theme = useMantineTheme();
  const matches = useMediaQuery('(min-width: 700px)');
  const dispatch = useDispatch();
  const opened = useSelector((state) => state.burger.opened);
  const navigate = useNavigate();

  const username = useSelector((state) => state.authentication.username);
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(
            'http://10.30.18.4:8000/api/user/',
            config,
          );
          dispatch(setLoggedIn(true));
          dispatch(setUsername(response.data.username));
        } else {
          dispatch(setLoggedIn(false));
          dispatch(setUsername(''));
        }
      } catch (error) {
        dispatch(setLoggedIn(false));
        dispatch(setUsername(''));
        navigate('/');
      }
    };
    checkLoggedInUser();
  }, []);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (accessToken && refreshToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        await axios.post(
          'http://10.30.18.4:8000/api/logout/',
          { refresh: refreshToken },
          config,
        );
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setLoggedIn(false));
        dispatch(setUsername(null));
        dispatch(setSuccessMessage(null));
        dispatch(setFormData({ email: '', password: '' }));
        console.log('Log out successful!');
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to logout', error.response?.data || error.message);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'space-around',
      }}
    >
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Burger
          opened={opened}
          onClick={() => dispatch(changeBurger())}
          size="sm"
          color={theme.colors.gray[6]}
          mr={'5px'}
        />
      </MediaQuery>

      <Image width={50} height={50} src={logo} alt="logo" />

      <h4
        style={{
          flexGrow: 8,
          textAlign: 'center',
          color: 'black',
        }}
        size={'sm'}
      >
        {matches && `Ввод данных о тарифах конкурентов`}
      </h4>
      {isLoggedIn && (
        <>
          <Text mr={'md'} fw={500} color={'cyan.9'} size={'sm'}>
            {username}
          </Text>
          <Badge
            color="green"
            variant="light"
            style={{ textDecoration: 'underline' }}
            onClick={() => handleLogout()}
          >
            Log out
          </Badge>
        </>
      )}
    </div>
  );
}

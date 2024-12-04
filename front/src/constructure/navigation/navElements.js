import { Box, NavLink } from '@mantine/core';
import navData from './navData';
import uuid from 'react-uuid';
import { useLocation } from 'react-router-dom';

export default function NavElements() {
  const location = useLocation();

  const navElements = navData.map((item) => (
    <div key={uuid()}>
      <NavLink
        variant="subtle"
        component={'a'}
        href={`/${item.link}`}
        label={item.label}
        style={
          location.pathname.match(`/${item.link}`)
            ? {
                fontStyle: 'italic',
                textDecoration: 'underline',
                color: 'tomato',
              }
            : { fontStyle: 'italic', textDecoration: 'underline' }
        }
      />
    </div>
  ));

  return <Box>{navElements}</Box>;
}

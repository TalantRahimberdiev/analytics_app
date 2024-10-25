
import { AppShell, useMantineTheme } from '@mantine/core';
import { Provider } from 'react-redux'
import { store } from '../rtk/store'

import MainNav from './navigation/mainNav';
import MainHead from './head/mainHead';
import MainFoot from './foot/mainFoot';

import Glavka from '../components/Glavka';

export default function App_Shell() {

   const theme = useMantineTheme()

   return (
      <Provider store={store}>
         <AppShell
            styles={{
               main: {
                  background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
               },
            }}
            navbarOffsetBreakpoint="sm" asideOffsetBreakpoint="sm"
            header={<MainHead />}
            navbar={<MainNav />}
            footer={<MainFoot />}
         >
            <Glavka />

         </AppShell>

      </Provider>

   )
}
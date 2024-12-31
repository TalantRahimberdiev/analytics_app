import { AppShell, useMantineTheme } from '@mantine/core';
import MainNav from './navigation/mainNav';
import MainHead from './head/mainHead';
import MainFoot from './foot/mainFoot';
import Glavka from '../components/Glavka';

export default function AppShellComponent() {
  const theme = useMantineTheme();

  return (
    <>
      {localStorage.getItem('accessToken') && (
        <AppShell
          styles={{
            main: {
              background: theme.colors.gray[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          header={<MainHead />}
          navbar={<MainNav />}
          footer={<MainFoot />}
        >
          <Glavka />
        </AppShell>
      )}
    </>
  );
}

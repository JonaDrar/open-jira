import { Box } from '@mui/material';
import Head from 'next/head';
import { FC } from 'react';
import { SideBar } from '../ui';
import { NavBar } from '../ui';

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const Layout: FC<Props> = ({ title = 'Open Jira - App', children }) => {
  return (
    <Box
      sx={{
        flexFlow: 1,
      }}
    >
      <Head>
        <title>{title}</title>
      </Head>

      <NavBar />

      <SideBar />

      <Box
        sx={{
          padding: '10px 20px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

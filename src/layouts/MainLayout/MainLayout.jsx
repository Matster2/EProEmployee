import { Box } from '@mui/material';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header 
        onMenuClick={() => setSidebarOpen(((value) => !value))}
      />
      <Sidebar
        open={sidebarOpen}
        setSidebarOpen={() => setSidebarOpen(false)}
      />

      <Box sx={{ mt: 2 }}>
        <Outlet />
      </Box>
    </>
  );
};
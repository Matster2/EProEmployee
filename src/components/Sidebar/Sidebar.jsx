import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const SidebarListOption = ({ title }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href="#simple-list">
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  )
}
export default ({ open, onClose }) => {
  return (
    
    <Drawer
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          marginTop: 'var(--header-height)',
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <List>
        <SidebarListOption
          title="Home"
        />
        <SidebarListOption
          title="My Orders"
        />
        <SidebarListOption
          title="Account Settings"
        />
        <SidebarListOption
          title="Categories"
        />
      </List>
    </Drawer>
  )
}
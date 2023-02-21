import { useContext } from 'react';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts'];

export const SideBar = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
      <Box sx={{ padding: '5px 10px' }}>
        <Typography variant="h4">Menú</Typography>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} button>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} button>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
        <ListItem
          button
          onClick={closeSideMenu}
          sx={{ justifyContent: 'center' }}
        >
          <CloseOutlinedIcon />
        </ListItem>
      </Box>
    </Drawer>
  );
};

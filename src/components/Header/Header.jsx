import {
  Menu as MenuIcon
} from '@mui/icons-material';
import { Icon, Stack } from "@mui/material";
import BasketIcon from 'assets/icons/basket.svg';

import styles from './Header.module.css';

export default ({ onMenuClick }) => {

  return (
    <Stack
      sx={{ px: 2 }}
      className={styles.header}
      direction="row"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack
        direction="row"
        display="flex"
        alignItems="center"
      >
        <MenuIcon 
          className={styles.icon}
          onClick={onMenuClick}
        />
      </Stack>
      
      <Stack
        direction="row"
        gap={2}
        display="flex"
        alignItems="center"
      >        
        <Icon className={styles.icon}>
          <img style={{ padding: '3px' }} src={BasketIcon} alt="filter" />
        </Icon>
        {/* <SearchIcon className={styles.icon} /> */}
      </Stack>
    </Stack>
  )
};
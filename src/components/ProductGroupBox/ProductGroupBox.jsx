import {
  Inventory as BoxIcon
} from '@mui/icons-material';
import { Button, Stack, Typography } from "@mui/material";

import styles from './ProductGroupBox.module.css';

export default ({ title, onClick }) => {

  return (
    <Button
      fullWidth
      variant="contained"
      sx={{ p: 2 }}
      onClick={onClick}
    >
      <Stack
        alignItems="center"
        gap={1}
      >
        <BoxIcon className={styles.icon} />
        <Typography className={styles.title}>{title}</Typography>
      </Stack>
    </Button>
  )
};
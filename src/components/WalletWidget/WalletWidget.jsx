import { Box, Stack, Typography } from "@mui/material";

import styles from './WalletWidget.module.css';

export default ({}) => {

  return (
    <Box
      sx={{ p: 2, mb: 1 }}
      className={styles.box}
    >
      <Stack
        alignItems="center"
        gap={1}
      >        
        <Typography className={styles.title}>
          Your Balance: 
          <span className={styles.points}> 200</span>
          <span className={styles.title}> points</span>
        </Typography>
        <Typography className={styles.title}>100 points are set to expire on the 23/12/2023</Typography>

      </Stack>
    </Box>
  )
};
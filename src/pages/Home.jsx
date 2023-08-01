import { Box, Container, Grid } from "@mui/material";
import ProductGroupBox from "components/ProductGroupBox";
import WalletWidget from "components/WalletWidget";
import { useState } from "react";

import promoImage from 'assets/promo.png';

export default () => {

  const [productGroups] = useState([
    {
      "title": "Clothing",
    },
    {
      "title": "Footwear",
    },
    {
      "title": "Gloves",
    },
    {
      "title": "Headwear",
    },
  ])

  return (
    <Container>
      <WalletWidget />

      <Box>
        <img style={{ width: '100%' }} src={promoImage} />
      </Box>


      <Grid container spacing={1}>
        {productGroups.map(productGroup => (  
          <Grid item xs={6} sm={4} md={2} lg={1}>      
            <ProductGroupBox
              title={productGroup.title}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
import React, { useState } from 'react';
import { Box, Container, makeStyles, Card } from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [searchCustomer, setSearchCustomer] = useState('');
  const search = '%' + searchCustomer + '%';

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Toolbar
          searchCustomer={searchCustomer}
          searchCustomerChange={event => setSearchCustomer(event.target.value)}
        />
        <Box mt={3}>
          <Card></Card>
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;

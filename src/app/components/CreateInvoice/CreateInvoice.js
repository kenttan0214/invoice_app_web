import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const CreateInvoice = () => {
  // const { classes } = props;
  return (
    <Card>
      <CardContent>
        <Typography component="h2" variant="headline"> Welcome </Typography>
        <TextField
          id="date"
          label="Birthday"
          type="date"
          defaultValue="2017-05-24"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </CardContent>
    </Card>
  );
};

CreateInvoice.propTypes = {
  classes: PropTypes.object
};

export default CreateInvoice;

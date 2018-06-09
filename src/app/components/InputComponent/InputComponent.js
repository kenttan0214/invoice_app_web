import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withFormik } from 'formik';

const InputComponent = (props) => {
  return (
    <div>
      <TextField
        {...props}
      />
    </div>
  );
};

InputComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withFormik(InputComponent);

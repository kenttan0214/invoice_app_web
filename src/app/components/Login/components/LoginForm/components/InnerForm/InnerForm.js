import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { grid } from 'commonStyles';

// Our inner form component which receives our form's state and updater methods as props
const InnerForm = ({
  classes,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit}>
    <TextField
      fullWidth
      label="User Name"
      margin="normal"
      type="email"
      name="email"
      autoComplete="email"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
    />
    {touched.email && errors.email && <div>{errors.email}</div>}
    <TextField
      fullWidth
      label="Password"
      margin="normal"
      type="password"
      name="current-password"
      autoComplete="current-password"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
    />
    {touched.password && errors.password && <div>{errors.password}</div>}
    <Button
      className={classes.loginButton}
      color="primary"
      variant="raised"
      type="submit"
      disabled={isSubmitting}
    > Login </Button>
  </form>
);

InnerForm.propTypes = {
  classes: PropTypes.object,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
};

export default withStyles({
  loginButton: {
    marginTop: grid.hr * 2
  }
})(InnerForm);

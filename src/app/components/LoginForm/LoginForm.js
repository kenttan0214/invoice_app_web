import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const LoginForm = (props) => {
    const { classes } = props;

    return (
        <div>
            <div>
                <TextField
                    fullWidth
                    id="username-input"
                    label="User Name"
                    margin="normal"
                    type="text"
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    id="password-input"
                    label="Password"
                    margin="normal"
                    type="password"
                />
            </div>
            <Button className={classes.loginBtn} color="primary" variant="raised"> Login </Button>
        </div>
    );
};

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles({
    loginBtn: {
        marginTop: 30
    }
})(LoginForm);

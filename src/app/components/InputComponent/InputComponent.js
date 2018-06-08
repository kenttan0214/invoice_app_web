import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const InputComponent = (props) => {
    const { classes, onChange, onBlur, type, id, value} = props;

    const handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        onChange('topics', value);
    };
    const handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        onBlur('topics', true);
    };
    return (
        <div>
            <TextField
                fullWidth
                id={id}
                margin="normal"
                onBlur={handleBlur}
                onChange={handleChange}
                type={type}
                value={value}
            />
        </div>
    );
};

InputComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles()(InputComponent);

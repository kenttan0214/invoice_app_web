import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const mapStateToProps = state => {
    return {};
};

const CreateInvoice = (props) => {
    const { classes } = props;
    return (
        <Card>
            <CardContent>
                <Typography component="h2" variant="headline"> Welcome </Typography>
            </CardContent>
        </Card>
    );
};

CreateInvoice.propTypes = {
    classes: PropTypes.object
};

export default connect(mapStateToProps)(CreateInvoice);

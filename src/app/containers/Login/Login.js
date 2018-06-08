import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LoginForm from 'LoginForm/LoginForm';

const mapStateToProps = state => {
    return {
        routing: state.routing,
        name: state.name
    };
};

const Login = (props) => {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} component="h2" variant="headline"> Welcome </Typography>
                <Typography color="textSecondary"> Sign in to continue </Typography>
                <LoginForm />
            </CardContent>
        </Card>
    );
};

Login.propTypes = {
    classes: PropTypes.object
};

export default connect(mapStateToProps)(withStyles({
    title: {
        fontSize: '1.5rem',
    },
    card: {
        maxWidth: '390px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '45px 45px 33px'
    }
})(Login));

import React from 'react';
import PropTypes from 'prop-types';
import Header from 'Header/Header';
import { withStyles } from '@material-ui/core/styles';
import { grid } from 'commonStyles';

const Main = (props) => {
    const { classes, children } = props;
    return (
        <div>
            <Header/>
            <div className={classes.container}>
                {children}
            </div>
        </div>
    );
};

Main.propTypes = {
    classes: PropTypes.object,
    children: PropTypes.node
};

export default withStyles({
    container: {
        maxWidth: grid.maxWidth,
        margin:' 0 auto',
        padding: grid.vr * 2
    }
})(Main);

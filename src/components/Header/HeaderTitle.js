import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import headerStyles from './HeaderStyles';

const HeaderTitle = ({ classes }) => <div className={classes.headerTitle}>Collection</div>;

HeaderTitle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(headerStyles)(HeaderTitle);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';

import Picture from './Picture';
import CollectionStyles from './CollectionStyles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiGridList: {
      root: {
        width: '1300px',
        maxHeight: '600px',
      },
    },
  },
});

const PictureList = ({ classes, pictures, handleBlurContent }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.collectionContainer}>
        {
          <GridList spacing={20} cols={5} cellHeight={100}>
            {pictures.map((picture) => {
              return (
                <GridListTile col={5} key={picture.id}>
                  <Picture picture={picture} handleBlurContent={handleBlurContent} />
                </GridListTile>
              );
            })}
          </GridList>
        }
      </div>
    </MuiThemeProvider>
  );
};

PictureList.propTypes = {
  classes: PropTypes.object.isRequired,
  handleBlurContent: PropTypes.func,
  pictures: PropTypes.array,
};

export default withStyles(CollectionStyles)(PictureList);

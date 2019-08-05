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

class PictureList extends React.Component {
  state = {
    isShown: false,
  };

  showPictureDetails = () => {
    this.setState({
      isShown: !this.state.isShown,
    });
  };

  render() {
    const { classes, pictures, handleBlurContent } = this.props;

    if (this.props && pictures) {
      return (
        <MuiThemeProvider theme={theme}>
          <div className={classes.collectionContainer}>
            {
              <GridList spacing={20} cols={5} cellHeight={100}>
                {pictures.map((picture) => {
                  return (
                    <GridListTile col={5} key={picture.id}>
                      <Picture
                        onClick={() => this.showPictureDetails}
                        picture={picture}
                        handleBlurContent={handleBlurContent}
                      />
                    </GridListTile>
                  );
                })}
              </GridList>
            }
          </div>
        </MuiThemeProvider>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

PictureList.propTypes = {
  classes: PropTypes.object.isRequired,
  handleBlurContent: PropTypes.func,
  pictures: PropTypes.array,
};

export default withStyles(CollectionStyles)(PictureList);

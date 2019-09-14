import React, { useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Popover from '@material-ui/core/Popover';
import PictureDetailsPopUp from './PictureDetailsPopUp';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import CollectionStyles from './CollectionStyles';
import CollectionContext from '../../context/collection-context';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiPopover: {
      paper: {
        top: '50% !important',
        left: '50% !important',
        width: '800px',
        height: '470px',
        marginLeft: '-400px',
        marginTop: '-300px',
      },
    },
  },
});

const initialState = {
  isHovered: false,
  anchorEl: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'HOVER_ON':
      return { ...state, isHovered: true };
    case 'HOVER_OUT':
      return { ...state, isHovered: false };
    case 'OPEN_POP_UP':
      return { ...state, anchorEl: action.currentTarget };
    case 'CLOSE_POP_UP':
      return { ...state, anchorEl: null };
    default:
      return initialState;
  }
};

const Picture = ({ classes, picture }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const context = useContext(CollectionContext);

  const pictureTitle = state.isHovered ? classes.titleIsVisible : classes.titleIsHidden;
  const image = picture.hasImage ? (
    <img src={picture.headerImage.url} alt={picture.title} className={classes.pictureImage} />
  ) : (
    <div className={classes.noImage}>No image</div>
  );

  const handleOpenPopUp = (event) => {
    dispatch({ type: 'OPEN_POP_UP', currentTarget: event.currentTarget });
    context.handleBlurContent();
  };

  const handleClosePopUp = () => {
    dispatch({ type: 'CLOSE_POP_UP' });
    context.handleBlurContent();
  };

  return (
    <React.Fragment>
      <div
        variant="contained"
        className={classes.pictureContainer}
        onClick={(event) => handleOpenPopUp(event)}
        onMouseEnter={() => dispatch({ type: 'HOVER_ON' })}
        onMouseLeave={() => dispatch({ type: 'HOVER_OUT' })}
      >
        {image}
        <GridListTileBar className={pictureTitle} title={picture.longTitle} />
      </div>

      <MuiThemeProvider theme={theme}>
        <Popover
          open={Boolean(state.anchorEl)}
          anchorEl={state.anchorEl}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <PictureDetailsPopUp picture={picture} handleClosePictureDetails={handleClosePopUp} />
        </Popover>
      </MuiThemeProvider>
    </React.Fragment>
  );
};

Picture.propTypes = {
  classes: PropTypes.object.isRequired,
  picture: PropTypes.object,
  handleBlurContent: PropTypes.func,
  onClick: PropTypes.func,
};

export default withStyles(CollectionStyles)(Picture);

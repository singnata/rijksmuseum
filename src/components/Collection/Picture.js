import React from 'react';
import PropTypes from 'prop-types';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Popover from '@material-ui/core/Popover';
import Popup from './PictureDetailsPopUp';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import CollectionStyles from './CollectionStyles';

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

class Picture extends React.Component {
  state = {
    isHovered: false,
    anchorEl: null,
    setAnchorEl: null,
  };

  hadleHoverOn = () => {
    this.setState({
      isHovered: true,
    });
  };

  hadleHoverOut = () => {
    this.setState({
      isHovered: false,
    });
  };

  handleClosePictureDetails = () => {
    this.props.handleBlurContent(false);
    this.setState({
      anchorEl: null,
    });
  };

  handleClickOnPicture = (event) => {
    this.props.handleBlurContent(true);
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  render() {
    const { classes, picture } = this.props;
    const { anchorEl, isHovered } = this.state;

    const pictureTitle = isHovered ? classes.titleIsVisible : classes.titleIsHidden;
    const open = Boolean(anchorEl);
    const id = open ? 'picture-details-pop-up' : null;
    const image = picture.hasImage ? (
      <img src={picture.headerImage.url} alt={picture.title} className={classes.pictureImage} />
    ) : (
      <div className={classes.noImage}>No image</div>
    );

    return (
      <React.Fragment>
        <div
          aria-describedby={id}
          variant="contained"
          className={classes.pictureContainer}
          onClick={this.handleClickOnPicture}
          onMouseEnter={this.hadleHoverOn}
          onMouseLeave={this.hadleHoverOut}
        >
          {image}
          <GridListTileBar className={pictureTitle} title={picture.longTitle} />
        </div>

        <MuiThemeProvider theme={theme}>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
          >
            <Popup picture={picture} handleClosePictureDetails={this.handleClosePictureDetails} />
          </Popover>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

Picture.propTypes = {
  classes: PropTypes.object.isRequired,
  picture: PropTypes.object,
  handleBlurContent: PropTypes.func,
  onClick: PropTypes.func,
};

export default withStyles(CollectionStyles)(Picture);

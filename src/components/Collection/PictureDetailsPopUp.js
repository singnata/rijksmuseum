import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import CollectionStyles from './CollectionStyles';

class PictureDetailsPopUp extends React.Component {
  render() {
    const { classes, picture, handleClosePictureDetails } = this.props;
    const isThereProductionPlace = picture.productionPlaces && picture.productionPlaces.length > 0;
    const productionPlace = isThereProductionPlace
      ? picture.productionPlaces.map((item, index) => {
          return <span key={index}>{item} </span>;
        })
      : null;
    const pictureMaker = picture.principalOrFirstMaker && (
      <div>
        <span>Principal or first maker: </span>
        {picture.principalOrFirstMaker}
      </div>
    );
    const image = picture.hasImage ? (
      <div className={classes.pictureImageContainer}>
        <img src={picture.headerImage.url} alt={picture.title} />
      </div>
    ) : (
      <div className={classes.noImage}>No image</div>
    );

    return (
      <div className={classes.pictureDetailsContainer}>
        {image}
        <div>{picture.longTitle}</div>
        {pictureMaker}
        <div>
          <span>Object number: </span>
          {picture.objectNumber}
        </div>
        <div>
          {isThereProductionPlace ? <span>Production place: </span> : null}
          <span>{productionPlace}</span>
        </div>
        <div className={classes.buttonsContainer}>
          <div className={`${classes.button} ${classes.seeMoreButton}`}>
            <Link to={`/picture/${picture.objectNumber}`} target="_blank">
              View more details
            </Link>
          </div>
          <div className={`${classes.button} ${classes.closeButton}`}>
            <button type="submit" onClick={() => handleClosePictureDetails()}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

PictureDetailsPopUp.propTypes = {
  classes: PropTypes.object.isRequired,
  picture: PropTypes.object,
  handleClosePictureDetails: PropTypes.func,
};

export default withStyles(CollectionStyles)(PictureDetailsPopUp);

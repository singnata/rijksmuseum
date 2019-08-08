import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

import pictureDetailsStyles from './PictureDetailsStyles';

class PictureDetails extends React.Component {
  state = { picture: null };

  componentDidMount() {
    this.getPictureDetails();
  }

  getPictureDetails = () => {
    const objectNumber = this.props.match.params.objectNumber;
    const getPictureDetailsEndpoint = `https://community-rijksmuseum.p.rapidapi.com/en/collection/${objectNumber}?key=nMG7xRY4&format=json`;

    fetch(getPictureDetailsEndpoint, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'b48c4540ccmshee96167b8da23f3p109699jsnf8fe38cb12ae',
      },
    })
      .then((response) => response.json())
      .then((picture) => {
        this.setState({
          picture,
        });
      })
      .catch((error) => {
        this.setState({
          error,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    const { isLoading, error, picture } = this.state;
    const { classes } = this.props;

    const image =
      picture && picture.artObject.hasImage ? (
        <div className={classes.pictureImageContainer}>
          <img src={picture.artObject.webImage.url} alt={picture.title} />
        </div>
      ) : (
        <div className={classes.noImage}>No image</div>
      );

    if (isLoading) {
      return <CircularProgress className={classes.progress} color="secondary" />;
    } else if (error) {
      return <div>Sorry. There is an error {error}.</div>;
    } else {
      return (
        <div className={classes.pictureDetailsContainer}>
          {picture && (
            <div>
              {image}
              <div className={classes.pictureInfo}>
                <span className={classes.title}>Title: </span> {picture.artObject.longTitle}
              </div>
              <div className={classes.pictureInfo}>
                <span className={classes.title}>Description: </span> {picture.artObject.description}
              </div>
              <div className={classes.pictureInfo}>
                <span className={classes.title}>Principal or first maker: </span>
                {picture.artObject.principalOrFirstMaker}
              </div>
              <div className={classes.pictureInfo}>
                <span className={classes.title}>Materials: </span>
                {picture.artObject.materials &&
                  picture.artObject.materials.length !== 0 &&
                  picture.artObject.materials.map((material, index) => {
                    return <span key={index}>{material} </span>;
                  })}
              </div>
              <div className={classes.pictureInfo}>
                <span className={classes.title}>Dating: </span>
                {picture.artObject.dating.presentingDate}
              </div>
              <div className={classes.pictureInfo}>
                <span className={classes.title}>Object types: </span>
                {picture.artObject.objectTypes &&
                  picture.artObject.objectTypes.length !== 0 &&
                  picture.artObject.objectTypes.map((objectType, index) => {
                    return (
                      <span key={index}>
                        <Link to={`/${objectType}`} target="_blank">
                          {objectType}
                        </Link>
                      </span>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      );
    }
  }
}

pictureDetailsStyles.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(pictureDetailsStyles)(PictureDetails);

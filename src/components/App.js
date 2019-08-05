import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

import Header from './Header/HeaderTitle';
import PictureList from './Collection/PictureList';
import Search from './Header/Search';
import Pagination from './Pagination/Pagination';

const styles = () => ({
  progress: {
    margin: '10% 50%',
  },
  isBlurred: {
    filter: 'blur(2px)',
  },
});

class App extends React.Component {
  state = {
    error: null,
    collection: [],
    isLoading: false,
    pageNumber: 1,
    pageSize: 50,
    queryParam: '',
    orderByParam: '',
    shouldMainContentBeBlurred: false,
  };

  componentDidMount() {
    this.getCollection();
  }

  handleBlurContent = (value) => {
    this.setState({
      shouldMainContentBeBlurred: value,
    });
  };

  getCollection = () => {
    this.setState({
      isLoading: true,
    });

    const baseUrl = 'https://community-rijksmuseum.p.rapidapi.com/en/collection?key=nMG7xRY4&format=json&';
    const getCollectionEndpoint = `${baseUrl}ps=${this.state.pageSize}&p=${this.state.pageNumber}&s=${
      this.state.orderByParam
    }&q=${this.state.queryParam}`;

    fetch(getCollectionEndpoint, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'b48c4540ccmshee96167b8da23f3p109699jsnf8fe38cb12ae',
      },
    })
      .then((response) => response.json())
      .then((collection) => {
        const picturesCount = collection.count > 10000 ? 10000 : collection.count;
        const pageCount = Math.round(picturesCount / this.state.pageSize);
        this.setState({
          collection,
          pageCount,
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

  onChangePageNumber = (pageNumber) => {
    this.setState({ pageNumber }, () => this.getCollection());
  };

  onChangePageSize = (pageSize) => {
    this.setState(
      {
        pageSize,
      },
      () => this.getCollection()
    );
  };

  resetQueryParam = () => {
    this.setState({ queryParam: '', pageNumber: 1 }, () => this.getCollection());
  };

  updateQueryParam = (queryParam) => {
    this.setState({ queryParam });
  };

  getCollectionByQueryParam = () => {
    this.setState({ pageNumber: 1, pageSize: 50 }, () => this.getCollection());
  };

  getCollectionByOrderParam = (orderByParam) => {
    this.setState({ orderByParam, pageNumber: 1, pageSize: 50 }, () => this.getCollection());
  };

  render() {
    const {
      shouldMainContentBeBlurred,
      collection,
      isLoading,
      error,
      queryParam,
      orderByParam,
      pageNumber,
      pageSize,
      pageCount,
    } = this.state;

    const blurMainContent = shouldMainContentBeBlurred ? this.props.classes.isBlurred : null;
    const isThereCollection = collection.artObjects && collection.artObjects.length !== 0 && !isLoading;

    if (isLoading) {
      return <CircularProgress className={this.props.classes.progress} color="secondary" />;
    } else if (error) {
      return <div>Sorry. There is an error {error}.</div>;
    } else {
      return (
        <div className={blurMainContent}>
          <Header />
          <Search
            getCollectionByQueryParam={this.getCollectionByQueryParam}
            resetQueryParam={this.resetQueryParam}
            queryParam={queryParam}
            updateQueryParam={this.updateQueryParam}
            getCollectionByOrderParam={this.getCollectionByOrderParam}
            orderByParam={orderByParam}
          />
          {isThereCollection ? (
            <PictureList handleBlurContent={this.handleBlurContent} pictures={collection.artObjects} />
          ) : (
            <div className="no-found">No art object could be found by your query</div>
          )}
          <Pagination
            pageNumber={pageNumber}
            onChangePageNumber={this.onChangePageNumber}
            pageCount={pageCount}
            onChangePageSize={this.onChangePageSize}
            pageSize={pageSize}
          />
        </div>
      );
    }
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

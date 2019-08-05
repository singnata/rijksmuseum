import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import headerStyles from './HeaderStyles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiListItem: {
      root: {
        fontFamily: 'inherit !important',
      },
    },
    MuiInputBase: {
      root: {
        fontFamily: 'inherit',
      },
    },
  },
});

class Search extends React.Component {
  state = {
    open: false,
  };

  onChangeOrderByInput = (event) => {
    event.preventDefault();
    this.props.getCollectionByOrderParam(event.target.value);
  };

  handleCloseSelect = () => {
    this.setState({ open: false });
  };

  handleOpenSelect = () => {
    this.setState({ open: true });
  };

  onChangeSearchInput = (event) => {
    event.preventDefault();
    this.props.updateQueryParam(event.target.value);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.getCollectionByQueryParam();
  };

  sortCollection = (event) => {
    event.preventDefault();
    this.props.sortCollection();
  };

  resetQueryParam = (event) => {
    event.preventDefault();
    this.props.resetQueryParam();
  };

  render() {
    const { classes, orderByParam, queryParam } = this.props;

    return (
      <div className={classes.searchContainer}>
        <div className={classes.orderByFormContainer}>
          <form autoComplete="off">
            <MuiThemeProvider theme={theme}>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.inputLabel} htmlFor="filter">
                  Order by:
                </InputLabel>
                <Select
                  open={this.state.open}
                  onClose={this.handleCloseSelect}
                  onOpen={this.handleOpenSelect}
                  value={orderByParam}
                  onChange={this.onChangeOrderByInput}
                  inputProps={{
                    id: 'filter',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="relevance">Relevance</MenuItem>
                  <MenuItem value="objecttype">Object type</MenuItem>
                  <MenuItem value="chronologic">Chronologic</MenuItem>
                  <MenuItem value="achronologic">Achronologic</MenuItem>
                  <MenuItem value="artist">Artist</MenuItem>
                  <MenuItem value="artistdesc">Artist desc</MenuItem>
                </Select>
              </FormControl>
            </MuiThemeProvider>
          </form>
        </div>
        <div className={classes.queryParamFormContainer}>
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <input
              placeholder="Search keyword..."
              onChange={(event) => this.onChangeSearchInput(event)}
              value={queryParam}
            />
            <button type="button" className={classes.clearButton} onClick={(event) => this.resetQueryParam(event)}>
              <ClearIcon />
            </button>
            <Button className={classes.searchButton} type="submit">
              Search
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  getCollectionByQueryParam: PropTypes.func,
  resetQueryParam: PropTypes.func,
  getCollectionByOrderParam: PropTypes.func,
  updateQueryParam: PropTypes.func,
  orderByParam: PropTypes.string,
  queryParam: PropTypes.string,
};

export default withStyles(headerStyles)(Search);

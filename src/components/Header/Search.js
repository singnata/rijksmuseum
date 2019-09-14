import React, { useReducer, useEffect } from 'react';
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

const initialState = {
  isOrderByListOpened: false,
  searchQueryParam: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CLOSE_SELECT_LIST':
      return { ...state, isOrderByListOpened: false };
    case 'OPEN_SELECT_LIST':
      return { ...state, isOrderByListOpened: true };
    case 'CHANGE_SEARCH_INPUT':
      return { ...state, searchQueryParam: action.searchQueryParam };
    default:
      return initialState;
  }
};

const Search = ({
  classes,
  orderByParam,
  queryParam,
  updateQueryParam,
  getCollectionOrderByParam,
  getCollectionBySearchQueryParam,
  resetSearchQueryParam,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    updateQueryParam(state.searchQueryParam);
  }, [state.searchQueryParam]);

  const onChangeOrderByInput = (event) => {
    event.preventDefault();
    getCollectionOrderByParam(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getCollectionBySearchQueryParam();
  };

  const handleResetSearchQueryParam = (event) => {
    event.preventDefault();
    resetSearchQueryParam();
  };

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
                open={state.isOrderByListOpened}
                onClose={() => {
                  dispatch({ type: 'CLOSE_SELECT_LIST' });
                }}
                onOpen={() => {
                  dispatch({ type: 'OPEN_SELECT_LIST' });
                }}
                value={orderByParam}
                onChange={(event) => onChangeOrderByInput(event)}
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
        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            placeholder="Search keyword..."
            onChange={(event) => {
              dispatch({ type: 'CHANGE_SEARCH_INPUT', searchQueryParam: event.target.value });
            }}
            value={queryParam}
          />
          <button type="button" className={classes.clearButton} onClick={(event) => handleResetSearchQueryParam(event)}>
            <ClearIcon />
          </button>
          <Button className={classes.searchButton} type="submit">
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

/* class Search extends React.Component {
  state = {
    isOrderByListOpened: false,
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
                  open={this.state.isOrderByListOpened}
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
            <button type="button" className={classes.clearButton} onClick={(event) => this.resetSearchQueryParam(event)}>
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
} */

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  resetSearchQueryParam: PropTypes.func,
  getCollectionByOrderParam: PropTypes.func,
  updateQueryParam: PropTypes.func,
  orderByParam: PropTypes.string,
  queryParam: PropTypes.string,
};

export default withStyles(headerStyles)(Search);

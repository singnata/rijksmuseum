import React, { useReducer } from 'react';
import ReactPaginate from 'react-paginate';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';

import paginationStyles from './PaginationStyles';

const initialState = {
  isPageSizeListOpened: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CLOSE_PAGE_SIZE_SELECT':
      return { ...state, isPageSizeListOpened: false };
    case 'OPEN_PAGE_SIZE_SELECT':
      return { ...state, isPageSizeListOpened: true };
    default:
      return initialState;
  }
};

const Pagination = ({ classes, pageCount, pageNumber, pageSize, onChangePageSize, onChangePageNumber }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event) => {
    event.preventDefault();
    onChangePageSize(event.target.value);
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    onChangePageNumber(selectedPage);
  };

  return (
    <React.Fragment>
      {pageCount > 1 && (
        <div className={classes.footerContainer}>
          <div className={classes.pageSizeContainer}>
            <form autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="page-size">Page size</InputLabel>
                <Select
                  open={state.isPageSizeListOpened}
                  onClose={() => {
                    dispatch({ type: 'CLOSE_PAGE_SIZE_SELECT' });
                  }}
                  onOpen={() => {
                    dispatch({ type: 'OPEN_PAGE_SIZE_SELECT' });
                  }}
                  value={pageSize}
                  onChange={handleChange}
                  inputProps={{
                    id: 'page-size',
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </FormControl>
            </form>
          </div>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={classes.paginationContainer}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            forcePage={pageNumber - 1}
            pageCount={pageCount}
          />
        </div>
      )}
    </React.Fragment>
  );
};

Pagination.propTypes = {
  classes: PropTypes.object.isRequired,
  onChangePageNumber: PropTypes.func,
  onChangePageSize: PropTypes.func,
  pageCount: PropTypes.number,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
};

export default withStyles(paginationStyles)(Pagination);

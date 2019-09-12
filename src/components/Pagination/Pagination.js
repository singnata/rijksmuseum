import React from 'react';
import ReactPaginate from 'react-paginate';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';

import paginationStyles from './PaginationStyles';

class Pagination extends React.Component {
  state = {
    isPageSizeListOpened: false,
  };

  handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    this.props.onChangePageNumber(selectedPage);
  };

  handleCloseSelect = () => {
    this.setState({ isPageSizeListOpened: false });
  };

  handleOpenSelect = () => {
    this.setState({ isPageSizeListOpened: true });
  };

  handleChange = (event) => {
    event.preventDefault();
    this.props.onChangePageSize(event.target.value);
  };

  render() {
    const { classes, pageCount, pageNumber, pageSize } = this.props;

    return (
      <div className={classes.footerContainer}>
        {pageCount > 1 && (
          <React.Fragment>
            <div className={classes.pageSizeContainer}>
              <form autoComplete="off">
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="page-size">Page size</InputLabel>
                  <Select
                    open={this.state.isPageSizeListOpened}
                    onClose={this.handleCloseSelect}
                    onOpen={this.handleOpenSelect}
                    value={pageSize}
                    onChange={this.handleChange}
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
              onPageChange={this.handlePageClick}
              containerClassName={classes.paginationContainer}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
              forcePage={pageNumber - 1}
              pageCount={pageCount}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

Pagination.propTypes = {
  classes: PropTypes.object.isRequired,
  onChangePageNumber: PropTypes.func,
  onChangePageSize: PropTypes.func,
  pageCount: PropTypes.number,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
};

export default withStyles(paginationStyles)(Pagination);

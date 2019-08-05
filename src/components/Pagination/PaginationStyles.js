export default () => ({
  footerContainer: {
    margin: '30px auto',
    display: 'flex',
    maxWidth: '1280px',
  },
  paginationContainer: {
    flex: '3',
    listStyleType: 'none',
    textAlign: 'center',
    '& li': {
      color: 'black',
      float: 'left',
      padding: '8px 16px',
      textDecoration: 'none',
      '&.active': {
        borderRadius: '5px',
        backgroundColor: '#f5f6f4',
      },
      '&.disabled': {
        opacity: '0.5',
        cursor: 'initial',
        '& a': {
          cursor: 'initial',
        },
      },
      '& a': {
        cursor: 'pointer',
        outline: 'none',
      },
    },
  },
  pageSizeContainer: {
    flex: '1',
    '& label, & div': {
      fontFamily: 'inherit',
    },
  },
  button: {
    display: 'block',
  },
  formControl: {
    minWidth: 120,
  },
});

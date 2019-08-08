export default () => ({
  headerTitle: {
    margin: '30px auto',
    fontSize: '35px',
    width: '250px',
    textAlign: 'center',
  },
  searchButton: {
    fontFamily: 'inherit',
    borderRadius: '10px',
  },
  formControl: {
    minWidth: 300,
    fontFamily: 'inherit',
  },
  inputLabel: {
    fontFamily: 'inherit',
  },
  clearButton: {
    cursor: 'pointer',
    outline: 'none',
    backgroundColor: 'inherit',
    border: 'none',
    top: '4px',
    right: '70px',
    position: 'absolute',
  },
  searchContainer: {
    margin: '10px auto 20px',
    maxWidth: '1280px',
    display: 'flex',
  },
  orderByFormContainer: {
    flex: '1',
  },
  queryParamFormContainer: {
    position: 'relative',
    marginTop: '12px',
    '& input': {
      fontFamily: 'inherit',
      width: '300px',
      padding: '5px 10px',
      fontSize: '16px',
      borderRadius: '10px',
      border: '1px solid grey',
      display: 'inline-block',
      '&:focus': {
        outline: 'none',
      },
    },
  },
});

export default () => ({
  collectionContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  titleIsHidden: {
    display: 'none',
  },
  titleIsVisible: {
    display: 'flex',
    cursor: 'pointer',
    '& div': { fontSize: '10px', whiteSpace: 'normal', lineHeight: '13px' },
  },
  pictureImage: {
    height: '104px',
  },
  pictureContainer: {
    cursor: 'pointer'
  },
  noImage: {
    padding: '15px 20px',
    transform: 'rotate(-13deg)',
    color: '#bbb',
    textAlign: 'center',
    fontSize: '31px',
  },
  pictureDetailsContainer: {
    margin: '30px',
    marginTop: '0',
    marginBottom: '0',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  pictureImageContainer: {
    width: '100%',
    '& img': {
      width: '100%',
      height: 'auto',
    },
  },

  buttonsContainer: {
    marginTop: '20px',
  },
  button: {
    display: 'inline-block',
    '&:hover, & button:hover': {
      backgroundColor: '#ccc',
      color: '#fff',
      transform: 'scale(1.1)',
      boxShadow:
        '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
      border: '1px solid #ccc',
      transition: 'opacity 336ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 224ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  },
  seeMoreButton: {
    border: '1px solid #000',
    borderRadius: '10px',
    cursor: 'pointer',
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
      display: 'inline-block',
      padding: '13px 40px',
    },
  },
  closeButton: {
    float: 'right',
    '& button': {
      outline: 'none',
      font: 'inherit',
      width: '100%',
      border: '1px solid #000',
      borderRadius: '10px',
      padding: '13px 50px',
      cursor: 'pointer',
    },
  },
});

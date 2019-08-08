export default () => ({
  pictureDetailsContainer: {
    margin: '50px 200px',
  },
  pictureImageContainer: {
    width: '600px',
    float: 'left',
    marginRight: '50px',

    '& img': {
      width: '100%',
      height: 'auto',
    },
  },
  noImage: {
    padding: '15px 20px',
    transform: 'rotate(-13deg)',
    color: '#bbb',
    textAlign: 'center',
    fontSize: '31px',
  },
  title: {
    fontSize: '18px',
    fontWeight: '900',
    marginRight: '10px'

  },
  pictureInfo: {
    marginBottom: '12px',

  }
});

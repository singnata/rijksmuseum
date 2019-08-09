export const getCollectionService = (getCollectionEndpoint) => {
  return fetch(getCollectionEndpoint, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b48c4540ccmshee96167b8da23f3p109699jsnf8fe38cb12ae',
    },
  }).then((response) => response.json());
};

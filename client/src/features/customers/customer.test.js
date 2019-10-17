import reducer from './reducers';
import * as actionTypes from './types';

describe('customer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ "customers": null, "didSearch": false, "loading": false })
  })

  it('should store customer records after fetching data from the server', () => {
    expect(reducer({
        error: false,
        loading: false,
        didSearch: false        
      },
      {
        type: actionTypes.FETCH_LIST_COMPLETED,
        payload: {
          records: []
        }
      })
    ).toEqual({
      error: false,
      loading: false,
      didSearch: false,
      customers: []
    })
  })
})
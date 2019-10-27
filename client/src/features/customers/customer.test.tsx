import { customerReducer as reducer } from "./reducers";
import { customerActionNameTypes } from "./types";

describe("customer reducer", () => {
  fit("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual({
      customers: null,
      didSearch: false,
      loading: false,
      searchedRecords: null
    });
  });

  it("should store customer records after fetching data from the server", () => {
    expect(
      reducer(
        {
          error: false,
          loading: false,
          didSearch: false
        },
        {
          type: customerActionNameTypes.FETCH_LIST_COMPLETED,
          payload: {
            records: []
          }
        }
      )
    ).toEqual({
      error: false,
      loading: false,
      didSearch: false,
      customers: []
    });
  });
});

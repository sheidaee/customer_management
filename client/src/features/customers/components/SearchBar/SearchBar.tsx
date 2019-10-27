import React, { useState } from "react";
import { useDispatch } from "../../../../hooks/react-redux.hooks";
import { Button, Card, Elevation } from "@blueprintjs/core";

import DateInputField from "../../../../components/DateInputField";
import TextField from "../../../../components/TextField";
import { customerOperations } from "../../";
import SearchField from "./SearchField";
import { IProps, UseSearch } from "./types";

import Styles from "./SearchBar.module.scss";
import Fieldset from "../../../../components/Fieldset";

export function SearchBar({ loading, customerRecords }: IProps) {
  const dispatch = useDispatch();

  const [first, last, birthday, handleChange] = useSearch();

  const searchHandler = () => {
    dispatch(
      customerOperations.searchCustomer({
        customerRecords,
        first,
        last,
        birthday
      })
    );
  };

  return (
    <Card elevation={Elevation.ONE} className={Styles.SearchBar}>
      <h5>Advanced Search</h5>
      <Fieldset disabled={loading} aria-busy={loading}>
        <div className={Styles.formRow}>
          <SearchField
            caption="First name:"
            Field={TextField}
            value={first}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value, "first")
            }
          />
          <SearchField
            caption="Last name:"
            Field={TextField}
            value={last}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value, "last")
            }
          />
          <SearchField
            caption="Birthday:"
            Field={DateInputField}
            value={birthday}
            handleChange={(v: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(v, "birthday")
            }
          />
        </div>
        <div className={Styles.actionBar}>
          <Button onClick={searchHandler} disabled={loading}>
            Search
          </Button>
        </div>
      </Fieldset>
    </Card>
  );
}

function useSearch(): UseSearch {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [birthday, setBirthday] = useState(null);

  const mapFieldsToFn: any = {
    first: setFirst,
    last: setLast,
    birthday: setBirthday
  };

  function handleSearch(value: any, fieldName: string) {
    mapFieldsToFn[fieldName](value);
  }

  return [first, last, birthday, handleSearch];
}

export default SearchBar;

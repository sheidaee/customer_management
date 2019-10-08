import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, Elevation } from "@blueprintjs/core";

import DateInputField from "../../components/UI/DateInputField";
import TextField from "../../components/UI/TextField";
import { customerOperations } from "../../../state/ducks/customer";

import Styles from "./SearchBar.module.scss";
import SearchField from "./SearchField/SearchField";

function SearchBar({ loading, customerRecords }: any) {
  const dispatch = useDispatch();

  const [firstName, lastName, birthday, handleChange] = useSearch();

  const searchHandler = () => {
    dispatch(
      customerOperations.searchCustomer(
        customerRecords,
        firstName as string,
        lastName as string,
        birthday as string
      )
    );
  };

  return (
    <Card elevation={Elevation.ONE} className={Styles.SearchBar}>
      <h5>Advanced Search</h5>
      <div className={Styles.formRow}>
        <SearchField
          caption="First name:"
          Field={TextField}
          value={firstName}
          handleChange={(e: any) => handleChange(e.target.value, "firstName")}
        />
        <SearchField
          caption="Last name:"
          Field={TextField}
          value={lastName}
          handleChange={(e: any) => handleChange(e.target.value, "lastName")}
        />
        <SearchField
          caption="Birthday:"
          Field={DateInputField}
          value={birthday}
          handleChange={(v: any) => handleChange(v, "birthday")}
        />
      </div>
      <div className={Styles.actionBar}>
        <Button onClick={searchHandler} disabled={loading}>
          Search
        </Button>
      </div>
    </Card>
  );
}

function useSearch(): any[] {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState(null);

  const mapFieldsToFn: any = {
    firstName: setFirstName,
    lastName: setLastName,
    birthday: setBirthday
  };

  function handleSearch(value: any, fieldName: string) {
    mapFieldsToFn[fieldName](value);
  }

  return [firstName, lastName, birthday, handleSearch];
}

export default SearchBar;

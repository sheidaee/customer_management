import React from 'react';
import moment from 'moment';
import { DateInput } from "@blueprintjs/datetime";

class DateInputField extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.value;
  }

  FORMATS = [{
      formatDate: date => date.toLocaleString(),
      placeholder: this.props.placeholder,
      parseDate: str => new Date(str)
    },
    momentFormatter("MM/DD/YYYY"),
    momentFormatter("YYYY-MM-DD"),
    momentFormatter("YYYY-MM-DD HH:mm:ss")
  ];  

  render() {
    return (
      <DateInput
          timePrecision={undefined}
          {...this.FORMATS[2]}                    
          minDate={
            new Date(
              moment()
                .subtract(90, "years")
                .format()
            )
          }
          {...this.props}
        />
    );
  }
}

const momentFormatter = (format) => {
  return {
    formatDate : date => moment(date).format(format),
    parseDate  : str => moment(str, format).toDate(),
    placeholder: format,
  };
}

export default DateInputField;

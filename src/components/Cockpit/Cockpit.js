import React from "react";
import { Input, Icon } from "semantic-ui-react";
import classes from "./Cockpit.module.css";

const cockpit = (props) => {
  return (
    <div className={classes.Cockpit}>
      <h2>BookSearch</h2>
      <Input
        icon={
          <Icon name="search" circular link onClick={props.onButtonClick} />
        }
        size="big"
        type="text"
        placeholder="Search books here.."
        value={props.inputText}
        onChange={props.onInputChange}
      />
    </div>
  );
};

export default cockpit;

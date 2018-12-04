import React from 'react';
import { PageHeader, Well } from "react-bootstrap";

const TaskList = (props) => (
  <div>
  	<PageHeader><center>Viewing Project {props.match.params.projectid} as User {props.match.params.userid}</center></PageHeader>
  </div>
);

export default TaskList;

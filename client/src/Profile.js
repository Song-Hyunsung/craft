import React from 'react';
import { PageHeader, Well } from "react-bootstrap";

const Profile = (props) => (
  <div>
    <PageHeader><center>Hello, User {props.match.params.userid}</center></PageHeader>
  </div>
);

export default Profile;
import React, {Component} from 'react';
import { PageHeader } from "react-bootstrap";
import './Home.css'
export default class Home extends Component {
  render() {
    return (
    	<div className="wrapper">
        <div className="main">
          <div className="p_1">
        <PageHeader><div><center>Welcome to Craft</center></div></PageHeader>
        <h3><center> A minimalistic project management system </center></h3>
          </div>
        </div>
  		</div>
    );
  }
}
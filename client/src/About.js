import React, {Component} from 'react';
import { Col, Grid, Row } from "react-bootstrap";

export default class About extends Component {
  render() {
    return (
      <div className="container">
        <h1>About Us</h1>
        <br/>
        <br/>
        <Grid>
        	<Row>
        		<Col sm={3} md={3} lg={3}>
			        <img src={require('./images/song.jpg')}/>
			    </Col>
			    <Col sm={9} md={9} lg={9}>
			        <h3> Hyunsung Song </h3>
			        <h5> Computer Science student at City College of New York </h5>
			        <p> Role: Implement Back-end database, API endpoints, and create Front-end React components to fetch and render data from the Back-end </p>
			        <a href="https://linkedin.com/in/hyunsungsong/" > https://linkedin.com/in/hyunsungsong/ </a>
		        </Col>
		        <Col sm={3} md={3} lg={3}>
			        <img src={require('./images/brian.jpg')}/>
			    </Col>
			    <Col sm={9} md={9} lg={9}>
		        	<h3> Brian Hao </h3>
		        	<h5> Computer Science graduate at Hunter College </h5>
		        	<p> Role: Process and visualize Front-end React components and views into responsive and user friendly design </p>
		        	<a href="https://linkedin.com/in/brianhao/" > https://linkedin.com/in/brianhao/ </a>
		        </Col>
		        <Col sm={3} md={3} lg={3}>
			        <img src={require('./images/jacky.jpg')}/>
			    </Col>
			    <Col sm={9} md={9} lg={9}>
		        	<h3> Jacky Liu </h3>
		        	<h5> Computer Science student at City College of New York </h5>
		        	<p> Role: Assist with Front-end development and styling using CSS </p>
		        	<a href="https://linkedin.com/in/jacky-liu97/" > https://linkedin.com/in/jacky-liu97/ </a>
		        </Col>
		    </Row>
        </Grid>
  	  </div>
    );
  }
}
import React, {Component} from 'react';
import { PageHeader,Panel, Grid, Row, Col} from "react-bootstrap";
import './Home.css'
export default class Home extends Component {
  render() {
    return (
    	<div className="wrapper">
        <div className="main">
          <div className="p_1">
        <PageHeader><h1><center>Welcome to Craft</center></h1></PageHeader>
        <h3><center> A minimalistic project management system </center></h3>
          </div>
        </div>
        
        <Grid>
          <Row>
            <Col xs={12} md={8} lg={12}>
          <Panel>
            <Panel.Body className="panel_1"> Craft allows easy collaboration between Project Managers and
              Software Engineers. It's simple to get started! Just Log in and start crafting.
            </Panel.Body>
          </Panel>
            </Col>
          </Row>
            <Row>
              <Col xs={12} md={8} lg={12}>
            <Panel>
              <Panel.Body className="panel_2"> Managers can organize multiple projects and set tasks for Programmers. 
            Programmers can work on multiple projects and mark tasks as completed. </Panel.Body>
            </Panel>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={8} lg={12}>
              <Panel>
                <Panel.Body className="panel_3"> Got feedback or questions? Email us at craft@gmail.com </Panel.Body>
              </Panel>
              </Col>
            </Row>
        </Grid>
  		</div>
    );
  }
}
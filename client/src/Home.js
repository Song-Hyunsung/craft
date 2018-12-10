import React, {Component} from 'react';
import { PageHeader,Panel, Grid, Row, Col} from "react-bootstrap";
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
        
        <Grid>
          <Row>
            <Col xs={12} md={8} lg={12}>
          <Panel>
            <Panel.Body className="panel_1"> Craft allows easy collaboration between Project Managers and
              their team members. It's simple to get started - just sign up or log in and start Crafting!
            </Panel.Body>
          </Panel>
            </Col>
          </Row>
            <Row>
              <Col xs={12} md={8} lg={12}>
            <Panel>
              <Panel.Body className="panel_2"> Managers can organize multiple projects and set tasks for their team. 
            Team members can work on multiple projects and mark tasks as completed. </Panel.Body>
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
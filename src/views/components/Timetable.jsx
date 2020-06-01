import React from "react";
import { Button, ButtonGroup, Card, CardHeader, CardBody, CardTitle, Collapse, Table, Row, Col } from "reactstrap";

import Ktel from "./ktel";
import MiniBus from "./miniBus";

import classNames from "classnames";

import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { saveStr } from '../../store/actions/appAction'

const dayNumber = new Date().getDay();
const daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const strPoints = ["Hermoupolis", "Galissas", "Finikas", "Posidonia", "Mega Gialos", "Vari", "Azolimnos", "Kini"];

class TimetableCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          bigChartData: "data1",
          collapseDaysMenu: false,
          dayOfTheWeek: daysArray[dayNumber],
          startingPoint: this.props.strPoint,
          startingPointId: 0
        };
    }

    toggleCollapse = () =>{
      this.setState( prevState => ({
        collapseDaysMenu: !prevState.collapseDaysMenu
      }));
    }

    selectDay = newDay => {
      this.setState({
        dayOfTheWeek: newDay.toString()
      });
      // this.toggleCollapse();
    };

    selectStart = (curLocation, id) => {
      this.setState({
        startingPoint: curLocation.toString(),
        startingPointId: id
      });
      this.toggleCollapse();
      this.props.dispatch(saveStr(curLocation.toString()));
    };

    setBgChartData = name => {
        this.setState({
          bigChartData: name
        });
    };
    render(){
        return(
            <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="float-left" style={{verticalAlign: "middle"}}>
                      <h5 style={{paddingTop: "7px"}}className="card-category">Timetable for {this.state.dayOfTheWeek}</h5>
                    </Col>
                    <Col className="float-right">
                      <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data1"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData("data1")}
                        >
                          <input defaultChecked className="d-none" name="options" type="radio"/>
                          {/* <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block"> */}
                          <span className="d-sm-block d-md-block d-lg-block d-xl-block">
                            KTEL
                          </span>
                          {/* <span className="d-block d-sm-none">
                            <i className="tim-icons icon-bus-front-12" />
                          </span> */}
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data2"
                          })}
                          onClick={() => this.setBgChartData("data2")}
                        >
                          <input className="d-none" name="options" type="radio"/>
                          {/* <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block"> */}
                          <span className="d-sm-block d-md-block d-lg-block d-xl-block">
                            Mini Bus
                          </span>
                          {/* <span className="d-block d-sm-none">
                            <i className="tim-icons icon-alert-circle-exc" />
                          </span> */}
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                  <Row className="float-left">
                    <Col style={{paddingTop: "15px"}} className="text-left" sm="12">      
                      <CardTitle tag="h2">From {this.state.startingPoint}
                      <Button className="btn-link" color="info" onClick={() => this.toggleCollapse()}>
                        <div aria-label="dropdown toggle" className="custom-caret"></div>
                      </Button>
                      </CardTitle>
                      <Collapse isOpen={this.state.collapseDaysMenu}>
                        <Row>
                          <Col>
                            <p className="text-muted">Choose a starting point and see the timetable from there</p>
                          </Col>
                        </Row>       
                        {strPoints.map((prop, index) => {
                          return(
                            <Row key={index}>
                              <Col>
                                {this.state.startingPoint===prop ? 
                                  <Button style={{padding:"0.3rem 0.7rem"}} className="btn-link" disabled>
                                    <p>{prop}</p>
                                  </Button> : 
                                  <Button onClick={() => this.selectStart(prop, index)} style={{padding:"0.3rem 0.7rem"}} className="btn-link" color="danger">
                                    <p>{prop}</p>
                                  </Button> 
                                }
                              </Col>
                            </Row>
                          )
                        })
                        }
                      </Collapse>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row className="table-full-width">
                      <Col >
                        <Table>
                            {this.state.bigChartData === "data1" ? <Ktel startingPoint={this.state.startingPoint}/> : <MiniBus/>}
                        </Table>
                      </Col>
                  </Row>
                  <Row>
                    <Col className="text-center" lg="12">
                      <Link to={"/timetable"}>
                        <button className="form-control" style={{padding: "5px", background:"none", outline:"none", border:"none", cursor: 'pointer'}}>See the timetable for the whole week</button>
                      </Link>
                    </Col>
                  </Row>
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    strPoint: state.app.strPoint
  }

}

export default connect(mapStateToProps)(TimetableCard);
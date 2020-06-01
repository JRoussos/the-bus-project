import React, { Component } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from 'reactstrap'
import Destination from './Destination'
import Leaflet from './Leaflet';
import { connect } from 'react-redux';
import { formatDistanceToNow } from 'date-fns'
import Tickets from './Tickets'
import NotFound from './NotFound';

class RouteDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            visibility: false,
            validLoad: true
        }
        // console.log(props);
    }

    static getDerivedStateFromProps(props, state){
        if(Object.keys(props.passedRoutes).length === 0){
        // if(props.passedRoutes.route === undefined){
            return { validLoad: false }
        }else return null;
    }
    componentDidMount(){
        window.scrollTo(0,0)
    }

    hideCard = () => {
        this.setState({
            visibility: !this.state.visibility
        });
    };

    eta = () => {
        const today = new Date();
        if(this.state.validLoad){

            let keepIndex = -1;
            for (let index = 0; index < this.props.passedRoutes.time.length; index++) {
                const element = this.props.passedRoutes.time[index];
                const timesplit = element.split(":")
                
                if(timesplit[0] > today.getHours() && keepIndex < 0){
                    keepIndex = index
                }
                if(timesplit[0] === 24){
                    keepIndex = index
                }
            }
            const time = this.props.passedRoutes.time.slice(keepIndex, this.props.passedRoutes.time.length)

            // console.log(keepIndex, time) //keepIndex: 0 clock: 00:44
            if(keepIndex > 0){
                const index = time[0].split(":")
                const hour = index[0]
                const min = index[1]
                // if(time.length === 1)
                //     return ("The last bus for today is leaving " + formatDistanceToNow(new Date(today.getFullYear(), today.getMonth(), (today.getDate()), hour, min, 0), { addSuffix: true }))
                // else
                return ("The next bus is leaving " + formatDistanceToNow(new Date(today.getFullYear(), today.getMonth(), (today.getDate()), hour, min, 0), { addSuffix: true }))
            }else{
                const index = this.props.passedRoutes.time[0].split(":")
                const hour = index[0]
                const min = index[1]
                return ("The next bus is leaving " + formatDistanceToNow(new Date(today.getFullYear(), today.getMonth(), (today.getDate()+1), hour, min, 0), { addSuffix: true }))
                // return ("There are no more buses today, see you again " + formatDistanceToNow(new Date(today.getFullYear(), today.getMonth(), (today.getDate()), hour, min, 0), { addSuffix: true }))
            }             
        }
    }

    backBtn = () => {
        this.props.history.goBack();
    }

    render() {
        if(this.state.validLoad){
            const last = this.props.passedRoutes.route.length;
            return (
                <div className="content">
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader className="mb-5">
                                    <Row>
                                        <Col className="float-left" style={{verticalAlign: "middle"}}>
                                            <h4 style={{paddingTop: "7px"}}>
                                                {/* <i className="tim-icons icon-minimal-left d-sm-none" style={{color: "#9A9A9A", paddingRight: "10px", cursor: "pointer"}} onClick={() => this.backBtn()} /> */}
                                                <span className="card-category">Route Details</span>
                                            </h4>
                                        </Col>
                                    </Row>
                                    <Row className="float-left">
                                        <Col style={{paddingTop: "15px"}} className="text-left" sm="12">
                                            <CardTitle tag="h3"> {this.eta()} </CardTitle>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <h5 className="card-category">The bus follows this route:</h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p className="title">{this.props.passedStartingPoint} - {this.props.passedRoutes.route.map((v, index) => {
                                                if(last === index+1){
                                                    return v
                                                }else{
                                                    return v+" - "
                                                }
                                            })}</p>
                                            <p className="text-muted">{this.props.passedRoutes.time.map(t => t+" ")}</p>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Destination route={this.props.passedRoutes} startingPoint={this.props.passedStartingPoint} visibilityHandler={this.hideCard}/>
                                    <br/>
                                    {this.state.visibility ? <Tickets/> : null }
                                    <br/>
                                    <Leaflet dark={this.props.isItDark} startingPoint={this.props.passedStartingPoint}/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
        }else{
            return (
                <NotFound/>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state)
    return {
        passedRoutes: state.route.routePassedToDetails,
        passedStartingPoint: state.route.startingPointPassedToDetails,
        isItDark: state.app.isItDark
        // passedRoutes: state.route.routePassedToDetails[index],
        // passedStartingPoint: str
    }
}

export default connect(mapStateToProps)(RouteDetails)
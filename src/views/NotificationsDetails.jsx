import React, { Component } from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns';
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table } from "reactstrap";
import { Link } from 'react-router-dom';
import NotFound from './components/NotFound';

const cardStyle = {
    height: "82vh",
    minHeight: "82vh",
    overflowY: "scroll",
    paddingTop: "15px",
    margin: "5px 0",
    boxShadow: "none"
}

class NotificationsDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            validLoad: true,
            visibility: true,
            index: 0
        }
    }

    static getDerivedStateFromProps(props, state){
        if(props.notifications.length === 0){
            return { validLoad: false }
        }else return null;
    }
    
    componentDidMount(){
        window.scrollTo(0,0)
    }
    
    showFull = index => {
        this.setState({
            visibility: false,
            index
        })
        window.scrollTo(0,0);
    }

    backBtn = () => {
        this.props.history.goBack()
    }
    
    render() {
        if(this.state.validLoad){
            if(window.innerWidth > 768) {
            return (
                <div className="content">
                    <Card>
                    <Row>
                        <Col sm="5">
                            <Card style={cardStyle}>
                                <CardHeader>
                                    <Row>
                                        <Col className="text-left" sm="12">
                                            <CardTitle tag="h2">Notifications</CardTitle>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <Table borderless>
                                                <tbody>
                                                {this.props.notifications.map((noti, index) => {
                                                    if(noti === null) return null
                                                    else{
                                                    const date = new Date(noti[1].time.toDate())
                                                    return(
                                                        <tr key={noti[0]}>
                                                            <td>
                                                            <Link to={"/notifications/" + noti[0]}>
                                                            <button onClick={() => this.showFull(index)} style={{border: "none", padding: "0", background: "none", width: "100%", outline: "none", cursor: "pointer", textAlign: "left"}}>
                                                            <Row>
                                                                <Col sm="8" className="text-left">
                                                                    <p className="title"> {noti[1].title}</p>
                                                                    <h5 className="card-category">  {format(date, "dd-MMM-yyyy HH:mm")} </h5>
                                                                </Col>
                                                            </Row>
                                                            <p className="text-muted text-overflow" style={{"--lines": "3"}} >{noti[1].content}</p>
                                                            </button>
                                                            </Link>
                                                            </td>
                                                        </tr>
                                                        );}
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="7">
                            {this.props.id === "full" ? null
                            : <Card style={cardStyle}>
                                <CardHeader>
                                    <Row>
                                        <Col className="text-left" sm="12">
                                            <CardTitle tag="h2">{this.props.active[1].title}</CardTitle>
                                            <h5 style={{paddingTop: "7px"}}className="card-category">Posted: {format(new Date(this.props.active[1].time.toDate()), "dd-MMM-yyyy HH:mm")}</h5>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <p>{this.props.active[1].content}</p>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card> }
                        </Col>
                    </Row>
                    </Card>
                </div>
            )
        }else{
            return(
                <div className="content">
                    {this.props.id === "full" ? 
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col className="text-left" sm="12">
                                    <CardTitle tag="h2">Notifications</CardTitle>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col>
                                    <Table borderless>
                                        <tbody>
                                        {this.props.notifications.map((noti, index) => {
                                            if(noti === null) return null
                                            else{
                                            const date = new Date(noti[1].time.toDate())
                                            return(
                                                <tr key={noti[0]}>
                                                    <td>
                                                    <Link to={"/notifications/" + noti[0]}>
                                                    <button onClick={() => this.showFull(index)} style={{border: "none", padding: "0", background: "none", width: "100%", outline: "none", cursor: "pointer", textAlign: "left"}}>
                                                    <Row>
                                                        <Col sm="8" className="text-left">
                                                            <p className="title"> {noti[1].title}</p>
                                                            <h5 className="card-category">  {format(date, "dd-MMM-yyyy HH:mm")} </h5>
                                                        </Col>
                                                    </Row>
                                                    <p className="text-muted text-overflow" style={{"--lines": "3"}} >{noti[1].content}</p>
                                                    </button>
                                                    </Link>
                                                    </td>
                                                </tr>
                                                );}
                                            })}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card> :
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col className="text-left" sm="12">
                                    {/* <h4 style={{paddingTop: "7px"}}>
                                        <i className="tim-icons icon-minimal-left d-sm-none" style={{color: "#9A9A9A", paddingRight: "10px", cursor: "pointer"}} onClick={() => this.backBtn()} />
                                        <span className="card-category">Back</span>
                                    </h4> */}
                                    <CardTitle tag="h2">{this.props.active[1].title}</CardTitle>
                                    <h5 style={{paddingTop: "7px"}}className="card-category">Posted: {format(new Date(this.props.active[1].time.toDate()), "dd-MMM-yyyy HH:mm")}</h5>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col>
                                    <p>{this.props.active[1].content}</p>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card> }
                </div>
            )
        }
        }else{
            return (
                <NotFound/>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const { notifications } = state.firestore.data;

    if(notifications === undefined){
        return {
            notifications: state.notification.notifications,
            active: state.notification.notifications.find(element => element[0] === id),
            id
        }
    }else{
        return {
            notifications: Object.entries(notifications),
            active: Object.entries(notifications).find(element => element[0] === id),
            id
        }
    }
}

export default connect(mapStateToProps)(NotificationsDetails);
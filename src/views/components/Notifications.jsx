import React from "react";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table } from "reactstrap";

import { format } from 'date-fns';
import { Link } from "react-router-dom";

import { saveNotis } from '../../store/actions/notificationActions'

class Notifications extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modal: [false],
            notificationLength: 4
        }
    }

    modalToggle = num => {
        let modalArray = this.state.modal
        for(let i=0; i<4; i++){
            if(i === num ){
                modalArray[i] = !modalArray[i]
            }else{
                modalArray[i] = false
            }
        }
        this.setState({
            modal: modalArray
        })
    }

    // componentDidMount(){
    //     this.unsubscribe = db.collection("notifications").limit(4).onSnapshot({includeMetadataChanges: true}, snap => {
    //         const doc = snap.docs.map(doc => doc.data());
    //         this.setState({
    //             notifications: doc,
    //             // notificationLength: this.state.notificationLength+1
    //         })

    //         snap.docChanges().forEach(change => {
    //             if(change.type === "added" && !snap.metadata.fromCache){
    //                 const title = change.doc.data()
    //                 this.notify(title.title)
    //             }
    //             var source = snap.metadata.fromCache ? "local cache" : "server";
    //             console.log("Data came from " + source);
    //         })
    //     })
    // }

    // componentWillUnmount(){
    //     this.unsubscribe();
    // }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.loaded !== this.props.loaded){
            this.props.dispatch(saveNotis(this.props.notifications));
        }
    }

    render(){
        return(
            <div>
            <Card className="card-chart">
                <CardHeader>
                    <Row>
                        <Col className="text-left" sm="12">
                            <CardTitle tag="h2">Notifications</CardTitle>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Row className="table-full-width">
                        <Col>
                            <Table>
                                <tbody>
                                {this.props.notifications.map((noti, index) => {
                                    if(noti === null) return null
                                    else{
                                    const date = new Date(noti[1].time.toDate())
                                    return(
                                        <tr key={noti[0]}>
                                            <td>
                                            <Link to={"/notifications/" + noti[0]}>
                                                <button style={{border: "none", padding: "0", background: "none", outline: "none", cursor: "pointer", textAlign: "left"}}>
                                                <Row>
                                                    <Col sm="8" className="text-left">
                                                        <p className="title"> {noti[1].title}</p>
                                                        <h5 className="card-category">  {format(date, "dd-MMM-yyyy HH:mm")} </h5>
                                                    </Col>
                                                </Row>
                                                <p className="text-muted text-overflow" style={{"--lines": "3"}}>{noti[1].content}</p>
                                                </button>
                                            </Link>
                                            {/* <Modal backdrop={true} centered={true} isOpen={this.state.modal[index]}>
                                                <ModalHeader tag="h4" toggle={() => this.modalToggle(index)}>{noti[1].title}</ModalHeader>
                                                <ModalBody>
                                                    <p>Posted: {format(date, "dd-MMM-yyyy HH:mm")} </p>
                                                    <hr/>
                                                    <p>{noti[1].content}</p>
                                                </ModalBody>
                                            </Modal> */}
                                            </td>
                                        </tr>
                                        );}
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center" lg="12">
                            <Link to={"/notifications/full"}>
                                <button className="form-control" style={{padding: "5px", background:"none", outline:"none", border:"none", cursor: 'pointer'}}>See older nofications</button>
                            </Link>
                        </Col>
                  </Row>
                </CardBody>
            </Card>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const { notifications } = state.firestore.data;

    if(notifications === undefined){
        return {
            notifications: [],
            loaded: false
        }
    }else{
        return {
            notifications: Object.entries(notifications),
            loaded: true
        }
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'notifications', limit: 4, orderBy: ['time', 'desc'] }
    ])
)(Notifications);

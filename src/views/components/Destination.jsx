import React from "react";
import {
    CardHeader,
    CardBody,
    Row,
    Col,
    CardTitle,
    UncontrolledDropdown,
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem,
    Button
} from "reactstrap";
import { connect } from 'react-redux';
import { passRouteDetails } from '../../store/actions/routeAction'

class DestinationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            strItemSelect: this.props.startingPoint===null ? "-1" : "0",
            strItemText: this.props.startingPoint===null ? "e.g. Hermoupolis" : this.props.startingPoint,
            desItemSelect: "-1",
            desItemText: "e.g. Galissas"
        };
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.desItemSelect > -1){
            this.props.dispatch(passRouteDetails(this.state.desItemSelect));
        }else{
            this.props.visibilityHandler(false)
        }
    }

    selectDropDownItem = (selection, item, id) =>{
        if(selection === "str"){
            this.setState({
                strItemSelect: id,
                strItemText: item
            });
            if(this.state.desItemSelect === id){
                this.setState({
                    desItemSelect: "-1",
                    desItemText: "e.g. Galissas"
                });
                this.props.visibilityHandler(false);
            }else if(this.state.desItemSelect > -1){
                this.props.visibilityHandler(true);
            }
        }
        if(selection === "des"){
            this.setState({
                desItemSelect: id,
                desItemText: item
            });
            if(this.state.strItemSelect === id){
                this.setState({
                    strItemSelect: "-1",
                    strItemText: "e.g. Hermoupolis"
                });
                this.props.visibilityHandler(false);
            }else if(this.state.strItemSelect > -1){
                this.props.visibilityHandler(true);
            }
        }
    }

    clearSelected = selection => {
        if(selection === "str"){
            this.setState({
                strItemSelect: "-1",
                strItemText: "e.g. Hermoupolis"
            });
        }
        if(selection === "des"){
            this.setState({
                desItemSelect: "-1",
                desItemText: "e.g. Galissas"
            });
        }
    }

    render() {
        return (
            <div>
                <CardHeader style={{paddingLeft: "0", paddingRight: "0"}}>
                    <Row>
                        <Col className="text-left" sm="6">
                            <CardTitle tag="h2">Where to?</CardTitle>
                            {/* <CardSubtitle className="card-category" tag="h5">Find out details about the trip; such as the route the bus takes, see the price of the ticket and much more.</CardSubtitle> */}
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody style={{paddingLeft: "0", paddingRight: "0"}}>
                    <Row>
                        <Col className="pr-md-1" md="6">
                        <label>Strarting Point</label>
                        <div className={this.state.strItemSelect > -1 ? "form-control destination-background" : "form-control"}>
                            <p className={this.state.strItemSelect > -1 ? "title float-left" : "text-muted float-left"} >{this.state.strItemText}</p>
                            {this.state.strItemSelect > -1 ? 
                            (this.props.startingPoint===null ? <Button close onClick={() => this.clearSelected("str")}/> : null) : 
                            <UncontrolledDropdown className="float-right">
                                <DropdownToggle caret className="btn-icon" color="link" data-toggle="dropdown" type="button" ></DropdownToggle>
                                <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                                    {this.props.route.route.map((prop, index) => {  
                                        if(index === this.state.strItemSelect){                                  
                                            return(
                                                <DropdownItem disabled key={index}><p>{prop}</p></DropdownItem>
                                            )
                                        }else{
                                            return(
                                                <DropdownItem key={index} onClick={() => this.selectDropDownItem("str", prop, index)}><p>{prop}</p></DropdownItem>
                                            )
                                        }
                                    })}
                                </DropdownMenu>
                            </UncontrolledDropdown> }
                        </div>
                        </Col>
                        <Col>
                        <label>Destination</label>
                        <div className={this.state.desItemSelect > -1 ? "form-control destination-background" : "form-control"}>
                            <p className={this.state.desItemSelect > -1 ? "title float-left" : "text-muted float-left"} >{this.state.desItemText}</p>
                            {this.state.desItemSelect > -1 ? 
                            <Button close onClick={() => this.clearSelected("des")}/> : 
                            <UncontrolledDropdown className="float-right">
                                <DropdownToggle caret className="btn-icon" color="link" data-toggle="dropdown" type="button"></DropdownToggle>
                                <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                                {this.props.route.route.map((prop, index) => {
                                    if(index === this.state.desItemSelect){
                                        return(
                                            <DropdownItem disabled key={index}><p>{prop}</p></DropdownItem>
                                        )
                                    }else{
                                        return(
                                            <DropdownItem key={index} onClick={() => this.selectDropDownItem("des", prop, index)}><p>{prop}</p></DropdownItem>
                                        )
                                    }
                                    })}
                                </DropdownMenu>
                            </UncontrolledDropdown> }
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center" lg="12">
                            <p className="text-muted" style={{paddingTop:"20px"}}>Find out details about the trip; such as the route the bus takes, see the price of the ticket and much more.</p>
                        </Col>
                    </Row>
                </CardBody>
            </div>
        );
    }
}

export default connect()(DestinationCard);
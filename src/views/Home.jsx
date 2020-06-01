import React from "react";
import { Row, Col } from "reactstrap";

import TimetableCard from "./components/Timetable";
import Notifications from "./components/Notifications";
// import SlideShow from "./components/Slideshow";
import Landing from "./Landing";
// import Tickets from "./components/Tickets";

class newView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cardVisibility: false
        };
    }

    hideCard = state => {
        this.setState({
          cardVisibility: state
        });
    };

    render(){
        return(
            <div className="content">
                <Row>
                    <Col>
                        <Landing/>
                    </Col>
                </Row>
                {/* <Row>
                    <Col lg="12">
                      <Slideshow/>  
                    </Col>
                </Row> */}
                <Row>
                    <Col lg="7">
                        <TimetableCard/>
                    </Col>
                    <Col lg="5">
                        <Notifications/>
                    </Col>
                </Row>
                {/* <Row>
                    <Col lg="12">
                        <Tickets/>
                    </Col>
                </Row> */}
            </div>
        );
    }

}

export default newView;
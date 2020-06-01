import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import '../../assets/css/dummy-loading.css'

export default class dummy extends Component {
    render() {
        return (
            <Row>
                <Col>
                    <div className="enclosure">
                        <div className="my-slider">
                            <div className="my-line"></div>
                            <div className="my-subline inc"></div>
                            <div className="my-subline dec"></div>
                        </div>
                        <br/>
                        <div style={{height:"10px"}} className="my-slider">
                            <div style={{height:"10px"}} className="my-line"></div>
                            <div style={{height:"10px"}} className="my-subline inc"></div>
                            <div style={{height:"10px"}} className="my-subline dec"></div>
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}

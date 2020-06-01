import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import SlideShow from './components/Slideshow'
import '../assets/css/media.css'

import { withTranslation } from 'react-i18next';

const styling = {
    // height: "80vh",
    // display: "flex",
    // justifyContent: "center",
    // flexFlow: "column", 
    textAlign: "center",
    // alignItems: "center"
}

class Landing extends Component {
    render() {
        const { t } = this.props;
        console.log(this.props);

        return (
            <div style={styling}>
                <Row className="slide-row">
                    <SlideShow/>
                </Row>
                <Row style={{padding: "10% 0"}}>
                    <Col>
                        <h1>{t('welcome')} </h1>
                        <br/>
                        <p>{t('welcomeText')}</p>
                    </Col>
                    {/* <Col lg="6"> */}
                    {/* </Col> */}
                </Row>
            </div>
        )
    }
}

export default withTranslation('translations')(Landing);
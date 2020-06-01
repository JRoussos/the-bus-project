import React, { Component } from 'react'
import { connect } from 'react-redux';

import '../../assets/css/media.css'
import ticketImg from '../../assets/img/ticket.svg'

const ticketBackground = {
    backgroundImage: `url(${ticketImg})`, 
    height: "160px", 
    width: "150px",
    paddingTop: "50px"
}

class Tickets extends Component {
    getTitle = id => {
        if(id === 0){
            return "Full ticket"
        }else if(id === 1){
            return "25% discount"
        }else{
            return "50% discount"
        }
    }

    getInfo = id => {
        if(id===0){
            return "The ticket is one way only."
        }else if(id === 1){
            return "The discount consern students of greek universities."
        }else {
            return "The discount consern people with disabilities or large families."
        }
    }

    calcDiscount = (price, id) => {
        if(price!== undefined && id === 0){
            return price;
        }else if(price!== undefined && id === 1){
            const discount = parseFloat(price) * 0.25
            return ((parseFloat(price) - discount).toFixed(1) + 0)
        }else if(price!== undefined && id === 2){
            const discount = parseFloat(price) * 0.50
            return ((parseFloat(price) - discount).toFixed(1) + 0)
        }else return null
    }

    render() {
        const tickets = [];
        for (let i=0; i<3; i++){
            tickets.push(
                // {this.getTitle(i)}  {this.calcDiscount(this.props.price, i)} € 
                <div key={i} style={{padding: "10px 40px"}}>
                    <div style={{paddingLeft: "8px"}}>
                        <div style={ticketBackground}>
                            <p className="text-center ticket" >{this.getTitle(i)} </p>
                            <p className="text-center ticket" >{this.calcDiscount(this.props.price, i)} € </p>
                        </div>
                    </div>
                    <p style={{textAlign: "center", paddingTop: "30px", maxWidth: "160px"}}> {this.getInfo(i)} </p>
                </div>
            );
        }
        
        return (
            <div className="responsive">
                {tickets}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { villageDetailsId, routePassedToDetails } = state.route
    return {
        price: routePassedToDetails.price[villageDetailsId]
        // price: "1.80"
    }
}

export default connect(mapStateToProps)(Tickets)
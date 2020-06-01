import React, { Component } from 'react'

export default class NotFound extends Component {
    render() {
        return (
            <div className="content text-center" style={{display: "flex", justifyContent:"center", flexDirection:"column"}}>
                <h1>Oops!</h1>
                <br/>
                <div>Something unexpected came up! Try to refresh the page.</div>
            </div>
        )
    }
}

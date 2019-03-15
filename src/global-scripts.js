import React, { Component } from 'react';



function getItemState (state_, lift) {
    this.setState({goto: state_});
    lift(state_)
}
const changesInfo = (prevProps, prevState) => {
    alert("changesInfo");
    /*rerender information*/
    Object.entries(this.props).forEach(([key, val]) =>
        prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    Object.entries(this.state).forEach(([key, val]) =>
        prevState[key] !== val && console.log(`State '${key}' changed`)
    );
}

function liftState(state_, lift) {
    console.log("`about` liftstate");
    this.setState({position: state_});
};

export default {liftState};
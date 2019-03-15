import React, { Component } from 'react';
import {Home} from './home/home';
import {About} from "./about/about";
import {Works} from "./works/works";
import './about/about';
import './App.css';
import './reset.css';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class App extends Component {
    constructor(props){
        super(props)
        this.state={
            state:"home"
        }
        this.setState = this.setState.bind(this);
        this.changeState = this.changeState.bind(this);
    }
    componentDidMount(){

        /*redirect on first load according to hash*/
        this.changeFirstState()
    }
    changeFirstState(){
        /*if hash is not about, works, contact, then no redirects*/
        switch(window.location.hash){
            case "#about":
                this.setState({state:"about"})
                break;
            case "#works":
                this.setState({state:"works"})
                break;
            case "#contact":
                this.setState({state:"contact"})
                break;

        }
    }
    urlOperations(hash_="home"){
        window.location.hash = hash_;
    };

    /*change state, then change hash*/
    changeState(state_){
        this.urlOperations(state_);
        this.setState({state:state_});
    }
  render() {
        console.log("`App` rerendering");
    return (
        <>
        {this.state.state === "home"?
            <Home changeState={this.changeState} menuItemClassName={this.state.state==="home"?"nav__items nav__item-":null}/>
            :this.state.state === "about"?
                <About
                    changeState={this.changeState}
                    menuItemClassName="top-nav__items top-nav__item-"
                    txtHeader="— Let me tell you about myself"/>
                :this.state.state === "works"?<Works
                    changeState={this.changeState}/>:null
            }

        </>
    );
  }
}

export default App;

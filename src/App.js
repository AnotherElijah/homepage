import React, {Component} from 'react';
import {Home} from './home/home';
import {About} from "./about/about";
import {Works} from "./works/works";
import {Contact} from "./contact/contact";
import './about/about';
import './App.css';
import './reset.css';
import {CanvasBg} from "./canvas/canvas-bg";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appState: "home"
        }
        this.setState = this.setState.bind(this);
        this.setGeneralState = this.setGeneralState.bind(this);

    }

    componentDidMount() {
        /*redirect on first load according to hash*/
        this.changeFirstState();

        document.onmouseover = function() {
            //User's mouse is inside the page.
            window.innerDocClick = true;
        };
        document.onmouseleave = function() {
            //User's mouse has left the page.
            window.innerDocClick = false;
        };
        window.onhashchange = function() {
            if (!window.innerDocClick) {
                window.location.reload()
            }
        };
    }

    changeFirstState() {
        /*if hash is not about, works, contact, then no redirects*/
        switch (window.location.hash) {
            case "#about":
                this.setState({appState: "about"});
                break;
            case "#works":
                this.setState({appState: "works"});
                break;
            case "#contact":
                this.setState({appState: "contact"});
                break;

        }
    }

    urlOperations(hash_ = "home") {
        window.location.hash = hash_;
    };

    /*change appState, then change hash*/
    setGeneralState(state_) {
        this.urlOperations(state_);
        this.setState({appState: state_});
    }
    render() {

        return (
            <>
            {this.state.appState === "home" ?
                <Home setGeneralState={this.setGeneralState}
                      menuItemClassName={this.state.appState === "home" ? "nav__items nav__item-" : null}/>
                : this.state.appState === "about" ?
                    <About
                        setGeneralState={this.setGeneralState}
                        menuItemClassName="top-nav__items top-nav__item-"
                        txtHeader="About me and my skills"/>
                    : this.state.appState === "works" ?
                        <Works
                        setGeneralState={this.setGeneralState}
                        menuItemClassName="top-nav__items top-nav__item-"
                        txtHeader="— Let me tell you about myself"/>
                        : this.state.appState === "contact" &&
                            <Contact
                                setGeneralState={this.setGeneralState}
                                menuItemClassName="top-nav__items top-nav__item-"
                                txtHeader="— Let me tell you about myself"/>
            }
{/*
            <CanvasBg className = 'home' appState='home'/>
*/}
            {this.state.appState !== "home" && <CanvasBg className = {this.state.appState} appState={this.state.appState}/>}
            </>
        );
    }
}

export default App;

import React, {Component} from "react"
import "../global-style.css"
import "./home.css"
import {Navigation, NavItem} from "../navigation/navigation"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


function SideLogo(props) {
    return (
        <div className={props.className}>
            <ReactCSSTransitionGroup
                component={React.Fragment}
                transitionName="logo-left-slide"
                transitionAppear={true}
                transitionAppearTimeout={5000}
                transitionLeaveTimeout={0}
                transitionEnter={true}
                transitionEnterTimeout={0}
                transitionLeave={false}>
                <img src={require('./img/logo-dark.svg')} alt=""/>
            </ReactCSSTransitionGroup>
        </div>
    )
}

function Introduction(props) {
    return (<div className={props.className}>
            <h3>Hello! My name is <span>Ilya</span>.</h3>
            <h3>I am <span>web developer</span> based in <span>Tallinn, Estonia</span></h3>
        </div>
    )
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = ({appState: "home"});
        this.setState = this.setState.bind(this);
        this.setHomeState = this.setHomeState.bind(this);

    }

    setHomeState(state_, lift) {
        this.setState({appState: state_})
    }

    componentDidUpdate(prevProp, prevState) {
        /*smoothly hides bg*/
        if (this.refs._bg) {
            const {_bg} = this.refs;
            _bg.classList.add("opacity");
        }
        if (prevState.appState !== this.state.appState) {
            setTimeout(
                () => {
                    this.props.setGeneralState(this.state.appState)
                }, 1000
            );
        }
    }

    componentDidMount() {
        let {_bg} = this.refs;
        if (!window.location.hash) {
            document.body.onload = () => {
                _bg.classList.remove("blur");
            };
        } else {
            /*if user came from other section of website (body already loaded)*/
            _bg.classList.remove("blur");
        }

    }

    render() {
        return (
            <div className="main-wrapper blur" ref="_bg">


                <div ref="bgBlur" className="main-section">
                    <div className="main-section main-section__filter">
                        <div className="main-section-wrapper">
                            <ReactCSSTransitionGroup
                                component={React.Fragment}
                                transitionName="home-logo"
                                transitionAppear={false}
                                transitionAppearTimeout={300}
                                transitionLeaveTimeout={1000}
                                transitionEnter={false}
                                transitionLeave={true}>
                                {this.state.appState === "home" ?
                                    <SideLogo
                                        className="sideLogo-wrapper"/>
                                    : null}
                            </ReactCSSTransitionGroup>
                            <ReactCSSTransitionGroup
                                component={React.Fragment}
                                transitionName="home-blocks-bottom-right"
                                transitionAppear={false}
                                transitionAppearTimeout={300}
                                transitionLeaveTimeout={1000}
                                transitionEnter={false}
                                transitionLeave={true}>
                                {this.state.appState === "home" ?
                                    <div className="bottom-right-mosaicBlock">
                                        <div className="mosaic-block-1"/>
                                        <div className="mosaic-block-2"/>
                                        <div className="mosaic-block-3"/>
                                    </div> : null}
                            </ReactCSSTransitionGroup>
                            <ReactCSSTransitionGroup
                                component={React.Fragment}
                                transitionName="home-blocks-top-right"
                                transitionAppear={false}
                                transitionAppearTimeout={300}
                                transitionLeaveTimeout={1000}
                                transitionEnter={false}
                                transitionLeave={true}>
                                {this.state.appState === "home" &&
                                <div className="top-right-mosaicBlock">
                                    <div className="mosaic-block-4"/>
                                    <div className="mosaic-block-5"/>
                                    <div className="mosaic-block-6"/>
                                    <div className="mosaic-block-7"/>
                                    <div className="mosaic-block-8"/>
                                    <div className="mosaic-block-9"/>
                                </div>}
                            </ReactCSSTransitionGroup>
                            <ReactCSSTransitionGroup
                                component={React.Fragment}
                                transitionName="home-blocks-bottom-left"
                                transitionAppear={false}
                                transitionAppearTimeout={300}
                                transitionLeaveTimeout={1000}
                                transitionEnter={false}
                                transitionLeave={true}>
                                {this.state.appState === "home" &&
                                <div className="bottom-left-mosaicBlock">
                                    <div className="mosaic-block-10"/>
                                    <div className="mosaic-block-11"/>
                                    <div className="mosaic-block-12"/>
                                    <div className="mosaic-block-13"/>
                                    <div className="mosaic-block-14"/>
                                    <div className="mosaic-block-15"/>
                                    <div className="mosaic-block-16"/>
                                </div>}
                            </ReactCSSTransitionGroup>
                            <main>
                                <Introduction
                                    className="introduction"/>
                                <Navigation stateFromChild={this.setHomeState}
                                            menuItemClassName={this.props.menuItemClassName}/>
                            </main>
                        </div>
                        {/*</ReactCSSTransitionGroup>*/}
                    </div>
                </div>
            </div>);
    }
};

export {SideLogo, Introduction, NavItem};
export {Navigation, Home};
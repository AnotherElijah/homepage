import React, {Component} from "react"
import "../global-style.css"
import "./home.css"
import {Navigation, NavItem} from "../navigation/navigation"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


function SideLogo(props) {
    return (
        <div className={props.className}>
            <div className="sideLogo">
                <h1>I.POLETAJEV</h1>
            </div>
            <ReactCSSTransitionGroup
                component={React.Fragment}
                transitionName="logo-left-slide"
                transitionAppear={true}
                transitionAppearTimeout={5000}
                transitionLeaveTimeout={0}
                transitionEnter={true}
                transitionEnterTimeout={0}
                transitionLeave={false}>
                <div className="logoLeft"></div>
            </ReactCSSTransitionGroup>
        </div>
    )
}

function Introduction(props) {
    return (<div className={props.className}>
            <h3>Hi, I am a web developer</h3>
            <h3>from Tallinn, Estonia</h3>
        </div>
    )
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = ({position: "home"});
        this.setState = this.setState.bind(this);
        this.liftState = this.liftState.bind(this);
    }
    liftState(state_, lift) {
        this.setState({position: state_});
    }
    componentDidUpdate(prevProp, prevState) {/*попробовать вынести во внешний файл в обертке для переиспользования*/
        /*smoothly hides bg*/
        if(this.refs._bg){
            const {_bg} = this.refs;
            _bg.classList.add("opacity");
        }
        if(prevState.position!==this.state.position) {
            setTimeout(
                () => {
                    this.props.changeState(this.state.position)
                }, 1000
            );
        }
    }
    render() {
        return (
            <div className="main-wrapper" ref="_bg">
                <ReactCSSTransitionGroup
                    component={React.Fragment}
                    transitionName="home-logo"
                    transitionAppear={true}
                    transitionAppearTimeout={300}
                    transitionLeaveTimeout={1000}
                    transitionEnter={false}
                    transitionLeave={true}>
                    {this.state.position === "home" ?
                        <SideLogo
                            className="sideLogo-wrapper"/>
                        : null}
                </ReactCSSTransitionGroup>

                <div className="main-section">
                    <ReactCSSTransitionGroup
                        component={React.Fragment}
                        transitionName="main-section"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionLeaveTimeout={0}
                        transitionEnter={false}
                        transitionLeave={true}>
                        {this.state.position === "home" ?
                            <div className="main-section-wrapper">
                                <Introduction
                                    className="introduction"/>
                                <Navigation onClick={this.liftState} menuItemClassName={this.props.menuItemClassName}/>
                            </div> : null}
                    </ReactCSSTransitionGroup>
                </div>
            </div>);
    }
};

export {SideLogo, Introduction, NavItem};
export {Navigation, Home};
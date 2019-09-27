import React, {Component} from "react"
import "../global-style.css"
import changesInfo from "../global-scripts.js"
import "./contact.css"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Navigation} from "../home/home";
import {Header, Transition} from '../common-components/common-components';
import {CanvasBg} from "../canvas/canvas-bg";
import {GrowingBlock} from "../growing-block/growing-block"

const paragraph0 = <>
<h3>My contacts</h3>
<main className="list-bottom">
    <div className="contact-wrapper-0">
        <div className="contact-0-icon"><a href="https://www.linkedin.com/in/ilja-poletajev-02930b117/"><span
         /></a></div>
        <div className="contact-0-txt"><a href="https://www.linkedin.com/in/ilja-poletajev-02930b117/">My LinkedIn
            profile</a></div>
    </div>
    <div className="contact-wrapper-1">
        <div className="contact-1-icon"><a href="mailto:###"><span /></a></div>
        <div className="contact-1-txt"><a href="mailto:###">Via email</a></div>
    </div>
    <div className="contact-wrapper-2">
        <div className="contact-2-icon"><a href="tg://resolve?domain=<@iilja>"><span
         /></a></div>
        <div className="contact-2-txt"><a href="tg://resolve?domain=<@iilja>">+372 569 898 05</a></div>
    </div>
    <div className="contact-wrapper-3">
        <div className="contact-3-icon"><a href="https://wa.me/0037256989805"><span
         /></a></div>
        <div className="contact-3-txt"><a href="https://wa.me/0037256989805">+372 569 898 05</a></div>
    </div>

    <h4 className="cv-header">More info about me:</h4>
    <a className="contact-wrapper-4" href="#">
        <div className="contact-4-icon"><a href="#"><span /></a></div>
        <div className="contact-4-txt"><a href="#">Download my CV</a></div>
    </a>
</main>
</>;
let txt0 = <GrowingBlock key="1" clName="works-bg" header="" paragraph={paragraph0}/>;

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            position: "contact"
        });
        this.setState = this.setState.bind(this);
        this.liftState = this.liftState.bind(this);
    }

    liftState(state_, lift) {
        this.setState({position: state_});
    };

    shouldComponentUpdate(nextProps, nextState) {
        let should = false;
        /*Prevents scroll updates
        * If one or more condition is satisfies, return true (component rerenders)
        * */
        for (let key in nextState) {
            /*If new state is not obj, compare by content*/
            if (typeof nextState[key] !== "object") {
                if (nextState[key] !== this.state[key]) {
                    should = true;
                }
            } else {
                /*If new state is obj, compare by null*/
                try {
                    if (nextState[key] !== null && this.state[key] === null) {
                        should = true;
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
        return should;
    }

    componentDidUpdate() {
        setTimeout(
            () => {
                this.props.setGeneralState(this.state.position)
            }, 500
        );
    }

    render() {
        const menu = <Navigation menuItemClassName={this.props.menuItemClassName} section="contact" home={true}
                                 stateFromChild={this.liftState}/>;
        return (
            <section className="contact">
                <ReactCSSTransitionGroup
                    component="div"
                    className="top-navigation-wrapper"
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionEnter={false}
                    transitionLeaveTimeout={300}>
                    <div className="logo-wrapper">
                        <img src={require('../home/img/logo-white.svg')} alt=""/></div>
                    {menu}
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="about"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={true}
                    transitionEnterTimeout={0}
                    transitionLeave={true}
                    transitionLeaveTimeout={0}>
                    {this.state.position === "contact" ?
                        <Header headerClass="works-head" txtHeader={this.props.txtHeader}
                                txtUpper={this.props.txtUpper} txtMain={this.props.txtMain}/> :
                        null}
                </ReactCSSTransitionGroup>
                <section className="txt-block-wrapper">
                    <Transition direction="right"
                                nestedElem={txt0}
                                id={this.state.noOverflow && "no-overflow"}
                                wrapperNumber="-0-"
                                flag={this.state.position === "contact"}/>
                </section>
            </section>
        )
    }
}

export {Contact};
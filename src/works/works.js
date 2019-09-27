import React, {Component} from "react"
import "../global-style.css"
import changesInfo from "../global-scripts.js"
import "./works.css"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Navigation} from "../home/home";
import {Popup} from "../popup/popup";
import {Header, Transition} from '../common-components/common-components';
import {GrowingBlock} from "../growing-block/growing-block"
import {
    work00InnerDesc, work00Descrition,
    work01InnerDesc, work01Descrition,
    work02InnerDesc, work02Descrition,
    work03InnerDesc, work03Descrition,
    work04InnerDesc, work04Descrition,
    work05InnerDesc, work05Descrition,
    work06Descrition
} from './works-txt';

let ticking = false;

class Works extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            position: "works",
            header0: null,
            txt0: null,
            txt1: null,
            header1: null,
            header2: null,
            txt2: null,
            noOverflow: false
        });
        this.setState = this.setState.bind(this);
        this.liftState = this.liftState.bind(this);
    }

    liftState(state_, lift) {
        this.setState({position: state_});
    }

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

    componentWillMount() {
        /*first check if some txtBlocks are already in the visible area*/
        setTimeout(
            () => {
                this.handleScroll()
            }, 500)
    }

    componentDidUpdate() {
        setTimeout(
            () => {
                this.props.setGeneralState(this.state.position)
            }, 500
        );
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    removeCSS() {
        /*optional*/
        /*
        * Delete transform form elements (works-bg-wrapper), to allow position:fixed for inner component
        * */
        try {
            if (this.state.txt0 !== null) {
                setTimeout(
                    () => {
                        document.querySelector('.block-border-0-right .txt-block').classList.add('no-transform');
                    }, 200
                )
            }
            if (this.state.txt1 !== null) {
                setTimeout(
                    () => {
                        document.querySelector('.block-border-1-left .txt-block').classList.add('no-transform');
                    }, 200
                )
            }
        } catch (err) {
            console.log(err);
        }
    };

    animationPoints = () => {
        const widthCheck = window.innerWidth;
        const heightCheck = window.innerHeight;
        const arrOfPoints = [0];
        if (widthCheck >= 1900) {
            arrOfPoints.push(1.1);
            arrOfPoints.push(2.1);
        } else if (widthCheck >= 1580 && widthCheck < 1900) {
            arrOfPoints.push(1.1);
            arrOfPoints.push(2.1);
        } else if (widthCheck >= 1400 && widthCheck < 1580) {
            arrOfPoints.push(1.1);
            arrOfPoints.push(2.2);
        } else if (widthCheck >= 1200 && widthCheck < 1400) {
            arrOfPoints.push(1.1);
            arrOfPoints.push(2.3);
        } else if (widthCheck >= 800 && widthCheck < 1200) {
            arrOfPoints.push(1.1);
            arrOfPoints.push(2.1);
            if (heightCheck>420){
                arrOfPoints.push(0.9);
                arrOfPoints.push(0.9);
            }else if (heightCheck>1000){
                arrOfPoints.push(0.9);
                arrOfPoints.push(0.9);
            }
            if (widthCheck >= 1020 && widthCheck < 1030){
                if (heightCheck >= 1360 && heightCheck < 1370){
                    arrOfPoints.push(0.7);
                    arrOfPoints.push(0.7);
                }
            }
        } else if (widthCheck >= 700 && widthCheck < 800) {
            arrOfPoints.push(0.9);
            arrOfPoints.push(0.9);
        }
        else if (widthCheck >= 600 && widthCheck < 700) {
            arrOfPoints.push(0.9);
            arrOfPoints.push(0.9);
        }
        return arrOfPoints;
    };

    handleScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                let lastScrollY = window.scrollY;
                let screenY = window.innerHeight;
                /****block-0***/
                if (lastScrollY > ((screenY * this.animationPoints()[0]) - screenY)) this.setState({
                    header0: <GrowingBlock key="0" clName="works-bg" header="MY JAVASCRIPT WORKS"/>
                });
                if (lastScrollY > ((screenY * this.animationPoints()[0]) - screenY)) this.setState({
                    txt0: <GrowingBlock key="1"
                                        clName="works-bg"
                                        header=""
                                        paragraph={
                                            <><Popup class="work-0" description={work00Descrition}
                                                     innerComponent={work00InnerDesc}
                                                     imgSrc={require("./img/col-bl-logo.svg")} imgWidth="190px"/>
                                            <Popup class="work-1" description={work01Descrition}
                                                   innerComponent={work01InnerDesc} imgSrc={require("./img/slider.png")}
                                                   imgWidth="160px"/>
                                            <Popup class="work-2" description={work02Descrition}
                                                   innerComponent={work02InnerDesc}
                                                   imgSrc={require("./img/disc-logo.svg")}
                                                   imgWidth="160px"/></>
                                        }/>
                });

                /****block-1***/
                if (lastScrollY > ((screenY * this.animationPoints()[1]) - screenY)) this.setState({
                    header1: <GrowingBlock key="3" clName="works-bg" header="WORDPRESS PAGES"/>
                });
                if (lastScrollY > ((screenY * this.animationPoints()[1]) - screenY)) this.setState({
                    txt1: <GrowingBlock key="2" clName="works-bg" header="" paragraph={
                        <><Popup class="work-3" description={work03Descrition}
                                 innerComponent={work03InnerDesc}
                                 imgSrc={require("./img/uce-logo.png")} imgWidth="140px"/>
                        <Popup class="work-4" description={work04Descrition}
                               innerComponent={work04InnerDesc} imgSrc={require("./img/koristustood-logo.png")}
                               imgWidth="120px"/>
                        <Popup class="work-5" description={work05Descrition}
                               innerComponent={work05InnerDesc} imgSrc={require("./img/atrum.png")}
                               imgWidth="160px"/></>
                    }
                    />
                });
                /****block-2***/
                if (lastScrollY > ((screenY * this.animationPoints()[2]) - screenY)) this.setState({
                    header2: <GrowingBlock key="4" clName="works-bg" header="OTHER LINKS"/>
                });
                if (lastScrollY > ((screenY * this.animationPoints()[2]) - screenY)) {
                    this.setState({
                        txt2: <GrowingBlock key="5"
                                            clName="works-bg"
                                            header=""
                                            paragraph={
                                                <a href="http://codepen.io">
                                                    <Popup class="work-3" description={work06Descrition}
                                                           imgSrc={require("./img/codepen.png")} imgWidth="140px"
                                                    /></a>}
                        />
                    });
                    setTimeout(
                        () => {
                            this.setState({noOverflow: true})
                        }, 300
                    )
                }
                setTimeout(
                    () => {
                        ticking = false
                    }, 300
                )
            });
            ticking = true;
        }
    };

    changesInfo = (prevProps, prevState) => {
        /*rerender information*/
        Object.entries(this.props).forEach(([key, val]) =>
            prevProps[key] !== val && console.log(`Prop '${key}' changed`)
        );
        Object.entries(this.state).forEach(([key, val]) =>
            prevState[key] !== val && console.log(`State '${key}' changed`)
        );
    };

    render() {
        const menu = <Navigation
            menuItemClassName={this.props.menuItemClassName}
            section="works"
            home={true}
            stateFromChild={this.liftState}/>;
        const header0 = this.state.header0;
        const txt0 = this.state.txt0;
        const txt1 = this.state.txt1;
        const header1 = this.state.header1;
        const header2 = this.state.header2;
        const txt2 = this.state.txt2;
        return (
            <>
            <section className="works">
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
                    {this.state.position === "works" ?
                        <Header headerClass="works-head" txtHeader={this.props.txtHeader}
                                txtUpper={this.props.txtUpper} txtMain={this.props.txtMain}/> :
                        null}
                </ReactCSSTransitionGroup>
                <section className="txt-block-wrapper">
                    <Transition direction="left" nestedElem={header0} id={this.state.noOverflow && "no-overflow"}
                                wrapperNumber="-0-" flag={this.state.position === "works"}/>
                    <Transition direction="right" nestedElem={txt0} id={this.state.noOverflow && "no-overflow"}
                                wrapperNumber="-0-" flag={this.state.position === "works"}/>
                    <Transition direction="left" nestedElem={txt1} id={this.state.noOverflow && "no-overflow"}
                                wrapperNumber="-1-" flag={this.state.position === "works"}/>
                    <Transition direction="right" nestedElem={header1} id={this.state.noOverflow && "no-overflow"}
                                wrapperNumber="-1-" flag={this.state.position === "works"}/>
                    <Transition direction="left" nestedElem={header2} id={this.state.noOverflow && "no-overflow"}
                                wrapperNumber="-2-" flag={this.state.position === "works"}/>
                    <Transition direction="right" nestedElem={txt2} id={this.state.noOverflow && "no-overflow"}
                                wrapperNumber="-2-" flag={this.state.position === "works"}/>
                </section>
            </section>
            {this.removeCSS()}
            </>
        );
    }
};

export {Works};
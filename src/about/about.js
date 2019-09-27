import React, {Component} from "react"
import "../global-style.css"
import changesInfo from "../global-scripts.js"
import "./about.css"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Header, Transition} from '../common-components/common-components';
import {Navigation} from "../home/home";
import {CanvasBg} from "../canvas/canvas-bg";
import {GrowingBlock} from "../growing-block/growing-block"

let ticking = false;
const paragraph2 = <>
<ul className="list-right">Languages I speak:
    <li>HTML</li>
    <li>Pug</li>
    <li>Slim</li>
    <li>CSS</li>
    <li>Sass</li>
    <li>Less</li>
</ul>
</>;

class About extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            position: "about",
            txtBlock0: null,
            headerBlock0: null,
            txtBlock1: null,
            headerBlock1: null,
            txtBlock2: null,
            headerBlock2: null,
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
            }, 300)
    }
    componentDidUpdate(){
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

    animationPoints = () =>{
        const widthCheck = window.innerWidth;
        const heightCheck = window.innerHeight;
        const arrOfPoints = [0];
        if (widthCheck >= 1900) {
            arrOfPoints.push(0.9);
            arrOfPoints.push(1.3);
        } else if (widthCheck >= 1580 && widthCheck < 1900) {
            arrOfPoints.push(0.9);
            arrOfPoints.push(1.3);
        } else if (widthCheck >= 1400 && widthCheck < 1580) {
            arrOfPoints.push(0.9);
            arrOfPoints.push(1.3);
        } else if (widthCheck >= 1200 && widthCheck < 1400) {
            arrOfPoints.push(0.9);
            arrOfPoints.push(1.5);
        } else if (widthCheck >= 800 && widthCheck < 1200) {
            if (heightCheck>420){
                arrOfPoints.push(0.9);
                arrOfPoints.push(0.9);
            }else if (heightCheck>720){
                arrOfPoints.push(0.9);
                arrOfPoints.push(0.9);
            }else{
                arrOfPoints.push(1.1);
                arrOfPoints.push(3.2);
            }
            if (widthCheck >= 1020 && widthCheck < 1030){
                if (heightCheck >= 1360 && heightCheck < 1370){
                    arrOfPoints.push(0.9);
                    arrOfPoints.push(0.9);
                }
            }
        } else if (widthCheck >= 700 && widthCheck < 800) {
            arrOfPoints.push(0.9);
            arrOfPoints.push(0.9);
        }else if (widthCheck >= 300 && widthCheck < 700) {
            if (heightCheck>620){
                arrOfPoints.push(0.9);
                arrOfPoints.push(0.9);
            }else{
                arrOfPoints.push(1.1);
                arrOfPoints.push(3.3);
            }
        }
        return arrOfPoints;
    };

    handleScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                let lastScrollY = window.scrollY;
                let screenY = window.innerHeight;
                if (lastScrollY > ((screenY*this.animationPoints()[0]) - screenY)) this.setState({
                    txtBlock0: <GrowingBlock key="0" clName="about-skills-bg" header="PERSONALITY"/>
                });
                if (lastScrollY > ((screenY*this.animationPoints()[0]) - screenY)) this.setState({
                    headerBlock0: <GrowingBlock key="1" clName="about-skills-bg" header="Few words about me" paragraph="
I am a creative, open-minded developer with a passion to front-end, design and new ideas.
Properly positioned pixels and code that works smoothly - these things make happy. This is the reason why I always seek new challenges and concise solutions!
"/>
                });
                if (lastScrollY > ((screenY*this.animationPoints()[1]) - screenY)) this.setState({
                    txtBlock1: <GrowingBlock key="2" clName="about-skills-bg" header=""
                                             paragraph={<><GrowingBlock
                                                 clName="about-skills__skill-1"
                                                 header="Front-end"
                                                 paragraph={<>
                                                 <dl className="about-skills__skill-1__list">
                                                     <dt className="about-skills__skill-1__item-1">
                                                         HTML
                                                     </dt>
                                                     <dt className="about-skills__skill-1__item-2">CSS</dt>
                                                     <dd className="about-skills__skill-1__item-2-techList">
                                                         <ul className="techList-wrapper">
                                                             <li className="techList-1">CSS Grid, Flex</li>
                                                             <li className="techList-2">SCSS</li>
                                                             <li className="techList-3">Bootstrap</li>
                                                             <li className="techList-4">Emmet</li>
                                                         </ul>
                                                     </dd>
                                                     <dt className="about-skills__skill-1__item-3">Javascript</dt>
                                                     <dd className="about-skills__skill-1__item-3-techList">
                                                         <ul className="techList-wrapper">
                                                             <li className="techList-1">Vanilla</li>
                                                             <li className="techList-2">ES6</li>
                                                             <li className="techList-3">AJAX</li>
                                                         </ul>
                                                     </dd>
                                                     <dt className="about-skills__skill-1__item-4">React JS</dt>
                                                     <dd className="about-skills__skill-1__item-4-techList">
                                                         <ul className="techList-wrapper">
                                                             <li className="techList-1">Redux</li>
                                                             <li className="techList-2">React Bootstrap</li>
                                                         </ul>
                                                     </dd>
                                                 </dl></>
                                                 }/>
                                             <GrowingBlock
                                                 clName="about-skills__skill-2"
                                                 header="Other technologies"
                                                 paragraph={
                                                     <>
                                                     <dl className="about-skills__skill-2__list">
                                                         <dt className="about-skills__skill-2__item-1">
                                                             GULP
                                                         </dt>
                                                         <dt className="about-skills__skill-2__item-2">
                                                             GIT
                                                         </dt>
                                                         <dd className="about-skills__skill-2__item-2-techList">
                                                         </dd>
                                                         <dt className="about-skills__skill-2__item-3">Photoshop/Illustrator</dt>
                                                         <dd className="about-skills__skill-2__item-3-techList">
                                                         </dd>
                                                     </dl></>
                                                 }/>
                                             <GrowingBlock
                                                 clName="about-skills__skill-3"
                                                 header="Design"
                                                 paragraph={
                                                     <>
                                                     <dl className="about-skills__skill-3__list">
                                                         <dt className="about-skills__skill-3__item-1">
                                                             Good understanding of UX and UI conceptions
                                                         </dt>
                                                         <dt className="about-skills__skill-3__item-2">
                                                             Axure RP
                                                         </dt>
                                                         <dt className="about-skills__skill-3__item-2">
                                                             Adobe Illustrator
                                                         </dt>
                                                     </dl></>
                                                 }/></>}
                    />
                });
                if (lastScrollY > ((screenY*this.animationPoints()[1]) - screenY)) this.setState({
                    headerBlock1: <GrowingBlock key="3" clName="about-skills-bg" header="MY SKILLS"/>
                });
                if (lastScrollY > ((screenY*this.animationPoints()[2]) - screenY)) this.setState({
                    txtBlock2: <GrowingBlock key="4" clName="about-skills-bg" header="CURRENT OBJECTIVES"/>
                });
                if (lastScrollY > ((screenY*this.animationPoints()[2]) - screenY)) {
                    this.setState({
                        headerBlock2: <GrowingBlock key="5" clName="about-skills-bg" header="Header"
                                                    paragraph={<span>I am always open for any ideas. If you looking for web developer to hire, or partner to hire: please feel free to <a
                                                        href="#">contact me!</a></span>}/>
                    });
                    setTimeout(
                        ()=>{
                            this.setState({noOverflow:true})
                        },300
                    )
                }
                setTimeout(
                    () => {
                        ticking = false
                    }, 300
                );
            });
            ticking = true;
        }
    };

    render() {
        const menu = <Navigation menuItemClassName={this.props.menuItemClassName} section="about" home={true}
                                 stateFromChild={this.liftState}/>;
        const txtBlock0 = this.state.txtBlock0;
        const headerBlock0 = this.state.headerBlock0;
        const txtBlock1 = this.state.txtBlock1;
        const headerBlock1 = this.state.headerBlock1;
        const txtBlock2 = this.state.txtBlock2;
        const headerBlock2 = this.state.headerBlock2;
        return (
            <>
            <section className="about" >
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
                    {this.state.position === "about" ?
                        <Header headerClass="about-head" txtHeader={this.props.txtHeader}
                        txtUpper={this.props.txtUpper} txtMain={this.props.txtMain}/> :
                        null}
                </ReactCSSTransitionGroup>
                <section className="txt-block-wrapper">
                    <Transition direction="left" nestedElem={txtBlock0} id={this.state.noOverflow && "no-overflow"}
                                wrapperNumber="-0-" flag={this.state.position === "about"}/>
                    <Transition direction="right" nestedElem={headerBlock0} id={this.state.noOverflow && "no-overflow"}
                                wrapperNumber="-0-" flag={this.state.position === "about"}/>
                    <Transition direction="left" nestedElem={txtBlock1} id={this.state.noOverflow && "no-overflow"}
                                wrapperNumber="-1-" flag={this.state.position === "about"}/>
                    <Transition direction="right" nestedElem={headerBlock1} id={this.state.noOverflow && "no-overflow"}
                                wrapperNumber="-1-" flag={this.state.position === "about"}/>
                    <Transition direction="left" nestedElem={txtBlock2} id={this.state.noOverflow && "no-overflow"}
                                wrapperNumber="-2-" flag={this.state.position === "about"}/>
                    <Transition direction="right" nestedElem={headerBlock2} id={this.state.noOverflow && "no-overflow"}
                                wrapperNumber="-2-" flag={this.state.position === "about"}/>
                </section>
            </section>

            </>
        );
    }
};

export {Header, About};
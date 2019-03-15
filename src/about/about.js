import React, {Component} from "react"
import "../global-style.css"
import changesInfo from "../global-scripts.js"
import "./about.css"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Header} from '../common-components/common-components';
import {Navigation} from "../home/home";
import {CanvasBg} from "../canvas/canvas-bg";
import {GrowingBlock} from "../growing-block/growing-block"

function Transition({direction, nestedElem, wrapperNumber}) {
    return (
        <div className={"block-border" + wrapperNumber + direction}>
            <ReactCSSTransitionGroup
                component="div"
                className={"block"}
                transitionName={"txtBlockAnimation-" + direction}
                transitionAppear={false}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
                transitionEnter={true}
                transitionLeave={true}>
                {nestedElem}
            </ReactCSSTransitionGroup>
        </div>
    )
}

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
            headerBlock2: null
        });
        this.setState = this.setState.bind(this);
        this.liftState = this.liftState.bind(this);
    }

    liftState(state_, lift) {
        console.log("`about` liftstate")
        this.setState({position: state_});
    }

    componentWillMount() {
        /*first check if some txtBlocks are already in the visible area*/
        setTimeout(
            () => {
                this.handleScroll()
            }, 500)

    }

    shouldComponentUpdate(prevProps, prevState) {
        let should = false;
        /*Prevent updates. DOESNT PREVENT IF COMPARING OBJECTS*/
        for(let key in prevState){
            if(prevState[key]!==this.state[key]){
                should = true;
            }
        }
        return should;
    }

    changesInfo = (prevProps, prevState) => {
        /*rerender information*/
        Object.entries(this.props).forEach(([key, val]) =>
            prevProps[key] !== val && console.log(`Prop '${key}' changed`)
        );
        Object.entries(this.state).forEach(([key, val]) =>
            prevState[key] !== val && console.log(`State '${key}' changed`)
        );
    }

    componentDidUpdate(prevProps, prevState) {/*попробовать вынести во внешний файл в обертке для переиспользования*/
        this.changesInfo(prevProps, prevState);
        //changesInfo(prevProps, prevState);
        /*smoothly hides bg*/
        if (this.refs._bg) {
            const {_bg} = this.refs;
            _bg.classList.add("opacity");
        }
        setTimeout(
            () => {
                console.log("lift state to <App/>")
                this.props.changeState(this.state.position)
            }, 1000
        );
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                let lastScrollY = window.scrollY;
                let screenY = window.innerHeight;
                if (lastScrollY > ((screenY * 0.0) - screenY)) this.setState({
                    txtBlock0: <GrowingBlock clName="about-skills-bg" header="ABOUT ME"/>
                });
                if (lastScrollY > ((screenY * 0.0) - screenY)) this.setState({
                    headerBlock0: <GrowingBlock clName="about-skills-bg" header="Hey, I'm Marc" paragraph="
Digital designer & front-end developer.
Get in touch

Currently a design systems engineer helping people design better at InVision.
Previously worked with Wonderbly, Vanity Fair, Great Little Place, Glamour, and Discovery Network.
"/>
                });
                if (lastScrollY > ((screenY * 1) - screenY)) this.setState({
                    txtBlock1: <GrowingBlock clName="about-skills-bg" header="Front-end Developer"
                                             paragraph={paragraph2}
                    />
                });
                if (lastScrollY > ((screenY * 1.1) - screenY)) this.setState({
                    headerBlock1: <GrowingBlock clName="about-skills-bg" header="ABOUT MY SKILLS"/>
                });
                if (lastScrollY > ((screenY * 1.25) - screenY)) this.setState({
                    txtBlock2: <GrowingBlock clName="about-skills-bg" header="ABOUT OBJECTIVES"/>
                });
                if (lastScrollY > ((screenY * 1.15) - screenY)) this.setState({
                    headerBlock2: <GrowingBlock clName="about-skills-bg" header="Header" paragraph="
    Ut ornare mi rhoncus nulla tempus, ut rhoncus elit ultricies.
    Quisque nec justo quis augue rutrum eleifend non placerat turpis.
    Ut sed erat ultrices, tristique enim eu, bibendum mi.
    Cras vitae lorem lobortis, iaculis tellus ut, consequat velit.
    Maecenas id lacus sit amet ligula imperdiet vestibulum ac et metus.
"/>
                });
                setTimeout(
                    () => {
                        ticking = false
                    }, 300
                )
            });
            ticking = true;
        }
    };

    render() {
        console.log("`about` rerendering");
        const menu = <Navigation menuItemClassName={this.props.menuItemClassName}
                                 section="about"
                                 home={true}
                                 onClick={this.liftState}></Navigation>;
        const txtBlock0 = this.state.txtBlock0;
        const headerBlock0 = this.state.headerBlock0;
        const txtBlock1 = this.state.txtBlock1;
        const headerBlock1 = this.state.headerBlock1;
        const txtBlock2 = this.state.txtBlock2;
        const headerBlock2 = this.state.headerBlock2;
        return (
            <>
            <section className="about">
                <ReactCSSTransitionGroup
                    component="div"
                    className="top-navigation-wrapper"
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
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
                    <Header
                        headerClass="about-head"
                        txtHeader={this.props.txtHeader}
                        txtUpper={this.props.txtUpper}
                        txtMain={this.props.txtMain}/>
                </ReactCSSTransitionGroup>
                <section className="txt-block-wrapper">
                    <Transition direction="left" nestedElem={txtBlock0} wrapperNumber="-0-"/>
                    <Transition direction="right" nestedElem={headerBlock0} wrapperNumber="-0-"/>
                    <Transition direction="left" nestedElem={txtBlock1} wrapperNumber="-1-"/>
                    <Transition direction="right" nestedElem={headerBlock1} wrapperNumber="-1-"/>
                    <Transition direction="left" nestedElem={txtBlock2} wrapperNumber="-2-"/>
                    <Transition direction="right" nestedElem={headerBlock2} wrapperNumber="-2-"/>
                    <CanvasBg/>
                </section>
            </section>

            </>
        );
    }
};

export {Header, About};
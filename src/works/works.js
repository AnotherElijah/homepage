import React, {Component} from "react"
import "../global-style.css"
import changesInfo from "../global-scripts.js"
import "./works.css"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Navigation} from "../home/home";
import {Header} from '../common-components/common-components';
import {CanvasBg} from "../canvas/canvas-bg";
import {GrowingBlock} from "../growing-block/growing-block"





let ticking = false;
class Works extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            position: "works"
        });
        this.setState = this.setState.bind(this);
        this.liftState = this.liftState.bind(this);
    }

    liftState(state_, lift) {
        console.log("`works` liftstate")
        this.setState({position: state_});
    }

    componentWillMount() {
        /*first check if some txtBlocks are already in the visible area*/
        setTimeout(
            () => {
                this.handleScroll()
            }, 500)
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    shouldComponentUpdate(prevProps, prevState) {
        let should = false;
        /*Prevent updates. DOESNT PREVENT IF COMPARING OBJECTS*/
        for (let key in prevState) {
            if (prevState[key] !== this.state[key]) {
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
    }

    handleScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                let lastScrollY = window.scrollY;
                let screenY = window.innerHeight;
                if (lastScrollY > ((screenY * 0.0) - screenY)) this.setState({});
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

        return (
            <>
            <section className="works">
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
                <CanvasBg/>
            </section>
            </>
        );
    }
};

export {Works};
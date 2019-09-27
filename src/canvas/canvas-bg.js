import React, {Component} from "react"
import Konva from 'konva';
/*images for bg. laid in Imgurl arr*/
import * as url0 from './assets/leaf-0.png';
import * as url1 from './assets/leaf-1.png';
import * as url2 from './assets/leaf-2.png';
import * as url3 from './assets/leaf-3.png';
import * as url0Orange from './assets/leaf-0-orange.png';
import * as url1Orange from './assets/leaf-1-orange.png';
import * as url2Orange from './assets/leaf-2-orange.png';
import * as url3Orange from './assets/leaf-3-orange.png';
import * as url0Green from './assets/leaf-0-green.png';
import * as url1Green from './assets/leaf-1-green.png';
import * as url2Green from './assets/leaf-2-green.png';
import * as url3Green from './assets/leaf-3-green.png';
/*number of BG-elements depends on imgurl length*/
const Imgurl = [url0, url1, url2, url3];
const ImgurlOrange = [url0Orange, url1Orange, url2Orange, url3Orange];
const ImgurlGreen = [url0Green, url1Green, url2Green, url3Green];
const randomiser = (constraitMax, constraitMin) => {
    return Math.floor(Math.random() * (constraitMax - constraitMin) + constraitMin);
};
const randomiserFloat = (constraitMax, constraitMin) => {
    return Math.random() * (constraitMax - constraitMin) + constraitMin;
};

class CanvasBg extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            appState: this.props.appState
        });
        this.setState = this.setState.bind(this);

    }

    componentWillUpdate() {
        //this.setState({appState:this.props.appState});
        this.setState({
            appState: this.props.appState
        });
    }

    componentDidMount() {
        let resizeFlag = true;
        window.addEventListener("resize", () => {
            /*canvas (leafs) runs after window resize(previous Animation stops) once in 2 seconds*/
            this.counter3++;
            if (resizeFlag) {
                resizeFlag = false;
                setTimeout(() => {
                    resizeFlag = true
                }, 2000);
                leafs(this.counter3);

            }
        });

        let leafs = () => {
            let width;
            let height;
            let widthCheck = window.innerWidth;
            let heightCheck = window.innerHeight;
            if (widthCheck >= 1900) {
                width = window.innerWidth;
                height = window.innerHeight * 2.9;
            } else if (widthCheck >= 1580 && widthCheck < 1900) {
                width = window.innerWidth;
                height = window.innerHeight * 3.2;
            } else if (widthCheck >= 1400 && widthCheck < 1580) {
                width = window.innerWidth;
                height = window.innerHeight * 5;
            } else if (widthCheck >= 1200 && widthCheck < 1400) {
                width = window.innerWidth;
                height = window.innerHeight * 3.8;
            } else if (widthCheck >= 800 && widthCheck < 1200) {
                width = window.innerWidth;
                height = window.innerHeight * 3.6;
            } else if (widthCheck >= 700 && widthCheck < 800) {
                width = window.innerWidth;
                height = window.innerHeight * 3.7;
            }
            /*screen sizes*/

            /*create canvas obj*/
            const stage = new Konva.Stage({
                container: this.canvasBg,
                width: width,
                height: height
            });
            const layer = new Konva.Layer();
            const generateImgDOMObj = (num, url) => {
                /*
                 * array of images with SRC from array of image paths (Imgurl)
                 * */
                let arr = [];
                let index = 0;
                for (let i = 0; i < num; i++) {
                    arr[i] = new Image();
                    arr[i].src = url[index];
                    index === url.length - 1 ? index = 0 : index++;
                }
                return arr;
            };
            /*About me*/
            let colorFlagA = false;
            /*My works*/
            let colorFlagB = false;
            /*Contacts*/
            let colorFlagC = false;

            window.addEventListener('hashchange', () => {
                window.scrollTo(0, 0);
                switch (window.location.hash) {
                    case '#about':
                        colorFlagA = true;
                        colorFlagB = false;
                        colorFlagC = false;
                        break;
                    case '#works':
                        colorFlagA = false;
                        colorFlagB = true;
                        colorFlagC = false;
                        break;
                    case '#contact':
                        colorFlagA = false;
                        colorFlagB = false;
                        colorFlagC = true;
                        break;
                }
            });
            const generateImgObj = (src) => {

                /*
                * generates 1 img obj.  src = picture`s url from generateImgDOMObj()
                * */

                /*dimension is one random number for width and height. Perspective effect*/
                let dimension = randomiser(70, 30);

                let imgObj = new Konva.Image({
                    x: randomiser(width * 1.5, width + 100),
                    y: randomiser(height, 0),
                    image: src,
                    width: dimension,
                    height: dimension,
                });
                imgObj.rotate(randomiser(360, 0));
                if (dimension > 70) imgObj.blurRadius(10);
                return imgObj;
            };
            let counter = 0;
            let testCounter = 0;

            /*counters for consistent assignment of SRC from Imgurl arrays*/
            let arrCounterA = 0;
            let arrCounterB = 0;
            let arrCounterC = 0;

            const runAnimation = (img, imgItem) => {
                counter++;
                testCounter++;

                window.addEventListener('hashchange', () => {
                    /*Stop animation when on the main page*/
                    if (window.location.hash === "#home") anim.stop();
                });

                /* Flags - help to change different SRCs for images.
                ** Different flags become true depending on click-target
                */

                const anim = new Konva.Animation(function (frame) {
                    /*move right to left*/
                    img.x(img.x() - randomiser(4, 2));
                    img.y(img.y() - randomiser(1, -0.7));
                    /*change angle*/
                    let random1 = randomiser(width * 1.5, width + 100);
                    img.rotate(randomiserFloat(0.9, 0.7));
                    /*every 24-th step change (visibly) z-dimension*/
                    if (counter % 24 === 0) {
                        counter = 0;
                        /*perspective*/
                        if (img.height() > 3) {
                            img.height(img.height() - 0.1);
                            img.width(img.height() - 0.1);
                        } else {
                            let dimension = randomiser(120, 50);
                            img.x(random1);
                            img.y(randomiser(height, 0));
                            img.height(dimension * 1.5);
                            img.width(dimension * 1.5);
                            if (colorFlagA) {
                                imgItem.src = Imgurl[arrCounterA];
                                arrCounterA < Imgurl.length - 1 ? arrCounterA++ : arrCounterA = 0;
                            }
                            if (colorFlagB) {
                                imgItem.src = ImgurlOrange[arrCounterB];
                                arrCounterB < ImgurlOrange.length - 1 ? arrCounterB++ : arrCounterB = 0;
                            }
                            if (colorFlagC) {
                                imgItem.src = ImgurlGreen[arrCounterC];
                                arrCounterC < ImgurlGreen.length - 1 ? arrCounterC++ : arrCounterC = 0;
                            }
                        }
                    } else {
                        counter++
                    }
                    /*Image src changes only when picture is outside the visible area of screen*/
                    if (img.x() < (-100)) {
                        img.x(random1);
                        if (colorFlagA) {
                            imgItem.src = Imgurl[arrCounterA];
                            arrCounterA < Imgurl.length - 1 ? arrCounterA++ : arrCounterA = 0;
                        }
                        if (colorFlagB) {
                            imgItem.src = ImgurlOrange[arrCounterB];
                            arrCounterB < ImgurlOrange.length - 1 ? arrCounterB++ : arrCounterB = 0;
                        }
                        if (colorFlagC) {
                            imgItem.src = ImgurlGreen[arrCounterC];
                            arrCounterC < ImgurlGreen.length - 1 ? arrCounterC++ : arrCounterC = 0;
                        }
                    } else if (img.y() < -100) {
                        img.y(randomiser(height, 0));
                        if (colorFlagA) {
                            imgItem.src = Imgurl[arrCounterA];
                            arrCounterA < Imgurl.length - 1 ? arrCounterA++ : arrCounterA = 0;
                        }
                        if (colorFlagB) {
                            imgItem.src = ImgurlOrange[arrCounterB];
                            arrCounterB < ImgurlOrange.length - 1 ? arrCounterB++ : arrCounterB = 0;
                        }
                        if (colorFlagC) {
                            imgItem.src = ImgurlGreen[arrCounterC];
                            arrCounterC < ImgurlGreen.length - 1 ? arrCounterC++ : arrCounterC = 0;
                        }
                    }
                }, layer);
                anim.start();
                window.addEventListener('resize',
                    ()=>anim.stop());
            };
            /*generateImgDOMObj() returns array of DOM images.*/
            let canvImgArr = generateImgDOMObj(
                20,
                window.location.hash === "#about" ? Imgurl
                    : window.location.hash === "#works" ? ImgurlOrange
                    : window.location.hash === "#contact" ? ImgurlGreen : null);

            /*run animation*/
            setTimeout(() => {
                let leaf;
                canvImgArr.forEach((item) => {
                    /*generates 1 img obj*/
                    leaf = generateImgObj(item);
                    /*add to canvas*/
                    layer.add(leaf);
                    let stateObj = {state: this.state.appState};
                    /*animation process*/
                    runAnimation(leaf, item, stateObj);
                });
                stage.add(layer);
            }, 500);
        }
        leafs();
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.className !== this.props.className) return true;
        return false
    }

    render() {/*this.props.appState*/
        return (
            <div className={"canvasBgWrapper " + this.props.className}>
                <div ref={ref => (this.canvasBg = ref)}></div>
            </div>
        )
    }
}


export {CanvasBg};
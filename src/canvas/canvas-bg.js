import React, {Component} from "react"
import Konva from 'konva';
/*images for bg. laid in Imgurl arr*/
import * as url0 from './assets/leaf-0.png';
import * as url1 from './assets/leaf-1.png';
import * as url2 from './assets/leaf-2.png';
import * as url3 from './assets/leaf-3.png';
/*number of BG-elements depends on imgurl length*/
const Imgurl = [url0, url1, url2, url3, url0, url1, url2, url3, url0, url1, url2, url3, url0, url1, url2, url3, url0, url1, url2, url3];



const randomiser = (constraitMax, constraitMin) => {
    return Math.floor(Math.random() * (constraitMax - constraitMin) + constraitMin);
};
const randomiserFloat = (constraitMax, constraitMin) => {
    return Math.random() * (constraitMax - constraitMin) + constraitMin;
};
class CanvasBg extends Component {
    componentDidMount() {

        /*screen sizes*/
        const width = window.innerWidth;
        const height = window.innerHeight*2;
        /*create canvas obj*/
        const stage = new Konva.Stage({
            container: this.canvasBg,
            width: width,
            height: height
        });
        const layer = new Konva.Layer();
        const generateImgDOMObj = (url) => {
            let arr = [];
            for (let i = 0; i < url.length; i++) {
                arr[i] = new Image();
                arr[i].src = url[i];
                /*arr*/
            }
            return arr;
        };
        /*
        * generates 1 img obj.  src = picture`s url from generateImgDOMObj()
        * */
        const generateImgObj = (src) => {
            /*dimension is one random number for width and height. Perspective effect*/
            let dimension = randomiser(120, 30);

            let imgObj = new Konva.Image({
                x: randomiser(width*1.5, width+100),
                y: randomiser(height, 0),
                image: src,
                width: dimension*1.5,
                height: dimension*1.5,
            });
            imgObj.rotate(randomiser(360, 0));
            if (dimension > 100) imgObj.blurRadius(10);
            return imgObj;
        };
        let counter = 0;

        const runAnimation = (img) => {
            counter++;
            const anim = new Konva.Animation(function (frame) {
                /*move right to left*/
                img.x(img.x() - randomiser(4, 2));
                img.y(img.y() - randomiser(1, -0.7));
                /*change angle*/
                let random1=randomiser(width*1.5, width+100);
                img.rotate(randomiserFloat(0.9, 0.2));
                /*every 24-th step change (visibly) z-dimension*/
                if (counter % 24 === 0) {
                    counter = 0;

                    /*perspective*/
                    if (img.height() > 3) {
                        img.height(img.height() - 0.1);
                        img.width(img.height() - 0.1);

                    } else {
                        let dimension = randomiser(120, 30);
                        img.x(random1);
                        img.y(randomiser(height, 0));
                        img.height(dimension*1.5);
                        img.width(dimension*1.5);
                    }
                } else {
                    counter++
                }

                /**/
                if (img.x() < (-100)) {
                    img.x(random1);
                } else if (img.y() < -100) {
                    img.y(randomiser(height, 0));
                }
            }, layer);
            anim.start();
        };
        let canvImgArr = generateImgDOMObj(Imgurl);

        /*run animation*/
        canvImgArr[0].onload = function () {
            let leaf;
            canvImgArr.forEach((item, i) => {
                leaf = generateImgObj(item);
                layer.add(leaf);
                runAnimation(leaf);
            });
            stage.add(layer);

        };


    }
    //shouldComponentUpdate(){
      //  return false
    //}
    render() {
        return (
            <div className="canvasBgWrapper">
                <div ref={ref => (this.canvasBg = ref)}></div>
            </div>
        )
    }
}


export {CanvasBg};
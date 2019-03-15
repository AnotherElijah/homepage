import React from 'react';

const GrowingBlockTxt = ({growingBlockH, growingBlockP}) => {
    return (<div className="txt-block">
        <h3>{growingBlockH}</h3>
        <p>{growingBlockP}</p>
    </div>)
};
const GrowingBlock = ({clName, header, paragraph}) => {
    return (<div className={clName + "-wrapper"}>
        <div className={clName}>
            <GrowingBlockTxt growingBlockH = {header} growingBlockP = {paragraph}/>
        </div>
    </div>)
};

export {GrowingBlock, GrowingBlockTxt};
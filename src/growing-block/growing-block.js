import React from 'react';

const GrowingBlockTxt = ({header, body}) => {
    return (<div className="txt-block">
        <h3>{header}</h3>
        <section>{body}</section>
    </div>)
};
const GrowingBlock = ({clName, header, paragraph}) => {
    return (<div className={clName + "-wrapper"}>
        <div className={clName}>
            <GrowingBlockTxt header = {header} body = {paragraph}/>
        </div>
    </div>)
};

export {GrowingBlock, GrowingBlockTxt};
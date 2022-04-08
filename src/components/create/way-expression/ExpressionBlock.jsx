import React, {useRef} from "react";
import '../../../styles/CreationPages.css'
import LabelInBlock from "../LabelInBlock";
import FunctionsAccordion from "./FunctionsAccordion";
import ExpressionField from "./ExpressionField";

function ExpressionBlock(
    {
        expression,
        setExpression,
        handleExpression,
        dataFunctions,
        height,
        position,
        setPosition
    }
) {

    const focus = useRef(null)

    return (
        <div className="double__block">
            <div className="background__card">
                <LabelInBlock label={"Выражение"}/>
                <ExpressionField
                    expression={expression}
                    height={height}
                    setExpression={setExpression}
                    handleExpression={handleExpression}
                    focus={focus}
                    position={position}
                    setPosition={setPosition}
                />
            </div>
            <div className="background__card">
                <LabelInBlock label={"Функции"}/>
                <FunctionsAccordion
                    height={height}
                    setExpression={setExpression}
                    dataFunctions={dataFunctions}
                    focus={focus}
                    setPosition={setPosition}
                />
            </div>
        </div>
    );
}

export default ExpressionBlock;
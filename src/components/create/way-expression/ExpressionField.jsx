import {Button, TextField} from "@mui/material";
import React, {useEffect, useRef} from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function ExpressionField(
    {
        expression,
        height,
        handleExpression,
        setExpression,
        focus,
        position,
        setPosition
    }
) {

    useEffect(() => {
        if (focus !== null) {
            focus.current.selectionEnd = position
            focus.current.selectionStart = position
        }
    }, [position])

    return (
        <div style={{height: height, width: 730}}>
            <ButtonOperands setExpression={setExpression} focus={focus} setPosition={setPosition}/>
            <TextField
                sx={{
                    marginTop: "10px",
                    width: "100%",
                    color: "#366ac3"
                }}
                value={expression}
                multiline
                onChange={handleExpression}
                inputRef={focus}
                rows={19}
            />
            <Report/>
        </div>
    );
}

function ButtonOperands({setExpression, focus, setPosition}) {

    const buttonStyle = {
        height: "35px",
        width: "45px",
        color: "#366ac3",
        padding: "5px",
        minWidth: "unset",
        marginLeft: "15px",
        borderRadius: "8px",
        border: "1px solid rgba(54, 106, 195, 100)"
    }

    return (
        <div className="button__operands">
            <Button
                sx={buttonStyle}
                onClick={() => {
                    setExpression((expression) => {
                        const position = focus.current.selectionEnd
                        const left = expression.substring(0, position) + '()'
                        setPosition(left.length - 1)
                        return left + expression.substring(position)
                    })
                    focus.current.focus()
                }}
            >
                <p className="button__operand__text">( )</p>
            </Button>
            <Button
                sx={buttonStyle}
                onClick={() => {
                    setExpression((expression) => {
                        const position = focus.current.selectionEnd
                        const left = expression.substring(0, position) + '[]'
                        setPosition(left.length - 1)
                        return left + expression.substring(position)
                    })
                    focus.current.focus()
                }}
            >
                <p className="button__operand__text">[ ]</p>
            </Button>
            <Button
                sx={buttonStyle}
                onClick={() => {
                    setExpression((expression) => {
                        const position = focus.current.selectionEnd
                        const left = expression.substring(0, position) + ' & '
                        setPosition(left.length)
                        return left + expression.substring(position)
                    })
                    focus.current.focus()
                }}
            >
                <p className="button__operand__text">&</p>
            </Button>
            <Button
                sx={buttonStyle}
                onClick={() => {
                    setExpression((expression) => {
                        const position = focus.current.selectionEnd
                        const left = expression.substring(0, position) + ' | '
                        setPosition(left.length)
                        return left + expression.substring(position)
                    })
                    focus.current.focus()
                }}
            >
                <p className="button__operand__text">|</p>
            </Button>
            <Button
                sx={buttonStyle}
                onClick={() => {
                    setExpression((expression) => {
                        const position = focus.current.selectionEnd
                        const left = expression.substring(0, position) + ' - '
                        setPosition(left.length)
                        return left + expression.substring(position)
                    })
                    focus.current.focus()
                }}
            >
                <RemoveIcon/>
            </Button>
            <Button sx={buttonStyle}>
                <PlayArrowIcon/>
            </Button>
        </div>
    );
}

function Report() {
    return (
        <div className="report">
            <div className="report__line">
                <p>Количество студентов:</p>
                <p style={{marginLeft: "20px"}}>30</p>
            </div>
            <div className="report__line">
                <p>Синтаксис: </p>
                <p style={{marginLeft: "20px"}}>Successful!</p>
            </div>
        </div>
    );
}

export default ExpressionField
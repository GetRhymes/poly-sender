import {Button, TextField} from "@mui/material";
import React, {useEffect, useRef} from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";
import '../../../styles/CreationPages.css'
import IconButton from "@mui/material/IconButton";
import InfoIcon from '@mui/icons-material/Info';
import ViewListIcon from '@mui/icons-material/ViewList';

function ExpressionField(
    {
        expression,
        height,
        handleExpression,
        setExpression,
        focus,
        position,
        setPosition,
        setLoading,
        status,
        setStatus,
        students,
        setStudents,
        setCheckAbout,
        setInfoStudents
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
            <ButtonOperands
                expression={expression}
                setExpression={setExpression}
                focus={focus}
                setPosition={setPosition}
                setLoading={setLoading}
                setStudents={setStudents}
                setStatus={setStatus}
            />
            <TextField
                focused={true}
                sx={{
                    marginTop: "10px",
                    width: "100%",
                    color: "#366ac3"
                }}
                value={expression}
                multiline
                onChange={handleExpression}
                inputRef={focus}
                color={ status !== "" ? status : null }
                rows={height === 550 ? 17 : 19}
            />
            <Report status={status} students={students} setCheckAbout={setCheckAbout} setInfoStudents={setInfoStudents}/>
        </div>
    );
}

function ButtonOperands({expression, setExpression, focus, setPosition, setLoading, setStatus, setStudents}) {

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
            <Button
                sx={buttonStyle}
                onClick={() => {
                    if (expression !== "") {
                        calculateExpression(setLoading, expression, setStatus, setStudents)
                    }
                }}
            >
                <PlayArrowIcon/>
            </Button>
        </div>
    );
}

function Report({status, students, setCheckAbout, setInfoStudents}) {
    return (
        <div className="block__report">
            <div className="report">
                <div className={"report__line " + status}>
                    <p>Количество студентов:</p>
                    <p style={{marginLeft: "20px"}}>{students.length}</p>

                </div>
                <div className={"report__line " + status}>
                    <p>Синтаксис: </p>
                    <p style={{marginLeft: "20px"}}>{getStatus(status)}</p>

                </div>
            </div>
            <div className="buttons__report">
                <div style={{ height: "24px", width: "24px", marginTop: "9px", marginLeft: "20px"}}>
                    {
                        students.length > 0 ?
                            <IconButton sx={{ padding: "5px"}} onClick={()=> setInfoStudents(true)}>
                                <ViewListIcon/>
                            </IconButton>
                            :
                            null
                    }
                </div>
                <div style={{ height: "24px", width: "24px", marginTop: "11px", marginLeft: "20px"}}>
                    {
                        status !== "" && status !== undefined && status !== null ?
                            <IconButton sx={{ padding: "5px"}} onClick={() => setCheckAbout(true)}>
                                <InfoIcon fontSize="medium"/>
                            </IconButton>
                            :
                            null
                    }
                </div>
            </div>
        </div>
    );
}

function getStatus(status) {
    if (status === 'success') return "Successful!"
    if (status === 'warning') return "Warning!"
    if (status === 'error') return "Error!"
}

async function calculateExpression(setLoading, expression, setStatus, setStudents) {
    setLoading(true)
    const data = {
        "expression": expression
    }
    const computedExpression = await axios.post('http://localhost:8080/attributes/calculate', data)
    setStatus(computedExpression.data.status)
    setStudents(computedExpression.data.students)
    setLoading(false)
}

export default ExpressionField
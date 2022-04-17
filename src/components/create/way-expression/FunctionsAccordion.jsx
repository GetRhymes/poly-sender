import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

function FunctionsAccordion({dataFunctions, height, focus, setExpression, setPosition}) {

    const styleListItem = {
        height: "35px",
        paddingTop: "4px",
        paddingLeft: "0px",
        paddingBottom: "4px"
    }

    const styleAccordion = {
        paddingTop: "4px",
        paddingBottom: "4px",
        position: "unset"
    }

    const styleAccordionSummary = {
        minHeight: "35px",
        height: "35px",
        marginTop: "4px",
        marginBottom: "4px"
    }

    const addButtonStyle = {
        height: "27px",
        width: "30px",
        color: "#366ac3",
        padding: "5px",
        minWidth: "unset",
        marginLeft: "15px",
        borderRadius: "8px",
        border: "1px solid rgba(54, 106, 195, 100)",
        marginRight: "15px"
    }

    return(
        <Box height={height} overflow="auto">
            {
                dataFunctions.map(({id, groupName, attributes}) =>
                    <Accordion
                        inputprops={{
                            position: "initial"
                        }}
                        disableGutters={true}
                        sx={styleAccordion}
                        key={id + "head"}
                    >
                        <AccordionSummary
                            sx={styleAccordionSummary}
                            expandIcon={<ExpandMoreIcon/>}
                            key={id + "sum"}
                        >
                            <Typography key={id + "sumtext"}>{groupName}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={styleAccordion} key={id + "det"}>
                            <Divider/>
                            <List>
                                {attributes.map((item) =>
                                    <ListItem sx={styleListItem} key={item + "listItem"}>
                                        <Button
                                            sx={addButtonStyle}
                                            onClick={()=> {
                                                setExpression((expression)=> {
                                                    const position = focus.current.selectionEnd
                                                    const left = expression.substring(0, position) + groupName + '[' + item + ']'
                                                    setPosition(left.length)
                                                    return left + expression.substring(position)
                                                })
                                                focus.current.focus()
                                            }}
                                        >
                                            <EditIcon fontSize="small"/>
                                        </Button>
                                        <ListItemText key={item + "text"} primary={item}/>
                                    </ListItem>
                                )}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                )
            }
        </Box>
    );
}

export default FunctionsAccordion;
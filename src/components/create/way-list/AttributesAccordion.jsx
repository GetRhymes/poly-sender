import React, {useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

function AttributesAccordion({dataAccordions, setSample, height}) {

    const styleListItem = {
        paddingTop: "4px",
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


    function initState() {
        const result = {}
        for (let accord of dataAccordions) {
            result[accord.groupName] = {}
            for (let it of accord.attributes) {
                result[accord.groupName][it] = false
            }
        }
        return result
    }

    const [checkBoxState, setCheckBoxState] = useState(initState())

    const handleCheck = (event) => {
        const name = event.target.name
        const id = event.target.id
        const value = event.target.checked
        const accords = {...checkBoxState}
        accords[name][id] = value
        setCheckBoxState(accords);
        setSample({name, id, value})
    }

    return (
        <Box height={height} overflow="auto">
            {
                dataAccordions.map(({id, groupName, attributes}) =>
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
                                {attributes.sort().map((item) =>
                                    <ListItem sx={styleListItem} key={item + "listItem"}>
                                        <Checkbox
                                            id={item}
                                            key={item + "checkBox"}
                                            name={groupName}
                                            onChange={handleCheck}
                                            checked={checkBoxState[groupName][item]}
                                        />
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

export default AttributesAccordion;
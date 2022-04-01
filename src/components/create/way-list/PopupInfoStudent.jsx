import React from "react";
import {Box, ListItem, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import '../../../styles/Create.css'
import Divider from "@mui/material/Divider";

function PopupInfoStudent({popupActive, setPopupActive, info, attributes}) {

    const sxFirst = {
        width: "170px",
        color: "#366ac3",
        fontStyle: "normal",
        flex: "unset"
    }

    const sxSecond = {
        color: "#494949",
        fontStyle: "normal",
    }

    return (
        <div className={popupActive ? "popup active" : "popup"} onClick={() => setPopupActive(false)}>
            <div className="popup__info" onClick={e => e.stopPropagation()}>
                <div className={"popup__label"}>
                    <p>{info["name"]}</p>
                </div>
                <List>
                    {attributes.map(({id, groupName}) => {
                        return (
                            <Box key={id}>
                                <ListItem sx={{ paddingBottom: "0", paddingTop: "0" }}>
                                    <ListItemText sx={sxFirst} key={id + "first"}>{groupName + ":"}</ListItemText>
                                    <ListItemText sx={sxSecond} key={id + "second"}>
                                        {info.attributes === undefined ? "" : info.attributes[groupName]}
                                    </ListItemText>
                                </ListItem>
                                <Divider/>
                            </Box>
                        )
                    })}
                </List>
            </div>
        </div>
    );
}

export default PopupInfoStudent;
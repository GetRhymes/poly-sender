import {Box} from "@mui/material";
import List from "@mui/material/List";
import React from "react";
import RequestBlock from "./RequestBlock";

function AccessCenterBlock({dataAccess, searchValue, dataRoles, setLoading}) {
    return (
        <Box height="calc(100% - 50px)" overflow="auto" sx={{marginTop: "10px"}}>
            <List sx={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                {
                    dataAccess.map((request) => {
                        if (searchValue !== null && searchValue !== "") {
                            if (request.fullName.includes(searchValue)) {
                                return (<RequestBlock key={request.idRequest} request={request} dataRoles={dataRoles} setLoading={setLoading}/>)
                            }
                        } else return (<RequestBlock key={request.idRequest} request={request} dataRoles={dataRoles} setLoading={setLoading}/>)
                    })
                }
            </List>
        </Box>
    );
}

export default AccessCenterBlock
import React from 'react';
import '../../../styles/Create.css'
import {Box, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {FixedSizeList} from 'react-window';
import Divider from "@mui/material/Divider";


export const students3 = [
    {
        name: "1234",
        email: "dmskfsd"
    }, {
        name: "123324",
        email: "dmskfsd"
    }, {
        name: "123234",
        email: "d323mskfsd"
    }, {
        name: "12342344",
        email: "dm4234skfsd"
    }, {
        name: "1234",
        email: "dmsk1312432fsd"
    }, {
        name: "12325534",
        email: "dms523565634kfsd"
    }, {
        name: "1234532rfd34",
        email: "dmsk553543fsd"
    }, {
        name: "123vsvsv4",
        email: "dmvsdsdskfsd"
    }, {
        name: "123ssdeg4",
        email: "dmsvsvsdvkfsd"
    }, {
        name: "123bdfbd4",
        email: "dmsbfdbdkfsd"
    }, {
        name: "123fdbdfb4",
        email: "ddbfbdbmskfsd"
    }, {
        name: "1dtt3rr234",
        email: "dmfdvfdvdskfsd"
    }, {
        name: "12dfvdb34",
        email: "dmsbdfbfdbkfsd"
    },
]


function PopupStudentsList({active, setActive, students}) {
    const styleText = {
        width: "325px",
        display: "flex",
        justifyContent: "center"
    }

    function renderRow({index, style}) {

        return (
            <ListItem
                style={style}
                key={index}
                component="div"
                // sx={{ marginLeft: "25px" }}
                disablePadding
            >
                <ListItemText>
                    <p style={styleText}>{students[index].name}</p>
                </ListItemText>
                <ListItemText >
                    <p style={styleText}>{students[index].email}</p>
                </ListItemText>
            </ListItem>
        );
    }

    function VirtualizedList({students}) {
        return (
            <Box
                sx={{width: '100%', height: 350, maxWidth: "650px", bgcolor: 'background.paper', paddingBottom: "10px"}}
            >
                <FixedSizeList
                    height={380}
                    width={650}
                    itemSize={40}
                    itemCount={students.length}
                    overscanCount={5}
                >
                    {renderRow}
                </FixedSizeList>
            </Box>
        );
    }

    return (
        <div className={active ? "popup active" : "popup"} onClick={() => setActive(false)}>
            <div className="popup__list__students" onClick={e => e.stopPropagation()}>
                <div className={"popup__label"}>
                    <p>Студенты</p>
                </div>
                <ListItem
                    component="div"
                    disablePadding
                    // sx={{ marginLeft: "25px"}}
                >
                    <ListItemText>
                        <p style={styleText}>ФИО</p>
                    </ListItemText>
                    <ListItemText>
                        <p style={styleText}>Почтовый адрес</p>
                    </ListItemText>
                </ListItem>
                <Divider/>
                <VirtualizedList students={students}/>
            </div>
        </div>
    );
}

export default PopupStudentsList;


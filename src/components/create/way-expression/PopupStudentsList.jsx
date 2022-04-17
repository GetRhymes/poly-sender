import React from 'react';
import '../../../styles/Create.css'
import {Box, ListItem, ListItemText} from "@mui/material";
import {FixedSizeList} from 'react-window';
import Divider from "@mui/material/Divider";

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
                    itemCount={students !== null ? students.length : 0}
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


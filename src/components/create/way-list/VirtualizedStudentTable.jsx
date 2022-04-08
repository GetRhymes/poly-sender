import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles} from '@mui/styles';
import {createTheme} from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import {AutoSizer, Column, Table} from 'react-virtualized';
import {Box, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import '../../../styles/Create.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckBoxTable from "./CheckBoxTable";

const styles = (theme) => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    table: {
        '& .ReactVirtualized__Table__headerRow': {
            ...(theme.direction === 'rtl' && {
                paddingLeft: '0 !important',
            }),
            ...(theme.direction !== 'rtl' && {
                paddingRight: undefined,
            }),
        },
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    },
});

class MuiVirtualizedTable extends React.PureComponent {
    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };

    getRowClassName = ({index}) => {
        const {classes, onRowClick} = this.props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer = ({cellData, columnIndex}) => {
        let {columns, classes, rowHeight, onRowClick} = this.props;
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{
                    height: rowHeight,
                    padding: "8px"
                }}
                align={
                    (columnIndex != null && columns[columnIndex].numeric) || false
                        ? 'right'
                        : 'left'
                }
            >
                {
                    columnIndex === 0
                        ?
                        <CheckBoxTable
                            id={cellData.id}
                            isSelected={cellData.isSelected}
                            setSelectedStudents={cellData.setter}
                        />
                        :
                        cellData
                }
            </TableCell>
        );
    };

    headerRenderer = ({label, columnIndex}) => {
        const {headerHeight, columns, classes} = this.props;

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{
                    height: headerHeight,
                    padding: "8px"
                }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>
                    {
                        label === 'ФИО' ?
                            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                <TextField sx={{width: "200px"}} id="input-with-sx" label={label} variant="standard"/>
                                <SearchIcon sx={{color: 'action.active'}}/>
                            </Box>
                            :
                            label
                    }

                </span>
            </TableCell>
        );
    };

    render() {

        const {classes, columns, rowHeight, headerHeight, ...tableProps} = this.props;

        return (
            <AutoSizer>
                {({height, width}) => (
                    <Table
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        gridStyle={{
                            direction: 'inherit',
                        }}
                        headerHeight={headerHeight}
                        className={classes.table}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({dataKey, ...other}, index) => {
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    {...other}
                                />

                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            numeric: PropTypes.bool,
            width: PropTypes.number.isRequired,
        }),
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowHeight: PropTypes.number,
};

const defaultTheme = createTheme();
const VirtualizedTable = withStyles(styles, {defaultTheme})(MuiVirtualizedTable);

function createData(id, checkBox, fullName, email, more) {
    return {id, checkBox, fullName, email, more};
}

export default function VirtualizedStudentTable(
    {
        setPopupActive,
        dataTable,
        selectedStudents,
        setSelectedStudents,
        height,
        setCurrentId
    }) {

    return (
        <Paper style={{height: height, width: 730}}>
            <VirtualizedTable
                onRowClick={({index}) => {
                    setCurrentId(dataTable[index].id)
                    setPopupActive(true)
                }}
                rowCount={dataTable.length}
                rowGetter={
                    ({index}) => {
                        const student = dataTable[index]
                        return createData(
                            student.id,
                            {
                                id: dataTable[index].id,
                                isSelected: selectedStudents[dataTable[index].id],
                                setter: setSelectedStudents
                            },
                            student.name,
                            student.email,
                            <MoreVertIcon fontSize="medium"/>
                        );
                    }
                }
                columns={[
                    {
                        width: 60,
                        label: '',
                        dataKey: 'checkBox'
                    },
                    {
                        width: 355,
                        label: 'ФИО',
                        dataKey: 'fullName',
                    },
                    {
                        width: 355,
                        label: 'Почта',
                        dataKey: 'email',
                    },
                    {
                        width: 60,
                        label: '',
                        dataKey: 'more',
                    },
                ]}
            />
        </Paper>
    );
}
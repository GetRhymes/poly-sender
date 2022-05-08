import * as React from 'react';
import {useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {styled} from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import {AutoSizer, Column, Table} from 'react-virtualized';
import CheckboxUser from "./CheckBoxUser";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@mui/material/IconButton";
import {deleteUser} from "../../util/AsyncFunctionAdmin";
import {PathContext} from "../../context";

const classes = {
    flexContainer: 'ReactVirtualizedDemo-flexContainer',
    tableRow: 'ReactVirtualizedDemo-tableRow',
    tableRowHover: 'ReactVirtualizedDemo-tableRowHover',
    tableCell: 'ReactVirtualizedDemo-tableCell',
    noClick: 'ReactVirtualizedDemo-noClick',
};

const styles = ({theme}) => ({
    '& .ReactVirtualized__Table__headerRow': {
        ...(theme.direction === 'rtl' && {
            paddingLeft: '0 !important',
        }),
        ...(theme.direction !== 'rtl' && {
            paddingRight: undefined,
        }),
    },
    [`& .${classes.flexContainer}`]: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    [`& .${classes.tableRow}`]: {
        cursor: 'pointer',
    },
    [`& .${classes.tableRowHover}`]: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    [`& .${classes.tableCell}`]: {
        flex: 1,
    },
    [`& .${classes.noClick}`]: {
        cursor: 'initial',
    },
});

class MuiVirtualizedTable extends React.PureComponent {
    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };

    getRowClassName = ({index}) => {
        const {onRowClick} = this.props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer = ({cellData, columnIndex}) => {
        const {columns, rowHeight, onRowClick} = this.props;
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{
                    height: rowHeight,
                    padding: "8px",
                    justifyContent: columnIndex === 4 || columnIndex === 5 ? 'center' : 'unset'
                }}
                align={
                    (columnIndex != null && columns[columnIndex].numeric) || false
                        ? 'right'
                        : 'left'
                }
            >
                {columnIndex === 4 || columnIndex === 5 ?
                    <CheckboxUser id={cellData.id} checked={cellData.value}/> : cellData}
            </TableCell>
        );
    };

    headerRenderer = ({label, columnIndex}) => {
        const {headerHeight, columns} = this.props;

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{
                    height: headerHeight,
                    padding: "8px",
                    justifyContent: columnIndex === 4 || columnIndex === 5 ? 'center' : 'unset'
                }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>{label}</span>
            </TableCell>
        );
    };

    render() {
        const {columns, rowHeight, headerHeight, ...tableProps} = this.props;
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

const VirtualizedTable = styled(MuiVirtualizedTable)(styles);

function createData(id, emptyStart, lastName, firstName, patronymic, admin, user, date, edit) {
    return {id, emptyStart, lastName, firstName, patronymic, admin, user, date, edit};
}

export default function UsersTable({dataUsers, setUser, setPopupActive, setIndex, setLoading, setData}) {

    const {handleAccess} = useContext(PathContext)

    return (
        <Paper style={{height: "100%", width: "1100px"}}>
            <VirtualizedTable
                onRowClick={({index}) => {
                    setUser(dataUsers[index])
                    setIndex(index)
                    setPopupActive(true)
                }}
                rowCount={dataUsers.length}
                rowGetter={
                    ({index}) => {
                        const staff = dataUsers[index]
                        return createData(
                            staff.id,
                            '',
                            staff.lastName,
                            staff.firstName,
                            staff.patronymic,
                            {
                                "id": staff.id,
                                "value": staff.admin
                            },
                            {
                                "id": staff.id,
                                "value": staff.user
                            },
                            staff.date,
                            <IconButton onClick={(event) => {
                                event.stopPropagation()
                                deleteUser(staff.id, setLoading, handleAccess, setData)
                            }}>
                                <ClearIcon fontSize="medium"/>
                            </IconButton>
                        )
                    }}
                columns={[
                    {
                        width: 50,
                        label: '',
                        dataKey: 'emptyStart'
                    },
                    {
                        width: 200,
                        label: 'Фамилия',
                        dataKey: 'lastName'
                    },
                    {
                        width: 200,
                        label: 'Имя',
                        dataKey: 'firstName'
                    },
                    {
                        width: 200,
                        label: 'Отчество',
                        dataKey: 'patronymic'
                    },
                    {
                        width: 200,
                        label: 'Администратор',
                        dataKey: 'admin'
                    },
                    {
                        width: 200,
                        label: 'Пользователь',
                        dataKey: 'user'
                    },
                    {
                        width: 200,
                        label: 'Дата обновления',
                        dataKey: 'date'
                    },
                    {
                        width: 70,
                        label: '',
                        dataKey: 'edit'
                    },
                ]}
            />
        </Paper>
    );
}
import React, {useContext} from 'react';
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import SendIcon from "@mui/icons-material/Send";
import {Accordion, AccordionDetails, AccordionSummary, Button} from "@mui/material";
import FilterRowInfo from "./FilterRowInfo";
import ButtonActionGroup from "../ButtonActionGroup";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import {getEmails} from "../../util/AsyncFunctionFilters";
import {PathContext} from "../../context";

function FilterAccordionItem(
    {
        filter,
        setId,
        setPopupShareActive,
        setLoading,
        setNameFilter,
        setSelectedMailOption
    }) {

    return (
        <Accordion
            inputprops={{position: "initial"}}
            sx={{marginBottom: "10px"}}
            disableGutters={true}
        >
            <FilterAccordionSummary filter={filter}/>
            <FilterAccordionDetails
                filter={filter}
                setId={setId}
                setPopupShareActive={setPopupShareActive}
                setLoading={setLoading}
                setNameFilter={setNameFilter}
                setSelectedMailOption={setSelectedMailOption}
            />
        </Accordion>
    );
}

function FilterAccordionSummary({filter}) {
    return (
        <AccordionSummary>
            <div className="header__accordion__container">
                <div className={!filter.link ? "header__accordion__block" : "header__accordion__block header__accordion__disabled"}>
                    {ModeFilter(filter.mode)}
                    <p className="header__accordion__label">{filter.filterName}</p>
                </div>
                {
                    filter.status === "warning" ?
                        <WarningIcon sx={{marginRight: "10px", color: "#f6d65e"}}/>
                        :
                        filter.status === "error" ?
                            <ReportIcon sx={{marginRight: "10px", color: "#ff5f5f"}}/>
                            :
                            <div style={{height: "24px", width: "24px", marginRight: "10px"}}/>

                }
            </div>
        </AccordionSummary>
    );
}

function FilterAccordionDetails(
    {
        filter,
        setId,
        setPopupShareActive,
        setLoading,
        setNameFilter,
        setSelectedMailOption
    }
) {

    const {handleAccess} = useContext(PathContext)

    return (
        <AccordionDetails>
            <div className="background body__accordion__container">
                <div className="body__accordion__info">
                    <FilterRowInfo nameRow="Почтовый адрес:" valueRow={filter.mail} link={filter.link}/>
                    <FilterRowInfo nameRow="Количество студентов:" valueRow={filter.students.length}
                                   link={filter.link}/>
                    <FilterRowInfo nameRow="Создан:" valueRow={getType(filter.type)} link={filter.link}/>
                    <FilterRowInfo nameRow="Режим:" valueRow={filter.mode} link={filter.link}/>
                    {filter.mode === "manual" ?
                        <FilterRowInfo nameRow="Полученные ответы:" valueRow={filter.mailCounter} link={filter.link}/> : null}
                    <FilterRowInfo nameRow="Дата создания:" valueRow={filter.created} link={filter.link}/>
                </div>
                <div className="body__accordion__buttons">
                    <ButtonActionGroup
                        orientation="horizontal"
                        endPoint="filters"
                        type={filter.type}
                        id={filter.id}
                        setId={setId}
                        setPopupShareActive={setPopupShareActive}
                        setLoading={setLoading}
                        name={filter.filterName}
                        setName={setNameFilter}
                        selectedOption={filter.mode}
                        setSelectedOption={setSelectedMailOption}
                        link={filter.link}
                        basic={false}
                    />
                    {filter.mode === "manual" ?
                        <Button
                            sx={{border: "1px solid rgba(25, 118, 210, 0.5)"}}
                            onClick={() => getEmails(filter.id, setLoading, handleAccess)}
                        >
                            Получить
                        </Button> : null}

                </div>
            </div>
        </AccordionDetails>
    );
}

function ModeFilter(mode) {
    const style = {color: "#366ac3"}
    const manual = <ScheduleSendIcon sx={style}/>
    const noReply = <CancelScheduleSendIcon sx={style}/>
    const auto = <SendIcon sx={style}/>
    if (mode === "auto") return auto
    else if (mode === "manual") return manual
    else return noReply

}

function getType(type) {
    if (type === "list") return "из списка"
    else if (type === "expression") return "выражение"
    else return ""
}

export default FilterAccordionItem;
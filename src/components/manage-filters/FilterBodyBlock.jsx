import React from 'react';
import {Box} from "@mui/material";
import List from "@mui/material/List";
import FilterAccordionItem from "./FilterAccordionItem";
import {dataFilters} from "../data/data";

function FilterBodyBlock({setId, searchValue, setPopupShareActive}) {
    return (
        <Box height="calc(100% - 50px)" overflow="auto" sx={{marginTop: "10px"}}>
            <List>
                {dataFilters.map((filter) => {
                    if (searchValue !== null) {
                        if (filter.filter_name.includes(searchValue)) {
                            return (
                                <FilterAccordionItem
                                    filter={filter}
                                    setId={setId}
                                    setPopupShareActive={setPopupShareActive}
                                />
                            );
                        }
                    } else {
                        return (
                            <FilterAccordionItem
                                filter={filter}
                                setId={setId}
                                setPopupShareActive={setPopupShareActive}
                            />
                        );
                    }
                })}
            </List>
        </Box>
    );
}

export default FilterBodyBlock;
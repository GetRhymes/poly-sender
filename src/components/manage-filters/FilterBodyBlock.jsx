import React from 'react';
import {Box} from "@mui/material";
import List from "@mui/material/List";
import FilterAccordionItem from "./FilterAccordionItem";

function FilterBodyBlock(
    {
        setId,
        searchValue,
        setPopupShareActive,
        dataFilters,
        setLoading,
        setNameFilter,
        setSelectedMailOption
    }
) {
    return (
        <Box height="calc(100% - 50px)" overflow="auto" sx={{marginTop: "10px"}}>
            <List>
                {dataFilters.map((filter) => {
                    if (searchValue !== null) {
                        if (filter.filterName.includes(searchValue)) {
                            return (
                                <FilterAccordionItem
                                    key={filter.id}
                                    filter={filter}
                                    setId={setId}
                                    setPopupShareActive={setPopupShareActive}
                                    setLoading={setLoading}
                                    setNameFilter={setNameFilter}
                                    setSelectedMailOption={setSelectedMailOption}
                                />
                            );
                        }
                    } else {
                        return (
                            <FilterAccordionItem
                                key={filter.id}
                                filter={filter}
                                setId={setId}
                                setPopupShareActive={setPopupShareActive}
                                setLoading={setLoading}
                                setNameFilter={setNameFilter}
                                setSelectedMailOption={setSelectedMailOption}
                            />
                        );
                    }
                })}
            </List>
        </Box>
    );
}

export default FilterBodyBlock;
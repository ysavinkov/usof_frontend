import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useContext } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import { Pagination } from "react-bootstrap";

const Sorting = observer(() => {
    const { poststore } = useContext(Context);
    const sortByArray = ["rating", "createdAt"];

    return (
        <div style={{ display: "flex" }}>
            <Pagination className="mt-3">
                {sortByArray.map((sortBy) => (
                    <Pagination.Item
                        key={sortBy}
                        active={poststore.sortBy === sortBy}
                        onClick={() => poststore.setSortBy(sortBy)}
                    >
                        {sortBy}
                    </Pagination.Item>
                ))}
            </Pagination>
            <div className="mt-3">
                {poststore.sortOrder === "DESC" ? (
                    <IconButton onClick={() => poststore.setSortOrder("ASC")}>
                        <KeyboardArrowDownIcon />
                    </IconButton>
                ) : (
                    <IconButton onClick={() => poststore.setSortOrder("DESC")}>
                        <KeyboardArrowUpIcon />
                    </IconButton>
                )}
            </div>
        </div>
    );
});

export default Sorting;

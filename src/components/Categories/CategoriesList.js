import React from "react";
import { Box, Grid } from "@mui/material";
import CategoryItem from "./CategoryItem.js";

const CategoriesList = ({ categories }) => {
    return (
        <Box sx={{ flexGrow: 1, marginTop: "54px" }}>
            <Grid container spacing={2}>
                {categories.map((category) => {
                    return (
                        <Grid key={category.category_id} item xs={12} sm={6} md={4} lg={3}>
                            <CategoryItem {...category} />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default CategoriesList;

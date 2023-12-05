import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { get_categories } from "../http/categoriesAPI";
import CategoriesList from "../components/Categories/CategoriesList";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get_categories();
                setCategories(response);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Typography variant="h3" style={{ marginTop: "10px" }}>
                Categories
            </Typography>
            {categories && <CategoriesList categories={categories} />}
        </Container>
    );
};

export default Categories;

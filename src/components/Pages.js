import React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useContext } from "react";
import { Pagination } from "react-bootstrap";

const Pages = observer(() => {
    const { poststore } = useContext(Context);
    const pageCount = Math.ceil(poststore.count / poststore.limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    return (
        <Pagination className="mt-3">
            {pages.map((page) => (
                <Pagination.Item key={page} active={poststore.page === page} onClick={() => poststore.setPage(page)}>
                    {page}
                </Pagination.Item>
            ))}
        </Pagination>
    );
});

export default Pages;

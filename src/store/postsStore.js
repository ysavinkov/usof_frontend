import { makeAutoObservable } from "mobx";

export default class PostsStore {
    constructor() {
        this._page = 1;
        this._limit = 5;
        this._totalCount = 0;
        this._sortBy = "rating";
        this._sortOrder = "DESC";
        makeAutoObservable(this);
    }

    setPage(page) {
        this._page = page;
    }

    setLimit(limit) {
        this._limit = limit;
    }

    setCount(count) {
        this._totalCount = count;
    }

    setSortBy(sortBy) {
        this._sortBy = sortBy;
    }

    setSortOrder(sortOrder) {
        this._sortOrder = sortOrder;
    }

    get page() {
        return this._page;
    }

    get limit() {
        return this._limit;
    }

    get count() {
        return this._totalCount;
    }

    get sortBy() {
        return this._sortBy;
    }

    get sortOrder() {
        return this._sortOrder;
    }
}

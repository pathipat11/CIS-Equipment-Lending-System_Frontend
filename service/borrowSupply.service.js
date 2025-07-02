import { client } from "./httpCilent";

export const fetchBorrowSupply = () => {
    return client({
        method: "get",
        url: "/borrow-supply/list",
    });
};

export const createBorrowSupply = (payload) => {
    return client({
        method: "post",
        url: "/borrow-supply/create",
        data: payload,
    });
};

export const updateBorrowSupply = (payload, id) => {
    return client({
        method: "patch",
        url: `/borrow-supply/${id}`,
        data: payload,
    });
};

export const getBorrowEquipmentById = (id) => {
    return client({
        method: "get",
        url: `/borrow-equipment/${id}`,
    });
};


import { client } from "./httpCilent";

export const fetchBorrowEquipment = () => {
    return client({
        method: "get",
        url: "/borrow-equipment/list",
    });
};

export const createBorrowEquipment = (payload) => {
    return client({
        method: "post",
        url: "/borrow-equipment/create",
        data: payload,
    });
};

export const updateBorrowEquipment = (payload, id) => {
    return client({
        method: "patch",
        url: `/borrow-equipment/${id}`,
        data: payload,
    });
};

export const getBorrowEquipmentById = (id) => {
    return client({
        method: "get",
        url: `/borrow-equipment/${id}`,
    });
};


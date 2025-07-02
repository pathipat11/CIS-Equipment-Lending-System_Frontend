import { client } from "./httpCilent";

export const fetchEquipment = (Query) => {
    return client({
        method: "get",
        url: "/equipment/list",
        params: {
            ...Query,
        },
    });
};


export const createEquipment = (payload) => {
    return client({
        method: "post",
        url: "/equipment/create",
        data: payload,
    });
};


export const updateEquipment = (payload, id) => {
    return client({
        method: "patch",
        url: `/equipment/${id}`,
        data: payload,
    });
};

export const deleteEquipment = (id) => {
    return client({
        method: "delete",
        url: `/equipment/${id}`,
    });
};

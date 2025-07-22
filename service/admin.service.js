import { client } from "./httpCilent";

export const fetchAdmin = (Query) => {
    return client({
        method: "get",
        url: "/admins/list",
        params: {
            ...Query,
        },
    });
};


export const createAdmin = (payload) => {
    return client({
        method: "post",
        url: "/admins/create",
        data: payload,
    });
};


export const updateAdmin = (payload, id) => {
    return client({
        method: "patch",
        url: `/admins/${id}`,
        data: payload,
    });
};

export const deleteAdmin = (id) => {
    return client({
        method: "delete",
        url: `/admins/${id}`,
    });
};

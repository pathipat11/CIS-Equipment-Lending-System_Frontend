import { client } from "./httpCilent";

export const fetchSupply = () => {
    return client({
        method: "get",
        url: "/supplys/list",
    });
};

export const createSupply = (payload) => {
    return client({
        method: "post",
        url: "/supplys/create",
        data: payload,
    });
};

export const updateSupply = (payload, id) => {
    return client({
        method: "patch",
        url: `/supplys/${id}`,
        data: payload,
    });
};

export const deleteSupply = (id) => {
    return client({
        method: "delete",
        url: `/supplys/${id}`,
    });
};

export const getSupplyById = (id) => {
  return client({
    method: "get",
    url: `/supplys/${id}`,
  });
};


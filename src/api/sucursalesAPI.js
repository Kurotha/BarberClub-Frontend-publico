import api from "./axios";

export const getSucursales = async () => {
    const response = await api.get("/sucursales/");
    return response.data;
};

export const getSucursalesById = async (id) => {
    const response = await api.get(`/sucursales/${id}/`);
    return response.data;
};
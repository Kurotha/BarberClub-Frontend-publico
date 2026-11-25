import api from "./axios";

export const getServices = async () => {
    const response = await api.get("/services/");
    return response.data;
};

export const getActiveServices = async () => {
    const response = await api.get("/servicios/active/");
    return response.data;
};

export const getServiceById = async (id) => {
    const response = await api.get(`/services/${id}/`);
    return response.data;
};
import api from "./axios";

export const getCitas = async () => {
    const response = await api.get("/citas/");
    return response.data;
};

export const getCitasById = async (id) => {
    const response = await api.get(`/citas/${id}/`);
    return response.data;
};
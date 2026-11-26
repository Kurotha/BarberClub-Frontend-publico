import api from "./axios";

export const getEspecialistas = async () => {
    const response = await api.get("/especialistas/");
    return response.data;
};

export const getEspecialistasById = async (id) => {
    const response = await api.get(`/especialistas/${id}/`);
    return response.data;
};

export const getEspecialistasActivos = async () => {
    const response = await api.get('/especialistas/active/');
    return response.data;
}
export const CATEGORIE_END_POINT = {
    create: () => `/category`,
    get: (page, limit,search=null,status=true) => `/category?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    info: (id) => `/category/${id}`,
    update: (id) => `/category/${id}`,
    delete:(id) => `/category/${id}`,
}
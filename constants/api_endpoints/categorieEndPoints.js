export const CATEGORIE_END_POINT = {
    create: () => `/category`,
    // get: (search=null) => `/category?search=${search}`,
    get: (page, limit,search=null) => `/category?page=${page}&limit=${limit}&search=${search}`,
    // get: () => `/category`,
    info: (id) => `/category/${id}`,
    update: (id) => `/category/${id}`,
    delete:(id) => `/category/${id}`,
}
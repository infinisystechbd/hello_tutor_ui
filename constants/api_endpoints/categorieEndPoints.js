export const CATEGORIE_END_POINT = {
    create: () => `/category`,
    // get: (search=null) => `/category?search=${search}`,
    get: () => `/category`,
    info: (id) => `/category/${id}`,
    update: (id) => `/category/${id}`,
    delete:(id) => `/category/${id}`,
}
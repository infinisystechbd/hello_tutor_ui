export const CITY_END_POINT = {
    create: () => `/city`,
    get: (page, limit,search=null) => `/city?page=${page}&limit=${limit}&search=${search}`,
    info: (id) => `/city/${id}`,
    update: (id) => `/city/${id}`,
    delete:(id) => `/city/${id}`,
}
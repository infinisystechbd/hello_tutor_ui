export const CITY_END_POINT = {
    create: () => `/city`,
    get: (search=null) => `/city?search=${search}`,
    // get: (page, limit,search=null) => `/city?page=${page}&limit=${limit}&search=${search}`,
    get: () => `/city`,
    info: (id) => `/city/${id}`,
    update: (id) => `/city/${id}`,
    delete:(id) => `/city/${id}`,
}
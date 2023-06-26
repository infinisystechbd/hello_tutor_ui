export const LOCATION_END_POINT = {
    create: () => `/location`,
    // get: () => `/location`,
    get: (page, limit,search=null) => `/location?page=${page}&limit=${limit}&search=${search}`,
    info: (id) => `/location/${id}`,
    update: (id) => `/location/${id}`,
    delete:(id) => `/location/${id}`,
}
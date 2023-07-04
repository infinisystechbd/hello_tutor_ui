export const GUARDIAN_END_POINT = {
    create: () => `/guardian`,
    // get: (search=null) => `/guardian?search=${search}`,
    // get: () => `/guardian`,
    get: (page, limit,search=null) => `/guardian?page=${page}&limit=${limit}&search=${search}`,
    info: (id) => `/guardian/${id}`,
    update: (id) => `/guardian/${id}`,
    delete:(id) => `/guardian/${id}`,
}
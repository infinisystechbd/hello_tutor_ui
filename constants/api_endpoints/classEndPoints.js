export const CLASS_END_POINT = {
    create: () => `/class`,
    get: (page, limit,search=null) => `/class?page=${page}&limit=${limit}&search=${search}`,
    // get: () => `/class`,
    info: (id) => `/class/${id}`,
    update: (id) => `/class/${id}`,
    delete:(id) => `/class/${id}`,
}
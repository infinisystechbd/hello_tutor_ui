export const USER_END_POINT = {
    create: () => `/user`,
    get: (page, limit,search=null) => `/user?page=${page}&limit=${limit}&search=${search}`,
    info: (id) => `/user/${id}`,
    update: (id) => `/user/${id}`,
    delete:(id) => `/user/${id}`,
}   
export const TUTOR_END_POINT = {
    create: () => `/tutor`,
    // get: (search=null) => `/tutor?search=${search}`,
    get: (page, limit,search=null) => `/tutor?page=${page}&limit=${limit}&search=${search}`,
    info: (id) => `/tutor/${id}`,
    update: (id) => `/tutor/${id}`,
    delete:(id) => `/tutor/${id}`,
}
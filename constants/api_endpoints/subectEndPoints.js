export const SUBJECT_END_POINT = {
    create: () => `/subject`,
    get: (search=null) => `/subject?search=${search}`,
    info: (id) => `/subject/${id}`,
    update: (id) => `/subject/${id}`,
    delete:(id) => `/subject/${id}`,
}   
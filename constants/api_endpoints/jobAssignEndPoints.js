export const JOB_ASSIGN_END_POINT = {
    create: () => `/job/assign`,
    // get: (page,limit,search=null,status=true) => `/job/assign?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    get: (page, limit,search=null) => `/job/assign?page=${page}&limit=${limit}&search=${search}`,
    info: (id) => `/job/assign/${id}`,
    update: (id) => `/job/assign/${id}`,
    delete:(id) => `/job/assign/${id}`,
    
}
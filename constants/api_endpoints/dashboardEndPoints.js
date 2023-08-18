export const DASHBOARD_END_POINT = {
    // dashbord: (status,) => `/job/dashboard?status=${status}&sortBy=updatedAt&orderBy=desc`,
    dashbord: (status,limit,page) => `/job/dashboard?status=${status}&sortBy=updatedAt&orderBy=desc&limit=${limit}&page=${page}`,
    // get: (page, limit,search=null,status) => `/class?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    jobDetails: (id) => `/job/dashboard/${id}`
}
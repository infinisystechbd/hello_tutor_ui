export const USER_END_POINT = {
    create: () => `/user`,
    get: (page, limit,search=null) => `/user?page=${page}&limit=${limit}&search=${search}`,
    dropdown: (page, limit,search=null,status=true) => `/user?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    info: () => `/user`,
    update: (id) => `/user/profile`,
    delete:(id) => `/user/${id}`,
    changePassword:()=>`/user/changepassword`,
}   
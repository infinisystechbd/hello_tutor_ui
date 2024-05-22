export const TRIAL_END_POINT = {
    get: () => `/job`,
    create: (jobid) => `/job/trail/${jobid}`,
    list:(id) => `/job/shortlist/${id}`,
    getTrialTutorByJobId: (id) => `/job/trail/${id}`,


    // get: (page, limit,search=null,status) => `/job?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    // dropdown: (page, limit,search=null,status=true) => `/job?page=${page}&limit=${limit}&search=${search}&status=${status}`,
}
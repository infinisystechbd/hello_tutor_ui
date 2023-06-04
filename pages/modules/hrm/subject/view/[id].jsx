import React, { useCallback, useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { get, put } from '../../../../../helpers/api_helper';
import { SUBJECT_END_POINT } from '../../../../../constants';
import ToastMessage from '../../../../../components/Toast';
import moment from 'moment';
const ViewSubject = () => {
    const router = useRouter();
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const { id } = router?.query;
    const [subjectDetails, setSubjectDetails] = useState({});

    const fetchSubject = useCallback(async () => {
        let isSubscribed = true;
        if (id) {
            const getTheSubject = await get(SUBJECT_END_POINT.info(id));
            setSubjectDetails(getTheSubject?.data);
        }

        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchSubject();
    }, [fetchSubject]);
    return (
        <>
            <div className="container-fluid ">
                <div className="w-75 m-auto">
                    <div className="row">

                        <div className="col-lg-8 col-md-8 col-sm-8">
                            <div className="card">
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <h3 className="box-title mt-5">Subject Basic Info</h3>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td width={390}>Name</td>
                                                            <td>{subjectDetails.name}</td>
                                                        </tr>

                                                        <tr>
                                                            <td>Status</td>
                                                            <td>
                                                                {subjectDetails.status == true ?
                                                                    <button className="btn btn-primary">Active</button> :
                                                                    <button className="btn btn-danger">Inactive</button>
                                                                }
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <h3 className="box-title mt-5">Creation/updation related info</h3>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <tbody>

                                                        <tr>
                                                            <td>Created At</td>
                                                            <td>{moment(subjectDetails?.createdAt).format('DD-MM-YYYY')}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Updated At</td>
                                                            <td>{moment(subjectDetails?.updatedAt).format('DD-MM-YYYY')}</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default ViewSubject
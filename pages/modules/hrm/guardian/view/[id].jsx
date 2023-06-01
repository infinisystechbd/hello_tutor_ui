import { useEffect, useState, useCallback, Fragment } from 'react';
import Button from "../../../../../components/elements/Button";
import Form from "../../../../../components/elements/Form";
import Label from "../../../../../components/elements/Label";
import TextInput from "../../../../../components/elements/TextInput";
import HeadSection from "../../../../../components/HeadSection";
import { GUARDIAN_END_POINT } from '../../../../../constants/api_endpoints/guardianEndPoints';
import { get, post } from '../../../../../helpers/api_helper';
import ToastMessage from '../../../../../components/Toast';
import { useRouter } from "next/router";
import moment from 'moment';
const ViewGuardian = () => {
    const router = useRouter();
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const { id } = router?.query;
    const [guardianDetails, setGuardianDetails] = useState({});

    const fetchGuardian = useCallback(async () => {
        let isSubscribed = true;
        if (id) {
            const getTheGuardian = await get(GUARDIAN_END_POINT.info(id));
            setGuardianDetails(getTheGuardian?.data);
        }

        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchGuardian();
    }, [fetchGuardian]);
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
                                    <h3 className="box-title mt-5">Guardian Info</h3>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                            <tr>
                                                    <td width={390}>Guardian Id</td>
                                                    <td>{guardianDetails.guardianId}</td>
                                                </tr>
                                                <tr>
                                                    <td width={390}>Name</td>
                                                    <td>{guardianDetails.fullName}</td>
                                                </tr>

                                                <tr>
                                                    <td width={390}>Phone</td>
                                                    <td>{guardianDetails.phone}</td>
                                                </tr>

                                                <tr>
                                                    <td width={390}>Email</td>
                                                    <td>{guardianDetails.email}</td>
                                                </tr>
                                                <tr>
                                                    <td width={390}>Address</td>
                                                    <td>{guardianDetails.address}</td>
                                                </tr>
                                                <tr>
                                                    <td>Status</td>
                                                    <td>
                                                        {guardianDetails.status == true ?
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
                                                    <td>{moment(guardianDetails?.createdAt).format('DD-MM-YYYY')}</td>
                                                </tr>
                                                <tr>
                                                    <td>Updated At</td>
                                                    <td>{moment(guardianDetails?.updatedAt).format('DD-MM-YYYY')}</td>
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

export default ViewGuardian
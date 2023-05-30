import React, { useCallback, useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { get, put } from '../../../../../helpers/api_helper';
import { SUBJECT_END_POINT } from '../../../../../constants';
import ToastMessage from '../../../../../components/Toast';
import moment from 'moment';
import HeadSection from "../../../../../components/HeadSection";
import { CITY_END_POINT } from "../../../../../constants/api_endpoints/cityEndPoints";

const CityInfo = () => {

  const router = useRouter();
  const notify = useCallback((type, message) => {
      ToastMessage({ type, message });
  }, []);
  const { id } = router?.query;
  const [cityDetails, setCityDetails] = useState({});

  const fetchCity = useCallback(async () => {
    let isSubscribed = true;
    if (id) {
        const getTheCity = await get(CITY_END_POINT.info(id));
        setCityDetails(getTheCity?.data);
    }

    return () => (isSubscribed = false);
}, [id]);


useEffect(() => {
    fetchCity();
}, [fetchCity]);
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
                                                    <td>{cityDetails.name}</td>
                                                </tr>

                                                <tr>
                                                    <td>Status</td>
                                                    <td>
                                                        {cityDetails.status == true ?
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
                                                    <td>{moment(cityDetails?.createdAt).format('DD-MM-YYYY')}</td>
                                                </tr>
                                                <tr>
                                                    <td>Updated At</td>
                                                    <td>{moment(cityDetails?.updatedAt).format('DD-MM-YYYY')}</td>
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

export default CityInfo
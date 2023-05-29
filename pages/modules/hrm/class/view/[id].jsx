import React, { useCallback, useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { get, put } from '../../../../../helpers/api_helper';
import HeadSection from '../../../../../components/HeadSection';
import moment from 'moment';
import ToastMessage from '../../../../../components/Toast';
import { CLASS_END_POINT } from '../../../../../constants/api_endpoints/classEndPoints';
const ClassInfo = () => {

  const router = useRouter();
  const notify = useCallback((type, message) => {
      ToastMessage({ type, message });
  }, []);
  const { id } = router?.query;
  const [classDetails, setClassDetails] = useState({});

  console.log("class details",classDetails);

  const fetchClass = useCallback(async () => {
    let isSubscribed = true;
    if (id) {
        const getTheClass = await get(CLASS_END_POINT.info(id));
        setClassDetails(getTheClass?.data);
    }

    return () => (isSubscribed = false);
}, [id]);


useEffect(() => {
    fetchClass();
}, [fetchClass]);


  return (
    <>
    <HeadSection title="Class-Details" />

    <div className="container-fluid ">
        <div className="row">
           
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body">
            
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3 className="box-title mt-5">Class Basic Info</h3>
                            <div className="table-responsive">
                                <table className="table">
                                <tbody>
                                    <tr>
                                        <td width={390}>Name</td>
                                        <td>{classDetails?.name}</td>
                                    </tr>
                                    <tr>
                                    <td>Status</td>
                                    <td>
                                        {classDetails?.status == true ? 
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
                                    <td>{moment(classDetails?.createdAt).format('DD-MM-YYYY')}</td>
                                    </tr>
                             
                                    <tr>
                                    <td>Updated At</td>
                                    <td>{moment(classDetails?.updatedAt).format('DD-MM-YYYY')}</td>
                                    </tr>
                            
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                
                <div className="card">
                <div className="border-bottom title-part-padding">
                    <h4 className="card-title mb-0">Subject’s under the Class</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                    <table
                        id="multi_col_order"
                        className="table table-striped table-bordered display"
                        style={{ width: "100%" }}
                    >
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                        
                        </tr>
                        </thead>
                        <tbody>
                        {
                        classDetails?.subject?.map((sub, index) => (
                          <tr key={index}>
                            <th>name</th>
                            {/* <th>{sub.name}</th> */}
                            <td>
                                {sub.status == true ? 
                                <button className="btn btn-primary">Active</button> :
                                <button className="btn btn-danger">Inactive</button>
                                } 
                            </td>
                          </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>

            </div>
            
        </div>
    </div>
    </>
  )
}

export default ClassInfo
import React, { useCallback, useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Form from "../../../../../components/elements/Form";
import Label from "../../../../../components/elements/Label";
import TextInput from "../../../../../components/elements/TextInput";
import Select from "../../../../../components/elements/Select";
import Button from "../../../../../components/elements/Button";
import { get, put } from '../../../../../helpers/api_helper';
import { SUBJECT_END_POINT } from '../../../../../constants';
import ToastMessage from '../../../../../components/Toast';
const EditSubject = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { id } = router?.query;
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const [subjectDetails, setSubjectDetails] = useState({
    name: "",
    status: ""
  });
  const fetchSubject = useCallback(async () => {
    let isSubscribed = true;
    if (id) {
      const getTheSubject = await get(SUBJECT_END_POINT.info(id));
      setSubjectDetails(prev => ({
        ...prev,
        name: getTheSubject?.data?.name,
        status: getTheSubject?.data?.status
      }));
    }

    // setLoading(true);
    return () => (isSubscribed = false);
  }, [id]);


  useEffect(() => {
    fetchSubject();
  }, [fetchSubject]);


  const handleChange = (e) => {
    setSubjectDetails(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  async function submitForm(e) {
    e.preventDefault();
    const updateTheSubject = await put(SUBJECT_END_POINT.update(id), subjectDetails);
    if (updateTheSubject.status ==='SUCCESS' ) {
      notify("success", updateTheSubject.message);
      router.push(`/modules/hrm/subject`);
    }

    else{
      notify("error", updateTheSubject.message);
    }  


  }
  return (
    <>
      <div className="container-fluid ">
        <div className="w-75 m-auto">
          <div className="row">
            <div className="col-md-10">
              <div className="card">
                <div className="card-body border-bottom">
                  <h4 className="card-title">Update Subect</h4>
                </div>

                <Form onSubmit={submitForm} >

                  <div className="card-body">

                    <TextInput label="Subject Name" value={subjectDetails?.name} placeholder="Subject Name" name="name" onChange={handleChange} />

                    <div className="mb-3 row">
                      <Label text="Status" />
                      <div className="col-sm-6">
                        <Select name="status" value={subjectDetails?.status} onChange={handleChange} >
                          <option value="" disabled>select discount type</option>
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-top">
                    <div className="text-end">
                      <Button className="btn-info">
                        Update
                      </Button>

                    </div>
                  </div>

                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditSubject
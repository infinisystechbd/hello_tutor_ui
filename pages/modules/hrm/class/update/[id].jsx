import React, { useCallback, useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Form from "../../../../../components/elements/Form";
import Label from "../../../../../components/elements/Label";
import TextInput from "../../../../../components/elements/TextInput";
import Select from "../../../../../components/elements/Select";
import Select2 from "../../../../../components/elements/Select2";
import Button from "../../../../../components/elements/Button";
import { get, put } from '../../../../../helpers/api_helper';
import { CLASS_END_POINT } from '../../../../../constants/api_endpoints/classEndPoints';
import { SUBJECT_END_POINT } from '../../../../../constants/api_endpoints/subectEndPoints';
import HeadSection from "../../../../../components/HeadSection";
import ToastMessage from '../../../../../components/Toast';



const ClassUpdate = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { id } = router?.query;
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);

  const [classDetails, setClassDetails] = useState({});
  const [subjectList, setAllSubjectList] = useState([]);
  const [subject, setSubject] = useState([]);

  // console.log(classDetails);
  // console.log("classDetails",classDetails?.subject[0]?.subjectId?._id);

  useEffect(() => {
    const controller = new AbortController();
    const fetchTotalSubjects = async () => {
      let isSubscribed = true;
      try {
        const getAllList = await get(SUBJECT_END_POINT.get());
        // console.log(getAllList);
        setAllSubjectList(getAllList?.data);

      } catch (error) {
        console.log("find the error");
      }

      return () => isSubscribed = false;
    }
    fetchTotalSubjects();
  }, [])



  const fetchclass = useCallback(async () => {
    let isSubscribed = true;
    if (id) {
      const getTheClass = await get(CLASS_END_POINT.info(id));
      console.log("getTheClass",getTheClass);
      setClassDetails(prev => ({
        ...prev,
        name: getTheClass?.data?.name,
        status: getTheClass?.data?.status,
        subject:getTheClass?.data?.subject
      }));
    }

    // setLoading(true);
    return () => (isSubscribed = false);
  }, [id]);


  useEffect(() => {
    fetchclass();
  }, [fetchclass]);


  const handleChange = (e) => {
    setClassDetails(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }



  async function submitForm(e) {
    e.preventDefault();
    const body = { ...classDetails, subject };
    console.log(body);
    const updateTheClass = await put(CLASS_END_POINT.update(id), body);
    if (updateTheClass.status === 'SUCCESS') {
      notify("success", updateTheClass.message);
      router.push(`/modules/hrm/class`);
    }

    else {
      notify("error", updateTheClass.message);
    }


  }


  const onSelectSubject = (e) => {
    setSubject([])
    e.map((x) => {
      setSubject(subject => [
        ...subject,
        { subjectId: x.value }
      ])
    })

  }

  return (
    <>
    <HeadSection title="Update Class" />
      <div className="container-fluid ">
        <div className="w-75 m-auto">
          <div className="row">
            <div className="col-md-10">
              <div className="card">
                <div className="card-body border-bottom">
                  <h4 className="card-title">Update Class</h4>
                </div>

                <Form onSubmit={submitForm} >

                  <div className="card-body">

                    <TextInput name="name" label="Class Name" placeholder="Class Name" onChange={handleChange} value={classDetails.name} />
                    <div className="mb-3 row">
                      <Label text="Subjects" />
                      <div className="col-sm-6">
   
                        {
                          classDetails?.subject?.length > 0 &&
                          <Select2
                            isMulti
                            options={subjectList && subjectList.map(({ _id, name }) => ({
                              value: _id,
                              label: name,
                            }))}
                            onChange={onSelectSubject}subjectId
                            defaultValue={classDetails?.subject?.map((subjectId,index) => ({ value:subjectId?.subjectId?._id,label:subjectId?.subjectId?.name }))}
                          />
                        }


                        {
                          classDetails?.subject?.length <= 0 &&
                          <Select2
                            isMulti
                            options={classDetails && classDetails?.subject?.map((subjectId,index) => ({ value:subjectId?.subjectId?._id,label:subjectId?.subjectId?.name }))}
                            onChange={onSelectSubject}


                          />
                        }
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <Label text="Status" />
                      <div className="col-sm-6">
                        <Select name="status" value={classDetails.status} onChange={handleChange}>
                          <option value="" disabled>select activation type</option>
                          <option value="true" selected>Active</option>
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

export default ClassUpdate
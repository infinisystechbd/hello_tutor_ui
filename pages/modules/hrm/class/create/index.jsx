import { useEffect, useState,useCallback } from 'react';
import Button from "../../../../../components/elements/Button";
import Form from "../../../../../components/elements/Form";
import Label from "../../../../../components/elements/Label";
import Select from "../../../../../components/elements/Select";
import Select2 from "../../../../../components/elements/Select2";
import TextInput from "../../../../../components/elements/TextInput";
import { SUBJECT_END_POINT } from '../../../../../constants/api_endpoints/subectEndPoints';
import { CLASS_END_POINT } from '../../../../../constants/api_endpoints/classEndPoints';
import { get, post } from '../../../../../helpers/api_helper';
import ToastMessage from '../../../../../components/Toast';
import { useRouter } from "next/router";

const CreateClass = () => {
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const router = useRouter();
  const[classDetails,setClassDetails] = useState({
    name:"",
    status:""||"true",  
  });
  console.log(classDetails);
  const [subjectList, setAllSubjectList] = useState([]);
  const[subject,setSubject] = useState([]);

  useEffect(()=>{
    const controller = new AbortController();
    const fetchTotalSubjects = async () =>{
      let isSubscribed = true;
    try {
      const getAllList = await get(SUBJECT_END_POINT.get());
      setAllSubjectList(getAllList?.data);
      
    } catch (error) {
      console.log("find the error");
    }

    return () => isSubscribed = false;
    }
    fetchTotalSubjects();
  },[])


  const handleChange =(e)=>{
    setClassDetails(prev=>({
      ...prev, [e.target.name]:e.target.value
    }))
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


  async function submitForm(e) {
    e.preventDefault();
    const body = {...classDetails,subject};
    console.log(body);

    const response =  await post(CLASS_END_POINT.create(),body);
    if (response.status === "SUCCESS") {
      
      notify("success", "successfully Created!");
      router.push(`/modules/hrm/class`);
    }
    else{
      notify("error", "something went wrong");
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
                <h4 className="card-title">Add Class</h4>
              </div>

              <Form onSubmit={submitForm} >
              
                <div className="card-body">

                  <TextInput name="name" label="Class Name" placeholder="Class Name"  onChange={handleChange} value={classDetails.name}/>
                  <div className="mb-3 row">
                    <Label text="Subjects" />
                    <div className="col-sm-6">
                      <Select2 placeholder="Select Subjects" isMulti
                      options={subjectList && subjectList.map(({ _id, name}) => ({
                        value: _id,
                        label:name,
                      }))}
                      onChange={onSelectSubject}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <Label text="Status" />
                    <div className="col-sm-6">
                      <Select name="status" value={classDetails.status}  onChange={handleChange}>
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
                      Save
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

export default CreateClass
import React, { useCallback,useState } from 'react'
import HeadSection from "../../../../../components/HeadSection";
import Button from "../../../../../components/elements/Button";
import Form from "../../../../../components/elements/Form";
import Label from "../../../../../components/elements/Label";
import RadioButton from "../../../../../components/elements/RadioButton";
import Select from "../../../../../components/elements/Select";
import Select2 from "../../../../../components/elements/Select2";
import ToastMessage from "../../../../../components/Toast/index";
import TextInput from "../../../../../components/elements/TextInput";
import { SUBJECT_END_POINT } from "../../../../../constants/index";
import { post } from "../../../../../helpers/api_helper";
import { useRouter } from "next/router";

const Subject = () => {
  const router = useRouter();
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const [subjectDetails,setSubjectDetails] = useState({
    name:"",
    status:""||"true"
  });
  console.log(subjectDetails);

  const handleChange =(e)=>{
    setSubjectDetails(prev=>({
      ...prev, [e.target.name]:e.target.value
    }))
  }

  
  async function submitForm(e) {
    e.preventDefault();
    console.log(subjectDetails);
    const response =  await post(SUBJECT_END_POINT.create(),subjectDetails);
    if (response.status === "SUCCESS") { 
      notify("success", response.message);
      router.push(`/modules/hrm/subject`);
    }
    else{
      notify("error", response.errorMessage);
    }
    // try{
  
    // }catch(error){
    //   let message;
    //   const errorStatus = error?.response?.status;
    //   notify("error", message);
  
    // }
  }

  return (
    <>
    <div className="container-fluid ">
    <div className="w-75 m-auto">
      <div className="row">
        <div className="col-md-10">
          <div className="card">
            <div className="card-body border-bottom">
              <h4 className="card-title">Add Subect</h4>
            </div>

            <Form onSubmit={submitForm}>
            
              <div className="card-body">

                <TextInput label="Subject Name" value={subjectDetails.name} placeholder="Subject Name" name="name"  onChange={handleChange} />

                <div className="mb-3 row">
                  <Label text="Status" />
                  <div className="col-sm-6">
                    <Select name="status" value={subjectDetails.status}  onChange={handleChange} >
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

export default Subject
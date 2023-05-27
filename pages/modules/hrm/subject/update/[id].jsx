import React, { useCallback,useState } from 'react'
import { useRouter } from "next/router";
import Form from "../../../../../components/elements/Form";
import Label from "../../../../../components/elements/Label";
import TextInput from "../../../../../components/elements/TextInput";
import Select from "../../../../../components/elements/Select";
import Button from "../../../../../components/elements/Button";
const EditSubject = () => {

const router = useRouter();

const { id } = router.query;
const [subjectDetails,setSubjectDetails] = useState({
  name:"",
  status:""
});
const handleChange =(e)=>{
  setSubjectDetails(prev=>({
    ...prev, [e.target.name]:e.target.value
  }))
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

            <Form >
            
              <div className="card-body">

                <TextInput label="Subject Name" value={subjectDetails.name} placeholder="Subject Name" name="name"  onChange={handleChange} />

                <div className="mb-3 row">
                  <Label text="Status" />
                  <div className="col-sm-6">
                    <Select name="status" value={subjectDetails.status}  onChange={handleChange} >
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
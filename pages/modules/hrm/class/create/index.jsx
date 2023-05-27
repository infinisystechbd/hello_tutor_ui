import React, { useState } from 'react'
import HeadSection from "../../../../../components/HeadSection";
import Button from "../../../../../components/elements/Button";
import Form from "../../../../../components/elements/Form";
import Label from "../../../../../components/elements/Label";
import RadioButton from "../../../../../components/elements/RadioButton";
import Select from "../../../../../components/elements/Select";
import Select2 from "../../../../../components/elements/Select2";
import TextInput from "../../../../../components/elements/TextInput";
const ManageClass = () => {

  const[classDetails,setClassDetails] = useState({
    class_name:"",
    discount_type:""
  });
  console.log(classDetails);
  const handleChange =(e)=>{
    setClassDetails(prev=>({
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
                <h4 className="card-title">Add Class</h4>
              </div>

              <Form >
              
                <div className="card-body">

                  <TextInput name="class_name" label="Class Name" placeholder="Class Name"  onChange={handleChange} value={classDetails.class_name}/>
                  <div className="mb-3 row">
                    <Label text="Status" />
                    <div className="col-sm-6">
                      <Select name="discount_type" value={classDetails.discount_type}  onChange={handleChange}>
                        <option value="" disabled>select discount type</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
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

export default ManageClass
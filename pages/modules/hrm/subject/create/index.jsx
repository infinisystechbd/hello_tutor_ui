import React from 'react'
import HeadSection from "../../../../../components/HeadSection";
import Button from "../../../../../components/elements/Button";
import Form from "../../../../../components/elements/Form";
import Label from "../../../../../components/elements/Label";
import RadioButton from "../../../../../components/elements/RadioButton";
import Select from "../../../../../components/elements/Select";
import Select2 from "../../../../../components/elements/Select2";
import TextInput from "../../../../../components/elements/TextInput";

const Subject = () => {

  const class_options = [
    { value: "1", label: "class 1", name: "class_options" },
    { value: "2", label: "class 2", name: "class_options" },
    { value: "3", label: "class 3", name: "class_options" },
    { value: "4", label: "class 4", name: "class_options" },
    { value: "5", label: "class 5", name: "class_options" },
  
  ]
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

            <Form >
            
              <div className="card-body">

                <TextInput label="Subject Name" placeholder="Subject Name" />
                <div className="mb-3 row">
                  <Label text="Class Name" />
                  <div className="col-sm-6">
                    <Select2 isMulti options={class_options} name="promoType"/> 
                      {/* <option value="" disabled>select discount type</option>
                      <option value="1">class 1</option>
                      <option value="2">Class 2</option>
                      <option value="3">Class 3</option>
                      <option value="4">Class 4</option>
                    </Select2> */}
                  </div>
                </div>
                <div className="mb-3 row">
                  <Label text="Status" />
                  <div className="col-sm-6">
                    <Select name="promoType" >
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

export default Subject
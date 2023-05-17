import React from 'react'
import HeadSection from "../../../../../components/HeadSection";
import Button from "../../../../../components/elements/Button";
import Form from "../../../../../components/elements/Form";
import Label from "../../../../../components/elements/Label";
import RadioButton from "../../../../../components/elements/RadioButton";
import Select from "../../../../../components/elements/Select";
import Select2 from "../../../../../components/elements/Select2";
import TextInput from "../../../../../components/elements/TextInput";
const Class = () => {

  return (
    <>
      <div className="container-fluid ">
      <div className="w-75 m-auto">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body border-bottom">
                <h4 className="card-title">Add Class</h4>
              </div>

              <Form >
              
                <div className="card-body">

                  <TextInput label="Class Name" placeholder="Class Name" />
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

export default Class
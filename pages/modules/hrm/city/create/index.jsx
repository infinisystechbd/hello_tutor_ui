import React from 'react'
import { useEffect, useState,useCallback } from 'react';
import Button from "../../../../../components/elements/Button";
import Form from "../../../../../components/elements/Form";
import Label from "../../../../../components/elements/Label";
import Select from "../../../../../components/elements/Select";
import TextInput from "../../../../../components/elements/TextInput";
import HeadSection from "../../../../../components/HeadSection";
import { CITY_END_POINT } from '../../../../../constants/api_endpoints/cityEndPoints';
import { get, post } from '../../../../../helpers/api_helper';
import ToastMessage from '../../../../../components/Toast';
import { useRouter } from "next/router";
const CityCreation = () => {
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const router = useRouter();
  const[cityDetails,setCityDetails] = useState({
    name:"",
    status:""||"true",  
  });
console.log(cityDetails);
  const handleChange =(e)=>{
    setCityDetails(prev=>({
      ...prev, [e.target.name]:e.target.value
    }))
  }

  async function submitForm(e) {
    e.preventDefault();
 

    const response =  await post(CITY_END_POINT.create(),cityDetails);
    if (response.status === "SUCCESS") {
      
      notify("success", "successfully Created!");
      router.push(`/modules/hrm/city`);
    }
    else{
      notify("error", "something went wrong");
    }
  
  }
  return (
    <>
    <HeadSection title="Add City" />
      <div className="container-fluid ">
      <div className="w-75 m-auto">
        <div className="row">
          <div className="col-md-10">
            <div className="card">
              <div className="card-body border-bottom">
                <h4 className="card-title">Add City</h4>
              </div>

              <Form onSubmit={submitForm} >
              
                <div className="card-body">

                  <TextInput name="name" label="City Name" placeholder="City Name"  onChange={handleChange} value={cityDetails.name}/>


                  <div className="mb-3 row">
                    <Label text="Status" />
                    <div className="col-sm-6">
                      <Select name="status" value={cityDetails.status}  onChange={handleChange}>
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

export default CityCreation
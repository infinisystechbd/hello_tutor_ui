
import HeadSection from "../../../../components/HeadSection";
import Button from "../../../../components/elements/Button";
import Form from "../../../../components/elements/Form";
import Label from "../../../../components/elements/Label";
import RadioButton from "../../../../components/elements/RadioButton";
import Select from "../../../../components/elements/Select";
import Select2 from "../../../../components/elements/Select2";
import TextInput from "../../../../components/elements/TextInput";

export default function create() {

  return (
    <>
      <HeadSection title="Add-Employee" />

      <div className="container-fluid ">
        <div className="row">
          <div className="col-12">
            <div className="card shadow">
              <div className="card-body border-bottom">
                <h4 className="card-title">Add Employee</h4>
              </div>

              <Form >
                <div className="card-body">

                  <div className="mb-3 row">
                    <Label text="Department" />
                    <div className="col-md-10">
                    <Select2
                        
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <Label text="Designation"/>
                    <div className="col-md-10">
                    <Select2
                        
                      />
                    </div>
                  </div>

                  <TextInput
                    type="text"
                    label="Name"
                    placeholder="Full Name Here"
                    name="name"
                    
                    required
                  />

                  <div className="mb-3 row">
                    <Label text="Gender" />
                    <div className="col-md-10">
                      <div className="flex-gap align-items-center">
                      
                          <RadioButton
                            label="Male"
                            id="Male"
                            name="gender"
                            value="male"
                          
                            
                          />
                    
                          <RadioButton
                            label="Female"
                            id="Female"
                            name="gender"
                            value="female"
                           
                            
                          />
                        
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <Label text="Salary Type" />
                    <div className="col-md-10">
                      <Select defaultValue="" name="salary_type" >
                        <option value="" disabled>Select...</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                      </Select>
                    </div>
                  </div>

                  <TextInput
                    type="number"
                    label="Salary Amount"
                    name="salary_amount"
                    placeholder="Salary Amount"
                    
                    required
                  />

                  <TextInput
                    type="text"
                    label="Address"
                    name="address"
                    placeholder="Address"
                    
                    required
                  />

                  <div className="mb-3 row">
                    <Label text="Description" />
                    <div className="col-md-10">
                      <textarea className="form-control" placeholder="Description..."
                        name="description"  rows={5}
                      />
                    </div>
                  </div>

                  <TextInput
                    type="number"
                    label="Mobile"
                    name="mobile"
                    placeholder="017xx-xxx-xxx"
                    
                    required
                  />

                  <TextInput
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="example@gmail.com"
                    
                    required
                  />

                  <div className="mb-3 row">
                    <Label text="Status" />
                    <div className="col-md-10">
                      <div className="flex-gap align-items-center">
                       
                          <RadioButton
                            label="Yes"
                            id="Yes"
                            value="1"
                            name="status"
                           
                            
                          />
                       
                          <RadioButton
                            label="No"
                            id="No"
                            value="0"
                            name="status"
                            
                            
                          />
                       
                      </div>
                    </div>
                  </div>

                  <hr/>

                  <div className="mb-3 row">
                      <Label text="Is User?" />
                      <div className="col-md-10 form-check form-switch" style={{fontSize:'150%'}}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        name="is_user"
                        
                      />
                      </div>
                  </div>

                  <div >

                    <div className="mb-3 row">
                      <Label text="Role" />
                      <div className="col-md-10">
                        <Select2 
                        />
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <Label text="Country" />
                      <div className="col-md-10">
                        <Select2 o
                        />
                      </div>
                    </div>


                    <div className="mb-3 row">
                      <Label text="State" />
                      <div className="col-md-10">
                      <Select2 
                      />
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <Label text="City" />
                      <div className="col-md-10">
                      <Select2 
                      />
                      </div>
                    </div>


                    <div className="mb-3 row">
                      <Label text="User Status" />
                      <div className="col-md-10">
                        <div className="flex-gap align-items-center">
                          
                            <RadioButton
                              label="active"
                              id="active"
                              value="1"
                              name="user_status"
                              
                              
                            />
                         
                            <RadioButton
                              label="inactive"
                              id="inactive"
                              value="0"
                              name="user_status"
                              
                              
                            />
                        
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <Label text="User Define Password?" />
                      <div className="col-md-10 form-check form-switch" style={{fontSize:'150%'}}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="user_defined_password"
                        
                      />
                      </div>
                    </div>

                    <TextInput
                      type="password"
                      label="password"
                      name="password"
                      placeholder="Type 8-character password"
                     
                      
                    />
                      


                  </div>                  

                </div>
        
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
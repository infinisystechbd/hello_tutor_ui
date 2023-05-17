import React from 'react'
import { Form } from 'react-bootstrap'
import Label from '../../../../../components/elements/Label'
import RadioButton from '../../../../../components/elements/RadioButton'
import Select2 from '../../../../../components/elements/Select2'
import TextInput from '../../../../../components/elements/TextInput'
import Textarea from '../../../../../components/elements/Textarea'
import Button from '../../../../../components/elements/Button'
import Select from '../../../../../components/elements/Select'
const Create = () => {
    return (
        <>
            <div className="container-fluid ">
                <div className="w-75 m-auto">
                    <div className="row">
                        <div className="col-md-10">
                            <div className="card">
                                <div className="card-body border-bottom">
                                    <h4 className="card-title">Add Students</h4>
                                </div>

                                <form >
                                    <div className="card-body">
                                        <Form.Group >

                                            <TextInput type="text" label="name" placeholder="Name" required />

                                            <TextInput type="text" label="phone" placeholder="Phone No" required />
                                            <div className="mb-3 row">
                                                <Label text="Gender" />
                                                <div className="col-sm-10">


                                                    <div className="row">
                                                        <div className="flex-gap align-items-center">
                                                            <RadioButton
                                                                label="Male"
                                                                name="gender"
                                                                value="male"
                                                                id="male"

                                                            />

                                                            <RadioButton
                                                                label="Female"
                                                                id="female"
                                                                name="gender"
                                                                value="female"

                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form.Group>

                                        <div className="mb-3 row">
                                            <Label text="City" />
                                            <div className="col-sm-10">

                                                <Select2

                                                />
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <Label text="Location" />
                                            <div className="col-sm-10">
                                                <Select2

                                                />
                                            </div>
                                        </div>

                                        <Textarea type="text" label="Address" row={4} placeholder="Address" required />

                                        <TextInput type="text" label="Email" placeholder="email" required />


                                        <div className="mb-3 row">
                                            <Label text="Status" />
                                            <div className="col-sm-10">
                                                <Select name="promoType" >
                                                    <option value="" disabled>select Status</option>
                                                    <option value="1">Active</option>
                                                    <option value="0">Inactive</option>
                                                </Select>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="p-3 border-top">
                                        <div className="text-end">
                                            <Button className="btn-info">
                                                Add to Voucher
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Create
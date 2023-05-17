import React from 'react'
import { Form } from 'react-bootstrap'
import Label from '../../../../../components/elements/Label'
import RadioButton from '../../../../../components/elements/RadioButton'
import Select2 from '../../../../../components/elements/Select2'
import TextInput from '../../../../../components/elements/TextInput'
import Button from '../../../../../components/elements/Button'
const Create = () => {
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

                                <form >
                                    <div className="card-body">
                                        <Form.Group >
                                            <div className="mb-3 row">
                                                <Label text="Select Food type" />
                                                <div className="col-sm-10">


                                                    <div className="row">
                                                        <div className="flex-gap align-items-center">
                                                            <RadioButton
                                                                label="Add food"
                                                                name="food_type"
                                                                value="add-food"
                                                                id="Add food"

                                                            />

                                                            <RadioButton
                                                                label="Add Setmenu"
                                                                id="Add Setmenu"
                                                                name="food_type"
                                                                value="add-setmenu"

                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form.Group>
                                        <div >
                                            <div className="mb-3 row">
                                                <Label text="Select Category" />
                                                <div className="col-sm-10">

                                                    <Select2

                                                    />
                                                </div>
                                            </div>


                                            <div className="mb-3 row">
                                                <Label text="Select Item" />
                                                <div className="col-sm-10">
                                                    <Select2

                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-3 row">
                                                <Label text="Select Item" />
                                                <div className="col-sm-10">

                                                    <Select2

                                                    />
                                                </div>
                                            </div>

                                        </div>


                                        <div className="mb-3 row">
                                            <Label text="Select Setmenu" />
                                            <div className="col-sm-10">

                                                <Select2
                                                />

                                            </div>
                                        </div>


                                        <TextInput type="text" label="Price" placeholder="item Price" required />

                                        <TextInput type="number" min="1" name="qty" label="Qty" placeholder="item qty" />

                                        <TextInput type="text" label="Total Price" placeholder="Total Price" required />

                                        <TextInput type="text" label="Vat" placeholder="item vat" required />

                                        <TextInput type="text" label="Promo" placeholder="item promo offer" required />

                                        <TextInput label="Remarks" name="remarks" placeholder="Remarks" />

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
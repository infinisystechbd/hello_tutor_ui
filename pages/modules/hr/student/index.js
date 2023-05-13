import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import RadioButton from "../../../../components/elements/RadioButton";
import HeadSection from "../../../../components/HeadSection";
import Select2 from "../../../../components/elements/Select2";
import Label from "../../../../components/elements/Label";
const index = () => {
    return (
        <>
            <div className="container-fluid ">
            {/* w-75 m-auto */}
            <div className="">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card shadow p-3">
                            <HeadSection title="Create New Student" />
                            <div className="border-bottom bg-light title-part-padding d-flex justify-content-between">
                                <h4 className="card-title mb-0">
                                    <strong className="fw-bolder">
                                        Create New Student
                                    </strong>
                                </h4>

                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 p-2 p-4">
                                        <div className="mb-1 mt-2 row">
                                            <Label
                                                className="col-sm-3 col-lg-3 col-md-3 fw-bolder"
                                                text="Student Name:"
                                            />
                                            <div className="col-sm-8 col-lg-8 col-md-8">
                                                <input
                                                    type="text"
                                                    placeholder="Enter The Student Name"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>


                                        <div className="mb-1 mt-2 row">
                                            <Label
                                                className="col-sm-3 col-lg-3 col-md-3 fw-bolder"
                                                text="Remarks:"
                                            />
                                            <div className="col-sm-8 col-lg-8 col-md-8">
                                                <>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="inlineRadioOptions"
                                                            id="inlineRadio1"
                                                            defaultValue="option1"
                                                        />
                                                        <label className="form-check-label" htmlFor="inlineRadio1">
                                                            Male
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="inlineRadioOptions"
                                                            id="inlineRadio2"
                                                            defaultValue="option2"
                                                        />
                                                        <label className="form-check-label" htmlFor="inlineRadio2">
                                                            Female
                                                        </label>
                                                    </div>

                                                </>

                                            </div>
                                        </div>

                                        <div className="mb-1 mt-2 row">
                                            <Label
                                                className="col-sm-3 col-lg-3 col-md-3 fw-bolder"
                                                text="School/collage Name:"
                                            />
                                            <div className="col-sm-8 col-lg-8 col-md-8">
                                                <input
                                                    type="text"
                                                    placeholder="Enter Your School/collage Name"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-1 mt-2 row">
                                            <Label
                                                className="col-sm-3 col-lg-3 col-md-3 fw-bolder"
                                                text="Class:"
                                            />
                                            <div className="col-sm-8 col-lg-8 col-md-8">
                                                <select class="form-select" aria-label="Default select example">
                                                    <option selected>Open this select class</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mb-1 mt-2 row">
                                            <Label
                                                className="col-sm-3 col-lg-3 col-md-3 fw-bolder"
                                                text="Medium:"
                                            />
                                            <div className="col-sm-8 col-lg-8 col-md-8">
                                                <select class="form-select" aria-label="Default select example">
                                                    <option selected>Open this select medium</option>
                                                    <option value="bangla">Bangla Medium</option>
                                                    <option value="Passport">English Medium</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div className="mb-1 mt-2 row">
                                            <Label
                                                className="col-sm-3 col-lg-3 col-md-3 fw-bolder"
                                                text="Number Of Students:"
                                            />
                                            <div className="col-sm-8 col-lg-8 col-md-8">
                                                <input
                                                    type="number"
                                                    placeholder="Enter Number of students"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-1 mt-2 row">
                                            <Label
                                                className="col-sm-3 col-lg-3 col-md-3 fw-bolder"
                                                text="Address:"
                                            />
                                            <div className="col-sm-8 col-lg-8 col-md-8">
                                                <input
                                                    type="text"
                                                    placeholder="Enter Your Address"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>





                                        <div className="mb-1 row">
                                            <div className="mb-3 row m-auto">
                                                <div className="col-sm-11 col-lg-11 col-md-11 mb-4 mt-2 border-bottom">

                                                    <h5 className="text-info">
                                                    Preferred Teacher Information
                                                    </h5>


                                                </div>
                                            </div>


                                            <div className="">
                                                <form >

                                                    <div className="mb-3 row">
                                                        <Label
                                                            className="col-sm-3 col-lg-3 col-md-3 fw-bolder"
                                                            text="Teacher Gender"
                                                        />
                                                        <div className="col-sm-8 col-lg-8 col-md-8">
                                                            <Select2

                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="mb-3 row">
                                                        <Label
                                                            className="col-sm-3 col-lg-3 col-md-3 fw-bolder"
                                                            text="Subject:"
                                                        />
                                                        <div className="col-sm-8 col-lg-8 col-md-8">
                                                            <Select2

                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mb-3 row">
                                                        <Label
                                                            className="col-sm-3 col-lg-3 col-md-3 fw-bolder"
                                                            text="Days:"
                                                        />
                                                        <div className="col-sm-8 col-lg-8 col-md-8">
                                                            <Select2

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 row">



                                                    </div>
                                                    <div className="mb-3 row">
                                                        <Label
                                                            className="col-sm-3 col-lg-3 col-md-3 fw-bolder"
                                                            text="Tuition Time:"
                                                        />
                                                        <div className="col-sm-8 col-lg-8 col-md-8">
                                                            <input
                                                                type="number"
                                                                name="unitCost"
                                                                placeholder="Unit Price"
                                                                className="form-control"
                                                                required

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 row">
                                                        <Label
                                                            className="col-sm-3 col-lg-3 col-md-3 fw-bolder"
                                                            text="Salary:"
                                                        />
                                                        <div className="col-sm-8 col-lg-8 col-md-8">
                                                            <input
                                                                type="number"
                                                                name="qty"
                                                                placeholder="Item Quantity"
                                                                className="form-control"
                                                                min="0"

                                                                required

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 row">
                                                        <Label
                                                            className="col-sm-3 col-lg-3 col-md-3 fw-bolder"
                                                            text="Note:"
                                                        />
                                                        <div className="col-sm-8 col-lg-8 col-md-8">
                                                            <input
                                                                type="number"
                                                                name="total"
                                                                placeholder="Total Cost"
                                                                className="form-control"

                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="p-3 text-center">
                                                        <Button
                                                            variant="danger"

                                                        >
                                                            Clear
                                                        </Button>
                                                        <Button
                                                            className="mx-3"
                                                            variant="primary"

                                                            type="submit"
                                                        >
                                                            Add to Receive
                                                        </Button>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-md-6 p-2">
                                        <div className="mb-1 row">
                                            {/* <Label className="col-sm-3 col-lg-3 col-md-3 fw-bolder" text="Laundry Invoice:" />
                    <div className="col-sm-7 col-lg-7 col-md-7 mb-2">
                      <input type="text" placeholder="Supplier Invoice No" className="form-control" value={SupplierInvoiceNumber} required onChange={(e) => setSupplierInvoiceNumber(e.target.value)} />
                    </div> */}
                                            <Label
                                                className="col-sm-3 col-lg-3 col-md-3 fw-bolder"
                                                text="Invoice Date:"
                                            />
                                            <div className="col-sm-7 col-lg-7 col-md-7">






                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default index
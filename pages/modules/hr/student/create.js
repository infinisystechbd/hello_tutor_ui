import React from 'react'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import RadioButton from "../../../../components/elements/RadioButton";
import HeadSection from "../../../../components/HeadSection";
const student = () => {
    return (
        <>
            <HeadSection title="Create Student Accounts" />
            <div className="container-fluid">
                <div className="w-75 m-auto">
                    <div className="card shadow p-3">
                        <Form  >
                            <div className="card-body border-bottom ">
                                <h4 className="card-title fw-bolder">Create Student Account</h4>
                            </div>
                            <div className="card-body">
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="10" controlId="validationCustom01">
                                        <Form.Label>Student Name</Form.Label>
                                        <Form.Control
                                            required
                                            name="studentname"
                                            type="text"
                                            placeholder="Student Name"
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group
                                        md="10"
                                        className="d-flex"
                                        controlId="validationCustom01"
                                    >
                                        <Form.Label>Gender</Form.Label>
                                        <span className="mx-5">
                                            <RadioButton
                                                label="Male"
                                                id="male"
                                                name="gender"
                                                value="male"
                                            />
                                        </span>
                                        <RadioButton
                                            label="Female"
                                            id="female"
                                            name="gender"
                                            value="female"
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="10" controlId="validationCustom01">
                                        <Form.Label>Mobile Number*</Form.Label>
                                        <Form.Control
                                            required
                                            name="mobilenumber"
                                            type="text"
                                            placeholder="017********"

                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="10" controlId="validationCustom01">
                                        <Form.Label>School/Collage Name</Form.Label>
                                        <Form.Control
                                            required
                                            name="schoolname"
                                            placeholder="Enter Your School Name"
                                            type="text"
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="10" controlId="validationCustom01">
                                        <Form.Label>Medium*</Form.Label>
                                        <Form.Select
                                            name="id_type"
                                            required
                                        >
                                            <option disabled value="">
                                                Choose Option
                                            </option>
                                            <option value="bangla">Bangla Medium</option>
                                            <option value="Passport">English Medium</option>
                                        </Form.Select>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="10" controlId="validationCustom01">
                                        <Form.Label>No. of Students</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="studentnumber"
                                            min="0"
                                            placeholder="Enter number of student"
                                            required
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} className="mb-2" md="10" controlId="validationCustom01">
                                        <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Enter Full Address"
                                            name="address"

                                            required
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="10" controlId="validationCustom01">
                                        <Form.Label>Accounts Descriptions*</Form.Label>
                                        <Form.Control
                                            required
                                            as="textarea"
                                            placeholder="Description..."
                                            rows={3}
                                            name="description"
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className="w-50 m-auto p-4">
                                    <Button variant="success" type="submit">
                                        Create Account
                                    </Button>
                                </Row>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default student
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import HeadSection from "../../components/HeadSection";
import Stopwatch from "../../components/Stopwatch";
import ToastMessage from '../../components/Toast/index';
import { SECURITY_END_POINT } from "../../constants/index";
import { post } from "../../helpers/api_helper";
import Axios from "../../utils/axios";
//import img from 'next/image';


const LoginPage = () => {
    const { http, setToken, token } = Axios();
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [value, setValue] = useState(false);
    const [gender, setGender] = useState('female');
    const [guardianFrom, setGuardianFrom] = useState(false);
    const [verify, setVerify] = useState(true);
    const [userId, setUserId] = useState(null);
    const [otp, setOtp] = useState("")
    const [isGuardian, setIsGuardian] = useState(true);
    const [loading, setLoading] = useState(false);
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);





    const handleNewPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const confirmPasswordValidator = (value) => {
        if (!value || newPassword === value) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('The passwords do not match!'));
    };




    const submitForm = async (event) => {
        event.preventDefault();
        try {
            const login = await post(SECURITY_END_POINT.login(), { phone: phone, password: password });
            setToken(login.accessToken);
            notify("success", "successfully Login!");

        } catch (error) {
            let message;
            const errorStatus = error?.response?.status;
            if (errorStatus) {
                switch (error.response.status) {
                    case 404:
                        message = 'Sorry! the page you are looking for could not be found';
                        break;
                    case 500:
                        message = 'Sorry! something went wrong, please contact our support team';
                        break;
                    case 401:
                        message = 'Invalid credentials';
                        break;
                    default:
                        message = error[1];
                        break;
                }
            }


            if (!errorStatus && error.code === 'ERR_NETWORK') {
                message = 'Netword Error!';
            }
            notify("error", message);
        }

    }


    const guardianRegForm = async (event) => {
        event.preventDefault();
        try {
            const guardianReg = await post(SECURITY_END_POINT.guardianReg(), { phone: phone, password: password, confirmPassword: confirmPassword });
            notify("success", "successfully Registration!");
            setUserId(guardianReg?.data?._id);
            setVerify(false)
        } catch (error) {
            let message;
            console.log(error);
            notify("error", message);
        }
    }


    const tutorRegForm = async (event) => {
        event.preventDefault();
        try {
            const tutorReg = await post(SECURITY_END_POINT.tutorReg(), { fullName: fullName, phone: phone, gender: gender, password: password, confirmPassword: confirmPassword });
            notify("success", "successfully Registration!");
            setUserId(tutorReg?.data?._id);
            setVerify(false)

        } catch (error) {
            let message;
            console.log(error);

            notify("error", message);
        }
    }





    const handleRegister = () => {
        setValue(!value); //
    };




    const tokenHandeler = async (event) => {
        // id,otp
        event.preventDefault();
        setLoading(true);

        try {
            const update = await post(SECURITY_END_POINT.verifyOtp(userId), { token: otp });
            if (update.status == 'SUCCESS') {
                const login = await post(SECURITY_END_POINT.login(), { phone: phone, password: password });
                setToken(login.accessToken);
                notify("success", "successfully Login!");

            }
        } catch (error) {
            notify('error', update.error);
            setLoading(false);
        }
        setLoading(false);
    };


    useEffect(() => {
        if (token) {
            router.replace('/');
        }
    }, [router, token])
    return (
        <>
            <HeadSection title="Registration" />
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-8 col-lg-6 col-xl-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid"
                                alt="Sample image"
                            />
                        </div>
                        <div className="col-md-9 col-lg-6 col-xl-4 offset-xl-1">


                            {
                                verify ?
                                    <>
                                        <form onSubmit={submitForm}>
                                            <div>
                                                <div className="container">
                                                    <div className="row justify-content-center">
                                                        <div className="col-md-6">
                                                            {/* Guardian Card */}
                                                            <div className="card mb-4" style={{ backgroundColor: 'white' }}>
                                                                <div className="card-body">
                                                                    <div className="form-check form-check-inline">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            name="role"
                                                                            id="guardian"
                                                                            value={true}
                                                                            onChange={() => setIsGuardian(true)}
                                                                            checked={isGuardian}
                                                                        />
                                                                        <label className="form-check-label d-flex align-items-center" htmlFor="guardian">
                                                                            <span>Guardian</span>
                                                                            <img
                                                                                src="https://img.favpng.com/2/0/20/lesson-cartoon-student-png-favpng-f1isHzw7i2t29Uygdk4FrSKzP.jpg"
                                                                                alt="Male"
                                                                                className="gender-image img-fluid"
                                                                                style={{ maxWidth: '100px', maxHeight: '100px', backgroundSize: 'cover', marginLeft: '63px' }}
                                                                            />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>




                                                        </div>

                                                        <div className="col-md-6">
                                                            {/* Tutor Card */}
                                                            <div className="card" style={{ backgroundColor: 'white' }}>
                                                                <div className="card-body">
                                                                    <div className="form-check form-check-inline">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            name="role"
                                                                            id="tutor"
                                                                            value={false}
                                                                            onChange={() => setIsGuardian(false)}
                                                                            checked={!isGuardian}
                                                                        />
                                                                        <label className="form-check-label d-flex align-items-center" htmlFor="tutor">
                                                                            <span>Tutor</span>
                                                                            <img
                                                                                src="https://www.pngitem.com/pimgs/m/351-3513600_transparent-teacher-cartoon-png-teachers-day-clipart-png.png"
                                                                                alt="Female"
                                                                                className="gender-image img-fluid"
                                                                                style={{ maxWidth: '100px', maxHeight: '100px', backgroundSize: 'cover', marginLeft: '10px' }}
                                                                            />
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>


                                                {isGuardian ?
                                                    (

                                                        //guardian register from
                                                        <div className="card">
                                                            <div className="card-body">

                                                                <div className="form-outline mb-4">
                                                                    <input
                                                                        type="name"
                                                                        id="form3Example3"
                                                                        className="form-control form-control-lg"
                                                                        placeholder="Enter a valid Phone Number"
                                                                        value={phone}
                                                                        onChange={(e) => setPhone(e.target.value)}
                                                                    />
                                                                    <label className="form-label" htmlFor="form3Example3">
                                                                        Phone Number
                                                                    </label>
                                                                </div>


                                                                <div>
                                                                    <div className="mb-3">
                                                                        <label htmlFor="newPassword" className="form-label">
                                                                            New Password
                                                                        </label>
                                                                        <input
                                                                            type="password"
                                                                            id="newPassword"
                                                                            className="form-control"
                                                                            placeholder="Enter new password"
                                                                            value={password}
                                                                            onChange={handleNewPasswordChange}
                                                                        />
                                                                    </div>

                                                                    <div className="mb-3">
                                                                        <label htmlFor="confirmPassword" className="form-label">
                                                                            Confirm Password
                                                                        </label>
                                                                        <input
                                                                            type="password"
                                                                            id="confirmPassword"
                                                                            className="form-control"
                                                                            placeholder="Confirm new password"
                                                                            value={confirmPassword}
                                                                            onChange={handleConfirmPasswordChange}
                                                                        />
                                                                        {password && (
                                                                            <div className="text-danger">
                                                                                {confirmPassword && password !== confirmPassword && 'The passwords do not match!'}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div className="text-center text-lg-start mt-4 pt-2">
                                                                    <button
                                                                        type="submit"
                                                                        className="btn btn-primary btn-lg"
                                                                        // style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                                                        style={{
                                                                            backgroundColor: "#007bff",
                                                                            color: "#fff",
                                                                            // width: "200px" // Width of the button
                                                                        }}
                                                                        onClick={guardianRegForm}
                                                                    >
                                                                        Register Guardian
                                                                    </button>
                                                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                                                        Already  have an account?{" "}
                                                                        <Link href="/login" className="link-danger">

                                                                            <span className="text-primary">Login</span>

                                                                        </Link>
                                                                    </p>


                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) :



                                                    (

                                                        //tutor register from
                                                        <>

                                                            <div className="card">
                                                                <div className="card-body">

                                                                    <div className="form-outline mb-3">
                                                                        <input
                                                                            type="text"
                                                                            id="form3ExampleName"
                                                                            className="form-control form-control-lg"
                                                                            placeholder="Enter your name"
                                                                            value={fullName}
                                                                            onChange={e => setFullName(e.target.value)}
                                                                        />
                                                                        <label className="form-label" htmlFor="form3ExampleName">
                                                                            Fullname
                                                                        </label>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-6">

                                                                            <div className="form-outline mb-4">
                                                                                <input
                                                                                    type="text"
                                                                                    id="form3Example3"
                                                                                    className="form-control form-control-lg"
                                                                                    placeholder="Enter a valid Phone Number"
                                                                                    // value={phone}
                                                                                    onChange={e => setPhone(e.target.value)}
                                                                                />
                                                                                <label className="form-label" htmlFor="form3Example3">
                                                                                    Phone Number
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="form-outline mb-4 my-4">
                                                                                <label className="form-label" htmlFor="form3Example5">Gender</label>
                                                                                <div className="form-check form-check-inline">
                                                                                    <input
                                                                                        className="form-check-input"
                                                                                        type="radio"
                                                                                        name="gender"
                                                                                        id="male"
                                                                                        value="Male"
                                                                                        checked={gender === 'Male'}
                                                                                        onChange={() => setGender('Male')}
                                                                                    />
                                                                                    <label className="form-check-label" htmlFor="male">
                                                                                        Male
                                                                                    </label>
                                                                                </div>
                                                                                <div className="form-check form-check-inline">
                                                                                    <input
                                                                                        className="form-check-input"
                                                                                        type="radio"
                                                                                        name="gender"
                                                                                        id="female"
                                                                                        value="Female"
                                                                                        checked={gender === 'Female'}
                                                                                        onChange={() => setGender('Female')}
                                                                                    />
                                                                                    <label className="form-check-label" htmlFor="female">
                                                                                        Female
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>





                                                                    {/* Password input */}
                                                                    <div>
                                                                        <div className="mb-3">
                                                                            <label htmlFor="newPassword" className="form-label">
                                                                                New Password
                                                                            </label>
                                                                            <input
                                                                                type="password"
                                                                                id="newPassword"
                                                                                className="form-control"
                                                                                placeholder="Enter new password"
                                                                                value={password}
                                                                                onChange={handleNewPasswordChange}
                                                                            />
                                                                        </div>

                                                                        <div className="mb-3">
                                                                            <label htmlFor="confirmPassword" className="form-label">
                                                                                Confirm Password
                                                                            </label>
                                                                            <input
                                                                                type="password"
                                                                                id="confirmPassword"
                                                                                className="form-control"
                                                                                placeholder="Confirm new password"
                                                                                value={confirmPassword}
                                                                                onChange={handleConfirmPasswordChange}
                                                                            />
                                                                            {password && (
                                                                                <div className="text-danger">
                                                                                    {confirmPassword && password !== confirmPassword && 'The passwords do not match!'}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>


                                                                    <div className="text-center text-lg-start mt-4 pt-2">
                                                                        <button
                                                                            type="submit"
                                                                            className="btn btn-primary btn-lg"
                                                                            // style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                                                            style={{
                                                                                backgroundColor: "#007bff",
                                                                                color: "#fff",
                                                                                // width: "200px" // Width of the button
                                                                            }}
                                                                            onClick={tutorRegForm}
                                                                        >
                                                                            Register Teacher
                                                                        </button>
                                                                        <p className="small fw-bold mt-2 pt-1 mb-0">
                                                                            Already  have an account?{" "}
                                                                            <Link href="/login" className="link-danger">


                                                                                <span className="text-primary">Login</span>
                                                                            </Link>
                                                                        </p>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>)}

                                            </div>



                                        </form>
                                    </>

                                    :

                                    <>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="form-outline mb-4">
                                                        <Stopwatch />
                                                        <input
                                                            type="name"
                                                            id="form3Example3"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter Token"
                                                            // value={phone}
                                                            onChange={e => setOtp(e.target.value)}
                                                        />
                                                        <label className="form-label" htmlFor="form3Example3">
                                                            Token
                                                        </label>

                                                    </div>
                                                    <div className="row">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary btn-lg"
                                                            // style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                                            style={{
                                                                backgroundColor: "#007bff",
                                                                color: "#fff",
                                                                // width: "200px" // Width of the button
                                                            }}
                                                            onClick={tokenHandeler}
                                                        >
                                                            Send
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                            }

                        </div>
                    </div>
                </div>

            </section>

        </>
    );
};

export default LoginPage;






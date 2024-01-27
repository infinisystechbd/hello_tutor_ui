import React, { useState } from 'react'

const SignUpFirstComponent = ({ otpSent, setPostEmailOtp, postEmailOtp }) => {

    const [selectedCheckbox, setSelectedCheckbox] = useState('student');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordLengthError, setPasswordLengthError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);


    
    // const handleChange = (e) => {
    //     setPostEmailOtp((prev) => ({
    //         ...prev,
    //         [e.target.name]: e.target.value,
    //     }));
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPostEmailOtp((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === 'password') {
            setPasswordLengthError(value.length < 6);
            setPasswordMatchError(postEmailOtp.confirmPassword !== value && postEmailOtp.confirmPassword !== '');
        } else if (name === 'confirmPassword') {
            setPasswordMatchError(postEmailOtp.password !== value && postEmailOtp.password !== '');
        }
    };

    // const handleCheckboxChange = (checkboxId) => {
    //     setSelectedCheckbox(checkboxId);
    // };


    const handleCheckboxChange = (checkboxId) => {
        setPostEmailOtp((prev) => ({
            ...prev,
            selectedCheckbox: checkboxId,
        }));
        setSelectedCheckbox(checkboxId);
    };

    const checkboxData = [
        { id: 'teacher', src: 'https://cdn0.iconfinder.com/data/icons/tutor-icon-set/512/teacher_writing_on_board-512.png' },
        { id: 'student', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5sChniPpNGCn0KsJ1Ps7atiaB0Lg8C0BWXOk7qeUtqg&s' },
    ];
    return (
        <>
            <div className="flex items-center space-x-4">
                {checkboxData.map((checkbox) => (
                    <div key={checkbox.id}>
                        <input
                            type="checkbox"
                            id={checkbox.id}
                            className="hidden"
                            onChange={() => handleCheckboxChange(checkbox.id)}
                            checked={selectedCheckbox === checkbox.id}
                        />
                        <label
                            htmlFor={checkbox.id}
                            className={`border p-2 block relative cursor-pointer transition-all duration-400 border-primary ${selectedCheckbox === checkbox.id ? 'bg-primary border-primary-dark' : 'hover:border-primary-dark'
                                }`}
                        >
                            <img
                                src={checkbox.src}
                                alt={`Checkbox ${checkbox.id}`}
                                className="h-20 w-20 transition-all duration-200 transform-origin-center"
                            />
                        </label>
                    </div>
                ))}
            </div>


            <form onSubmit={otpSent}>
            {selectedCheckbox === 'teacher' && 

           <>
           
           <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Full Name
                    </label>
                    <div className="relative">
                        <input
                            name='fullName'
                            type="text"
                            placeholder="Enter your full Name"
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            onChange={handleChange}
                        />

                        <span className="absolute right-4 top-4">
                            <svg
                                className="fill-current"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g opacity="0.5">
                                    <path
                                        d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                        fill=""
                                    />
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>
           
            <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Gender
                    </label>

                    <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                onChange={handleChange}
                                className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none"
                            // defaultChecked={jobCreation?.studentGender === "Male"}

                            />
                            <span className="ml-2">Male</span>
                        </label>

                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                onChange={handleChange}
                                className="form-radio h-5 w-5 text-primary border-primary focus:ring-0 focus:outline-none"
                            // defaultChecked={jobCreation?.studentGender === "Female"}

                            />
                            <span className="ml-2">Female</span>
                        </label>


                    </div>
                </div>
           
           </>
                
               
                
                
                }
                <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Phone
                    </label>
                    <div className="relative">
                        <input
                            name='phone'
                            type="phhone"
                            placeholder="Enter your phone number"
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            onChange={handleChange}
                        />

                        <span className="absolute right-4 top-4">
                            <svg
                                className="fill-current"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g opacity="0.5">
                                    <path
                                        d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                        fill=""
                                    />
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>



                <div>
            {/* Password Input */}
            <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                </label>
                <div className="relative">
                    <input
                        type="password"
                        placeholder="At least 6 characters"
                        className={`w-full rounded-lg border ${passwordLengthError ? 'border-red-500' : 'border-stroke'
                            } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none ${passwordLengthError ? 'dark:border-red-500' : 'dark:border-form-strokedark'
                            } dark:bg-form-input dark:focus:border-primary`}
                        onChange={handleChange}
                        name="password"
                    />
                    <span className="absolute right-4 top-4">
                        {/* Eye icon for password visibility */}
                    </span>
                    {passwordLengthError && (
                        <span className="top-4 text-danger">
                            Password must be at least 6 characters.
                        </span>
                    )}
                </div>
            </div>

            {/* Confirm Password Input */}
            <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        className={`w-full rounded-lg border ${passwordMatchError ? 'border-red-500' : 'border-stroke'
                            } bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none ${passwordMatchError ? 'dark:border-red-500' : 'dark:border-form-strokedark'
                            } dark:bg-form-input dark:focus:border-primary`}
                        onChange={handleChange}
                        name="confirmPassword"
                    />
                    {passwordMatchError && (
                        <span className="top-4 text-danger">
                            Passwords do not match.
                        </span>
                    )}
                </div>
            </div>

            {/* Rest of your component */}
        </div>

                <div className="mb-5">
                    <input
                        type="submit"
                        value="Submit"
                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                </div>

            </form>

        </>
    )
}

export default SignUpFirstComponent
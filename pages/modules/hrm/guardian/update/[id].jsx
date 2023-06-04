import { useEffect, useState, useCallback, Fragment } from 'react';
import Button from "../../../../../components/elements/Button";
import Form from "../../../../../components/elements/Form";
import Label from "../../../../../components/elements/Label";
import Select from "../../../../../components/elements/Select";
import Select2 from "../../../../../components/elements/Select2";
import TextInput from "../../../../../components/elements/TextInput";
import HeadSection from "../../../../../components/HeadSection";
import { CITY_END_POINT } from '../../../../../constants/api_endpoints/cityEndPoints';
import { LOCATION_END_POINT } from '../../../../../constants/api_endpoints/locationEndPoints';
import { GUARDIAN_END_POINT } from '../../../../../constants/api_endpoints/guardianEndPoints';
import { get, post, put } from '../../../../../helpers/api_helper';
import ToastMessage from '../../../../../components/Toast';
import { useRouter } from "next/router";

const GuardianUpdate = () => {

    const router = useRouter();
    const { id } = router?.query;
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const [cityList, setAllCityList] = useState([]);
    const [locationList, setAllLocationList] = useState([]);

    const [guardianDetails, setGuardianDetails] = useState({
        fullName: "",
        phone: "",
        city: "",
        location: "",
        address: "",
        email: "",
        isPortalAccess: "false",
        status: "" || "true"
    });

    console.log(guardianDetails);


    useEffect(() => {
        const controller = new AbortController();
        const fetchTotalCities = async () => {
            let isSubscribed = true;
            try {
                const getAllList = await get(CITY_END_POINT.get());
                setAllCityList(getAllList?.data);

            } catch (error) {
                console.log("find the error");
            }

            return () => isSubscribed = false;
        }
        fetchTotalCities();
    }, [])


    useEffect(() => {
        const controller = new AbortController();
        const fetchTotalLocation = async () => {
            let isSubscribed = true;
            try {
                const getAllLocationList = await get(LOCATION_END_POINT.get());
                setAllLocationList(getAllLocationList?.data);

            } catch (error) {
                console.log("find the error");
            }

            return () => isSubscribed = false;
        }
        fetchTotalLocation();
    }, [])




    const fetchGuardian = useCallback(async () => {
        let isSubscribed = true;
        if (id) {
            const getTheGuardian = await get(GUARDIAN_END_POINT.info(id));
            console.log("</datas>",getTheGuardian?.data);
            setGuardianDetails(prev => ({
                ...prev,
                fullName: getTheGuardian?.data?.fullName,
                phone: getTheGuardian?.data?.phone,
                city: getTheGuardian?.data?.city?._id,
                location: getTheGuardian?.data?.location?._id,
                address: getTheGuardian?.data?.address,
                email: getTheGuardian?.data?.email,
                isPortalAccess: getTheGuardian?.data?.isPortalAccess,
                status: getTheGuardian?.data?.status,
                // name: getTheGuardian?.data?.city?.name,
            }));
        }

        // setLoading(true);
        return () => (isSubscribed = false);
    }, [id]);


    useEffect(() => {
        fetchGuardian();
    }, [fetchGuardian]);

    const handleChange = (e) => {
        setGuardianDetails(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    async function submitForm(e) {
        e.preventDefault();
        const updateTheGuardian = await put(GUARDIAN_END_POINT.update(id), guardianDetails);
        if (updateTheGuardian.status === 'SUCCESS') {
            notify("success", updateTheGuardian.message);
            router.push(`/modules/hrm/guardian`);
        }

        else {
            notify("error", updateTheGuardian.message);
        }


    }
  return (
    <>
     <HeadSection title="Update Guardian-Details" />
    <div className="container-fluid ">
        <div className="w-75 m-auto">
            <div className="row">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-body border-bottom">
                            <h4 className="card-title">Update Students</h4>
                        </div>

                        <Form onSubmit={submitForm}>

                            <div className="card-body">

                                <TextInput label="Student Name" value={guardianDetails.fullName} placeholder="Student Name" name="fullName" onChange={handleChange} />
                                <TextInput label="Phone Number" value={guardianDetails.phone} placeholder="Phone Number" name="phone" onChange={handleChange} />
                                <div className="mb-3 row">
                                    <Label text="City" />
                                    <div className="col-sm-6">
                                        <Select name="city" defaultValue={{
                                                    value: guardianDetails?.city?._id,
                                                    label: guardianDetails?.city?.name,
                                                }} onChange={handleChange}>
                                        <option value="" disabled>Select country</option>
                                            {
                                                cityList?.map((city, index) => (
                                                    <Fragment key={index}>
                                                        <option value={city._id} selected>{city.name}</option>
                                                    </Fragment>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <Label text="Location" />
                                    <div className="col-sm-6">
                                        <Select name="location" defaultValue={{
                                                    value: guardianDetails?.location?._id,
                                                    label: guardianDetails?.location?.name,
                                                }} onChange={handleChange}>
                                        <option value="" disabled>Select Location</option>
                                            {
                                                locationList?.map((locn, index) => (
                                                    <Fragment key={index}>
                                                        <option value={locn._id} selected>{locn.name}</option>
                                                    </Fragment>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                </div>
                                <TextInput label="Address" value={guardianDetails.address} placeholder="Phone Number" name="address" onChange={handleChange} />
                                <TextInput label="Email" value={guardianDetails.email} placeholder="Email" name="email" onChange={handleChange} />
                                <div className="mb-3 row">
                                    <Label text="Status" />
                                    <div className="col-sm-6">
                                        <Select name="status" value={guardianDetails.status} onChange={handleChange} >
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
                                        Update
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

export default GuardianUpdate
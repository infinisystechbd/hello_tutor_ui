import { useEffect, useState, useCallback, Fragment } from 'react';
import Button from "../../../../../components/elements/Button";
import Form from "../../../../../components/elements/Form";
import Label from "../../../../../components/elements/Label";
import Select from "../../../../../components/elements/Select";
import Select2 from "../../../../../components/elements/Select2";
import TextInput from "../../../../../components/elements/TextInput";
import HeadSection from "../../../../../components/HeadSection";
import { LOCATION_END_POINT } from '../../../../../constants/api_endpoints/locationEndPoints';
import { CITY_END_POINT } from '../../../../../constants/api_endpoints/cityEndPoints';
import { get, post } from '../../../../../helpers/api_helper';
import ToastMessage from '../../../../../components/Toast';
import { useRouter } from "next/router";

const CreateLocation = () => {
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const router = useRouter();
    const [cityId, setCityId] = useState("");
    const [locationDetails, setLocationDetails] = useState({
        name: "",
        status: "" || "true",
        city: cityId
    });
    console.log(locationDetails);
    const [cityList, setAllCityList] = useState([]);
    console.log(cityList);
    const [city, setCity] = useState([]);




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



    const handleChange = (e) => {
        setLocationDetails(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const onSelectCity = (e) => {
        setCity([])
        e.map((x) => {
            setCity(cty => [
                ...cty,
                { city: x.value }
            ])
        })

    }


    async function submitForm(e) {
        e.preventDefault();
        const body = { ...locationDetails, city };
        console.log(body);

        const response = await post(LOCATION_END_POINT.create(), body);
        if (response.status === "SUCCESS") {

            notify("success", "successfully Created!");
            router.push(`/modules/hrm/location`);
        }
        else {
            notify("error", "something went wrong");
        }

    }


    return (
        <>
            <HeadSection title="Add Class" />
            <div className="container-fluid ">
                <div className="w-75 m-auto">
                    <div className="row">
                        <div className="col-md-10">
                            <div className="card">
                                <div className="card-body border-bottom">
                                    <h4 className="card-title">Add Location</h4>
                                </div>

                                <Form onSubmit={submitForm} >

                                    <div className="card-body">

                                        <TextInput name="name" label="Location Name" placeholder="Location Name" onChange={handleChange} value={locationDetails.name} />
                                        <div className="mb-3 row">
                                            <Label text="City" />
                                            <div className="col-sm-6">
                                                <Select name="city" value={locationDetails.city} onChange={handleChange}>
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
                                            <Label text="Status" />
                                            <div className="col-sm-6">
                                                <Select name="status" value={locationDetails.status} onChange={handleChange}>
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

export default CreateLocation
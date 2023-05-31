import React, { useCallback, useState, useEffect,Fragment } from 'react'
import { useRouter } from "next/router";
import Form from "../../../../../components/elements/Form";
import Label from "../../../../../components/elements/Label";
import TextInput from "../../../../../components/elements/TextInput";
import Select from "../../../../../components/elements/Select";
import Button from "../../../../../components/elements/Button";
import { get, put } from '../../../../../helpers/api_helper';
import { LOCATION_END_POINT } from '../../../../../constants/api_endpoints/locationEndPoints';
import { CITY_END_POINT } from '../../../../../constants/api_endpoints/cityEndPoints';
import ToastMessage from '../../../../../components/Toast';
import HeadSection from "../../../../../components/HeadSection";

const EditLocation = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { id } = router?.query;
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    
    const [cityId, setCityId] = useState("");
    const [locationDetails, setLocationDetails] = useState({
        name: "",
        status: "" || "true",
        city: ""
    });
    console.log(locationDetails);
    const [cityList, setAllCityList] = useState([]);
    

    useEffect(() => {
        const controller = new AbortController();
        const fetchTotalCities = async () => {
            let isSubscribed = true;
            try {
                const getAllList = await get(LOCATION_END_POINT.get());
                setAllCityList(getAllList?.data);

            } catch (error) {
                console.log("find the error");
            }

            return () => isSubscribed = false;
        }
        fetchTotalCities();
    }, [])



    const fetchLocation = useCallback(async () => {
        let isSubscribed = true;
        if (id) {
          const getTheLocation = await get(LOCATION_END_POINT.info(id));
          setLocationDetails(prev => ({
            ...prev,
            name: getTheLocation?.data?.name,
            status: getTheLocation?.data?.status,
            city :getTheLocation?.data?.city
          }));
        }
    
        // setLoading(true);
        return () => (isSubscribed = false);
      }, [id]);
    
    
      useEffect(() => {
        fetchLocation();
      }, [fetchLocation]);


    const handleChange = (e) => {
        setLocationDetails(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }


    async function submitForm(e) {
        e.preventDefault();
        const updateTheLocation = await put(LOCATION_END_POINT.update(id), locationDetails);
        if (updateTheLocation.status ==='SUCCESS' ) {
          notify("success", updateTheLocation.message);
          router.push(`/modules/hrm/location`);
        }
    
        else{
          notify("error", updateTheLocation.message);
        }  
    
    
      }


  return (
    <>
    <HeadSection title="Update Location" />
    <div className="container-fluid ">
        <div className="w-75 m-auto">
            <div className="row">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-body border-bottom">
                            <h4 className="card-title">Update Location</h4>
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

export default EditLocation
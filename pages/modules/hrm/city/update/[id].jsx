import { useEffect, useState, useCallback } from 'react';
import HeadSection from "../../../../../components/HeadSection";
import Button from "../../../../../components/elements/Button";
import Form from "../../../../../components/elements/Form";
import Label from "../../../../../components/elements/Label";
import RadioButton from "../../../../../components/elements/RadioButton";
import Select from "../../../../../components/elements/Select";
import Select2 from "../../../../../components/elements/Select2";
import TextInput from "../../../../../components/elements/TextInput";
import ToastMessage from '../../../../../components/Toast';
import { useRouter } from "next/router";
// import { CITY_END_POINT } from '../../../../constants/api_endpoints/cityEndPoints';
import { CITY_END_POINT } from "../../../../../constants/api_endpoints/cityEndPoints";
import { get, post, put } from '../../../../../helpers/api_helper';

const CityUpdate = () => {

    const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { id } = router?.query;
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  
  const [cityDetails, setCityDetails] = useState(
    {
        name: "",
        status: ""
      }
  );
console.log("cityDetails",cityDetails);


  const fetchCity = useCallback(async () => {
    let isSubscribed = true;
    if (id) {
      const getTheCity = await get(CITY_END_POINT.info(id));
      console.log("getTheCity", getTheCity);

      setCityDetails(prev => ({
        ...prev,
        name: getTheCity?.data?.name,
        status: getTheCity?.data?.status
      }));
    }

    // setLoading(true);
    return () => (isSubscribed = false);
  }, [id]);



  useEffect(() => {
    fetchCity();
  }, [fetchCity])


  const handleChange = (e) => {
    setCityDetails(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }
  

  async function submitForm(e) {
    e.preventDefault();
  
    const updateTheClass = await put(CITY_END_POINT.update(id), cityDetails);
    if (updateTheClass.status === 'SUCCESS') {
      notify("success", updateTheClass.message);
      router.push(`/modules/hrm/city`);
    }

    else {
      notify("error", updateTheClass.message);
    }

  }


  return (
    <>
    <HeadSection title="Update City" />
    <div className="container-fluid ">
      <div className="w-75 m-auto">
        <div className="row">
          <div className="col-md-10">
            <div className="card">
              <div className="card-body border-bottom">
                <h4 className="card-title">Update City</h4>
              </div>
              <Form onSubmit={submitForm} >
                <div className="card-body">
                  <TextInput name="name" label="City" placeholder="City Name"  value={cityDetails?.name}  onChange={handleChange}/>


                  <div className="mb-3 row">
                    <Label text="Status" />
                    <div className="col-sm-6">
                      <Select name="status" value={cityDetails?.status} onChange={handleChange}  >
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

export default CityUpdate
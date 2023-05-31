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
import { CLASS_END_POINT } from "../../../../../constants/api_endpoints/classEndPoints";
import { CATEGORIE_END_POINT } from "../../../../../constants/api_endpoints/categorieEndPoints";
import { get, post } from '../../../../../helpers/api_helper';

// 
const Categories = () => {

  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const router = useRouter();
  const [categorieDetails, setCategorieDetails] = useState({
    name: "",
    status: "" || "true",
  });

  const [allClassesList, setAllClassesList] = useState([]);
  const [allClasses, setAllClasses] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchTotalClasses = async () => {
      let isSubscribed = true;
      try {
        const getAllClassList = await get(CLASS_END_POINT.get());
        setAllClassesList(getAllClassList?.data);

      } catch (error) {
        console.log("find the error");
      }

      return () => isSubscribed = false;
    }
    fetchTotalClasses();
  }, [])




  const handleChange = (e) => {
    setCategorieDetails(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  const onSelectCLass = (e) => {
    setAllClasses([])
    e.map((x) => {
      setAllClasses(cls => [
        ...cls,
        { classId: x.value }
      ])
    })

  }

  async function submitForm(e) {
    e.preventDefault();
    const body = { ...categorieDetails, class: allClasses };
    console.log(body);

    const response = await post(CATEGORIE_END_POINT.create(), body);
    if (response.status === "SUCCESS") {

      notify("success", "successfully Created!");
      router.push(`/modules/hrm/categorie`);
    }
    else {
      notify("error", "something went wrong");
    }


  }

  return (
    <>
      <HeadSection title="Add Categorie" />
      <div className="container-fluid ">
        <div className="w-75 m-auto">
          <div className="row">
            <div className="col-md-10">
              <div className="card">
                <div className="card-body border-bottom">
                  <h4 className="card-title">Add Categorie</h4>
                </div>
                <Form onSubmit={submitForm} >
                  <div className="card-body">
                    <TextInput name="name" label="Categories" placeholder="Bangla/English Version Name"   onChange={handleChange}/>
                    {/* <div className="mb-3 row">
                      <Label text="Name" />
                      <div className="col-sm-6">
                        <Select name="name" onChange={handleChange}  >
                          <option value="" >Bangla/English Version Name</option>
                          <option value="Bangla_Version" >Bangla Version Name</option>
                          <option value="English_Version">English Version Name</option>
                        </Select>
                      </div>
                    </div> */}
                    <div className="mb-3 row">
                      <Label text="Class" />
                      <div className="col-sm-6">
                        <Select2 placeholder="Select class" isMulti
                          options={allClassesList && allClassesList.map(({ _id, name }) => ({
                            value: _id,
                            label: name,
                          }))}
                          onChange={onSelectCLass}
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <Label text="Status" />
                      <div className="col-sm-6">
                        <Select name="status" onChange={handleChange}  >
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

export default Categories
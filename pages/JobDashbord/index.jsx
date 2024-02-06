import JobCard from "@/components/JobCard";
import { CATEGORIE_END_POINT, DASHBOARD_END_POINT } from "@/constants";
import { get } from "@/helpers/api_helper";
import { mapArrayToDropdown } from "@/helpers/common_Helper";
import { Button, Card, Drawer } from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";

const JobDashboard = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [dashboard, setDashboard] = useState([]);
  console.log("dashboard", dashboard)
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [fromDate, SetFromDate] = useState();
  const [toDate, SetToDate] = useState();
  const [category, setCategory] = useState([]);
  const [selectedCateGory, setSelectedCategory] = useState("");
  const [cityDropDown, setCityDropDown] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [locationDropDown, setLocationDropDown] = useState([]);
  const [selectedLocation, setselectedLocation] = useState("");
  const [classDropDown, setClassDropDown] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [subjectDropDown, setSubjectDropDown] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [tutionType, setTutionType] = useState("");
  const [studentGender, setStudentGender] = useState("");
  const [tutorGender, setTutorGender] = useState("");
  const [openTop, setOpenTop] = useState(false);
  const openDrawerTop = () => setOpenTop(true);
  const closeDrawerTop = () => setOpenTop(false);

  const getAllData = async (limit, page) => {
    try {
      const res = await get(
        DASHBOARD_END_POINT.dashbord(
          true,
          limit,
          page,
          fromDate,
          toDate,
          tutionType,
          selectedCity,
          selectedLocation,
          selectedCateGory,
          selectedClass,
          selectedSubject,
          studentGender,
          tutorGender
        )
      );
      setDashboard((prevData) => [...prevData, ...res?.data]);
      //   setDashboard(res?.data);

      setLoading(false);
    } catch (err) {
      console.log("Server Error ~!");
    }
  };
  const fetchCategory = async () => {
    const fetchdata = await get(CATEGORIE_END_POINT.get(1, -1, "", true));
    const arrayToDrop = mapArrayToDropdown(fetchdata?.data, "name", "_id");
    setCategory(arrayToDrop);
  };
  const onChangeFromDate = (date, dateString) => {
    SetFromDate(dateString);
  };
  const onChangeToDate = (date, dateString) => {
    SetToDate(dateString);
  };
  const onChangeCity = async (id) => {
    setSelectedCity(id);
    const fetchLocation = await get(LOCATION_END_POINT.getLocationByCityId(id));
    const locationArrayToDropDown = mapArrayToDropdown(
      fetchLocation?.data,
      "name",
      "_id"
    );
    setLocationDropDown(locationArrayToDropDown);
  };
  const onChangeLocation = (id) => {
    setselectedLocation(id);
  };
  const onChangeCategory = (value) => {
    setSelectedCategory(value);
  };

  const fetchCity = async () => {
    const dataFetch = await get(CITY_END_POINT.get(1, -1, "", ""));
    const cityArrayToDropDown = mapArrayToDropdown(
      dataFetch?.data,
      "name",
      "_id"
    );
    setCityDropDown(cityArrayToDropDown);
  };
  const fetchClass = async () => {
    const classFetch = await get(CLASS_END_POINT.get(1, -1, "", ""));
    const classArrayToDropDown = mapArrayToDropdown(
      classFetch?.data,
      "name",
      "_id"
    );
    setClassDropDown(classArrayToDropDown);
  };
  const onChangeClass = (value) => {
    setSelectedClass(value);
  };
  const fetchSubject = async () => {
    const subjectFetch = await get(SUBJECT_END_POINT.dropdown(1, -1, "", ""));
    const subjectArrayToDropDown = mapArrayToDropdown(
      subjectFetch?.data,
      "name",
      "_id"
    );
    setSubjectDropDown(subjectArrayToDropDown);
  };
  const onChangeSubject = (value) => {
    setSelectedSubject(value);
  };

  const onChangeTutorGender = (value) => {
    setTutorGender(value);
  };
  const onChangeStudentGender = (value) => {
    setStudentGender(value);
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const handleIntersection = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        // Load more data when the target element becomes visible
        setPage((prevPage) => prevPage + 1);
      }
    },
    [loading]
  );

  useEffect(() => {
    const targetElement = document.getElementById("intersectionTarget");
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1, // Adjust as needed
    });

    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, [handleIntersection]);

  /*  useEffect(() => {
    // Load initial data
    getAllData(limit, page);
  }, [limit, page]); */
  useEffect(() => {
    getAllData(limit, page);
  }, [limit, page, selectedCateGory]);
  const resetFilter = () => {
    SetFromDate("");
    SetToDate("");
    setSelectedCity("");
    setselectedLocation("");
    setSelectedClass("");
    setSelectedSubject("");
    setTutionType("");
    setSelectedCategory("");
    getAllData(limit, page);
  };

  return (
    <>
      <Card className="mb-4">
        <div className="flex justify-center items-end">
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {category?.map((t) => (
              <div key={t.categoryId}>
                <Button

                  variant="outlined"
                  onClick={() => onChangeCategory(t._id)}
                >
                  {t.name}
                </Button>
              </div>
            ))}
            <Button variant="outlined" onClick={openDrawerTop}>
              {" "}
              Filter{" "}
            </Button>
            <Button variant="outlined" onClick={resetFilter}>
              {" "}
              Reset-Filter{" "}
            </Button>
          </div>
        </div>
      </Card>
      <div className="flex justify-center items-end">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {dashboard.map((jobDetail, index) => (
            <JobCard key={jobDetail.jobId} data={jobDetail}></JobCard>
          ))}
          <div id="intersectionTarget"></div>
        </div>
      </div>
      <Drawer
        placement="top"
        open={openTop}
        onClose={closeDrawerTop}
        className="p-4"
        height="50vh" // Adjust the height as needed, e.g., "80vh", "400px", etc.
      >
        <div className="mb-6 ">
          <div className="grid grid-cols-4 gap-4 border-t border-gray-400 ">
            <div className="w-full sm:w-2/3">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="nationality"

              >
                From Date
              </label>
              <input
                className="w-full custom-input-date custom-input-date-1 rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="date"
                name="hireDate"
                id="dob"
                placeholder="+990 3343 7865"
              // onChange={handleChange}
              // defaultValue={jobCreation?.hireDate}

              />
            </div>
            <div className="w-full sm:w-2/3">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="nationality"

              >
                To Date
              </label>
              <input
                className="w-full custom-input-date custom-input-date-1 rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="date"
                name="hireDate"
                id="dob"
                placeholder="+990 3343 7865"
              // onChange={handleChange}
              // defaultValue={jobCreation?.hireDate}

              />
            </div>
            <div>09</div>
            <div>09</div>
          </div>
        </div>
        <div className="border-t border-gray-400 flex gap-2">
          <Button size="sm" variant="outlined">
            Apply
          </Button>
          <Button onClick={closeDrawerTop} size="sm" variant="outlined">
            Cancel
          </Button>
        </div>
      </Drawer>

    </>
  );
};

export default JobDashboard;

import JobCard from "@/components/JobCard";
import {
  CATEGORIE_END_POINT,
  CITY_END_POINT,
  CLASS_END_POINT,
  DASHBOARD_END_POINT,
  LOCATION_END_POINT,
  SUBJECT_END_POINT,
} from "@/constants";
import { STUDENTGENDER, TUTORGENDER } from "@/constants/dropdown";
import { get } from "@/helpers/api_helper";
import { mapArrayToDropdown } from "@/helpers/common_Helper";
import { Button, Card, Drawer } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const JobDashboard = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [dashboard, setDashboard] = useState([]);
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
  const [prevScrollPos, setPrevScrollPos] = useState(0);
console.log("prevScrollPos",prevScrollPos)
  const openDrawerTop = () => {
    setOpenTop(true);
    fetchCity();
    fetchClass();
    fetchSubject();
  };
  const closeDrawerTop = () => setOpenTop(false);

  const getAllData = async () => {
    try {
      const response = await get(
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
      if (page === 1) {
        setDashboard(response?.data);
      } else {
        setDashboard((prevData) => [...prevData, ...response?.data]);
      }
      setTotalJobs(response?.total);
      setLoading(false);
    } catch (error) {
      console.log("Server Error:", error);
      setLoading(false);
    }
  };



  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight &&
        !loading &&
        prevScrollPos < document.documentElement.scrollTop
      ) {
        setLoading(true);
        setLimit((prev) => prev + 10);
      }
      setPrevScrollPos(document.documentElement.scrollTop);
    } catch (error) {
      console.log(error);
    }
  };
  
  

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, [loading, limit]);
  
  

  useEffect(() => {
    getAllData(limit);
  }, [limit, selectedCateGory]);

  const fetchCategory = async () => {
    const fetchdata = await get(CATEGORIE_END_POINT.get(1, -1, "", true));
    const arrayToDrop = mapArrayToDropdown(fetchdata?.data, "name", "_id");
    setCategory(arrayToDrop);
  };

  /**fetch location list */

  const handleLocation = async (cityId) => {
    console.log("cityId", cityId);
    try {
      // Fetch location data based on cityId
      const fetchLocation = await get(
        LOCATION_END_POINT.getLocationByCityId(cityId)
      );
      const LOCATIONDROPDOWN = mapArrayToDropdown(
        fetchLocation?.data,
        "name",
        "_id"
      );

      // Update the state with the new location data
      setLocationDropDown(LOCATIONDROPDOWN);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  /**fetch location list  End */

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

  const fetchSubject = async () => {
    const subjectFetch = await get(SUBJECT_END_POINT.dropdown(1, -1, "", ""));
    const subjectArrayToDropDown = mapArrayToDropdown(
      subjectFetch?.data,
      "name",
      "_id"
    );
    setSubjectDropDown(subjectArrayToDropDown);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const onApply = () => {
    setOpenTop(false);
    getAllData(limit, page);
  };

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
      <Card className="mb-4  md:h-auto w-full bg-white lg:p-8 rounded-lg  dark:border-strokedark dark:bg-boxdark   lg:max-h-full">
        <div className="justify-center items-end">
          <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {category?.map((t) => (
              <div key={t.categoryId}>
                <Button
                  className="w-full h-full"
                  variant="outlined"
                  onClick={() => setSelectedCategory(t._id)}
                >
                  {t.name}
                </Button>
              </div>
            ))}
            <Button
              className="w-full h-full"
              variant="outlined"
              onClick={openDrawerTop}
            >
              {" "}
              Filter
            </Button>
            <Button
              className="w-full h-full"
              variant="outlined"
              onClick={resetFilter}
            >
              Reset-Filter
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-center items-end">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
    {dashboard.map((jobDetail, index) => (
      <JobCard key={jobDetail.jobId} data={jobDetail}></JobCard>
    ))}
    {loading && <p>Loading...</p>}
    <div id="intersectionTarget"></div>
  </div>
</div>

      <Drawer
        placement="top"
        open={openTop}
        onClose={closeDrawerTop}
        className="p-4  bg-white dark:bg-black dark:text-white"
        height="50vh" // Adjust the height as needed, e.g., "80vh", "400px", etc.
      >
        <div className="mb-6 mt-2">
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
                name="fromDate"
                id="dob"
                onChange={(event) => SetFromDate(event.target.value)}
                value={fromDate}
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
                name="toDate"
                id="dob"
                onChange={(event) => SetToDate(event.target.value)}
                value={toDate}
              />
            </div>
            <div className="w-full sm:w-2/3">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="fullName"
              >
                City
              </label>
              <div className="relative">
                <select
                  name="city"
                  id="countries"
                  className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  onChange={(e) => setSelectedCity(e.target.value)}
                  value={selectedCity}
                >
                  {cityDropDown && (
                    <>
                      <option value="" disabled>
                        Choose a City{" "}
                      </option>
                      {cityDropDown.map((city) => (
                        <option key={city._id} value={city._id}>
                          {city.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>
            <div className="w-full sm:w-2/3">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="fullName"
              >
                Location
              </label>

              <div className="relative">
                <select
                  name="location"
                  id="countries"
                  className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  onChange={(e) => setselectedLocation(e.target.value)}
                  value={selectedLocation}
                >
                  {locationDropDown && (
                    <>
                      <option value="" disabled>
                        Choose a Location
                      </option>
                      {locationDropDown.map((location) => (
                        <option key={location._id} value={location._id}>
                          {location.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="w-full sm:w-2/3">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="fullName"
              >
                Student Gender
              </label>

              <div className="relative">
                <select
                  name="studentGender"
                  id="studentGender"
                  className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  onChange={(e) => setStudentGender(e.target.value)}
                  value={studentGender}
                >
                  {STUDENTGENDER && (
                    <>
                      <option value="" disabled>
                        Choose a Location
                      </option>
                      {STUDENTGENDER.map((STUDENTGENDER) => (
                        <option
                          key={STUDENTGENDER.value}
                          value={STUDENTGENDER.value}
                        >
                          {STUDENTGENDER.label}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="w-full sm:w-2/3">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="fullName"
              >
                Tutor Gender
              </label>

              <div className="relative">
                <select
                  name="tutorGender"
                  id="tutorGender"
                  className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  onChange={(e) => setTutorGender(e.target.value)}
                  value={tutorGender}
                >
                  {TUTORGENDER && (
                    <>
                      <option value="" disabled>
                        Choose a Location
                      </option>
                      {TUTORGENDER.map((TUTORGENDER) => (
                        <option
                          key={TUTORGENDER.value}
                          value={TUTORGENDER.value}
                        >
                          {TUTORGENDER.label}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="w-full sm:w-2/3">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="fullName"
              >
                Class
              </label>

              <div className="relative">
                <select
                  name="class"
                  id="class"
                  className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  onChange={(e) => setSelectedClass(e.target.value)}
                  value={selectedClass}
                >
                  {classDropDown && (
                    <>
                      <option value="" disabled>
                        Choose a Class
                      </option>
                      {classDropDown.map((classes) => (
                        <option key={classes._id} value={classes._id}>
                          {classes.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="w-full sm:w-2/3">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="fullName"
              >
                Subject
              </label>

              <div className="relative">
                <select
                  name="class"
                  id="class"
                  className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  value={selectedSubject}
                >
                  {subjectDropDown && (
                    <>
                      <option value="" disabled>
                        Choose a Subject
                      </option>
                      {subjectDropDown.map((Subject) => (
                        <option key={Subject._id} value={Subject._id}>
                          {Subject.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* classDropDown */}
          </div>
        </div>
        <div className=" border-gray-400 flex gap-2 mt-2">
          <Button onClick={onApply} size="sm" variant="outlined">
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

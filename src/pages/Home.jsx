import React, { useEffect, useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import ApplicationCard from "../components/ApplicationCard";
import Button from "../components/Button";
import { FaFilter } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "../components/Modal";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import {
  BsSortNumericDown,
  BsSortNumericUp,
  BsSortDown,
  BsSortDownAlt,
} from "react-icons/bs";

const Home = () => {
  const initialFilter = {
    filter: false,
    country: "",
    university: "",
    duration: "",
    language: "",
    minCost: "",
    maxCost: "",
  };
  const [applications, setApplications] = useState([]);
  const [currentApplications, setCurrentApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(10);
  const [isModalActive, setIsModalActive] = useState(false);
  const [filters, setFilters] = useState(initialFilter);

  useEffect(() => {
    getApplications();
  }, []);

  useEffect(() => {
    getCurrentPage(applications);
  }, [currentPage, applications]);

  const getCurrentPage = (app) => {
    const indexOfLastApplication = currentPage * applicationsPerPage;
    const indexOfFirstApplication =
      indexOfLastApplication - applicationsPerPage;
    const currentApplications = app.slice(
      indexOfFirstApplication,
      indexOfLastApplication
    );
    setCurrentApplications(currentApplications);
  };

  const getApplications = async () => {
    try {
      const response = await axios.get("/data/applications.json");
      const data = response.data;
      getCurrentPage(data.applications);
      setApplications(data.applications);
    } catch (error) {
      enqueueSnackbar("data cannot be accessed", "error");
    }
  };

  const convertCostToNumber = (cost) => {
    return parseFloat(cost.replace(/\$|,/g, ""));
  };

  const clearFilter = () => {
    setFilters((filter) => initialFilter);
    setCurrentPage((page) => 1);
    getApplications();
  };

  const handleFilter = () => {
    const filteredApp = applications.filter((app) => {
      return (
        (filters.country === "" ||
          app.country.toLowerCase() === filters.country.toLowerCase()) &&
        (filters.university === "" ||
          app.university
            .toLowerCase()
            .includes(filters.university.toLowerCase())) &&
        (filters.duration === "" ||
          app.duration.toLowerCase() === filters.duration.toLowerCase()) &&
        (filters.language === "" ||
          app.language.toLowerCase() === filters.language.toLowerCase()) &&
        (filters.minCost === "" ||
          convertCostToNumber(app.cost) >= parseInt(filters.minCost)) &&
        (filters.maxCost === "" ||
          convertCostToNumber(app.cost) <= parseInt(filters.maxCost))
      );
    });
    setIsModalActive((modal) => false);
    setCurrentApplications((cur) => filteredApp);
    setApplications((app) => filteredApp);
    setFilters((prevData) => ({ ...prevData, filter: true }));
  };

  const paginate = (pageNumber) => {
    setCurrentPage((p) => pageNumber);
  };

  const handleDropdownChange = (option, name) => {
    setFilters((prevData) => ({
      ...prevData,
      [name]: option,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sortByPrice = (order) => {
    const sorted = [...applications].sort((a, b) => {
      const priceA = parseInt(a.cost.replace(/\$|,/g, ""));
      const priceB = parseInt(b.cost.replace(/\$|,/g, ""));
      return order === "asc" ? priceA - priceB : priceB - priceA;
    });
    setApplications((app) => sorted);
    if (isModalActive) {
      setIsModalActive((isActive) => false);
    }
  };

  const sortByDeadline = (order) => {
    const sorted = [...applications].sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
    setApplications((app) => sorted);
    if (isModalActive) {
      setIsModalActive((isActive) => false);
    }
  };

  return (
    <>
      <section className="container mx-auto py-14">
        <div className="flex mb-10 justify-between items-center">
          <h1 className="md:text-3xl text-2xl">Applications</h1>
          <div className="xl:flex hidden gap-4">
            <Button
              onClick={(e) => sortByPrice("asc")}
              className="flex gap-2 text-xs items-center justify-center bg-transparent border border-orange-600"
            >
              <BsSortNumericDown size={18} />
              Lowest Price
            </Button>
            <Button
              onClick={(e) => sortByPrice("desc")}
              className="flex gap-2 text-xs items-center justify-center bg-transparent border border-orange-600"
            >
              <BsSortNumericUp size={18} />
              Highest Price
            </Button>
            <Button
              onClick={(e) => sortByDeadline("asc")}
              className="flex gap-2 text-xs items-center justify-center bg-transparent border border-orange-600"
            >
              <BsSortDown size={18} />
              Deadline (Earliest)
            </Button>
            <Button
              onClick={(e) => sortByDeadline("desc")}
              className="flex gap-2 text-xs items-center justify-center bg-transparent border border-orange-600"
            >
              <BsSortDownAlt size={18} />
              Deadline (Latest)
            </Button>
          </div>
          <Button
            onClick={!filters.filter ? () => setIsModalActive((isActive) => !isActive) : clearFilter}
            className="flex gap-3"
          >
            {!filters.filter ? "Filter" : "Clear Filter"}
            {!filters.filter ? <FaFilter /> : <IoCloseSharp />}
          </Button>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
          {currentApplications.length > 0
            ? currentApplications.map((application, index) => (
                <ApplicationCard key={index} data={application} />
              ))
            : "No Applications Found"}
        </div>
        <div className="flex justify-center gap-8 mt-5">
          {Array.from(
            {
              length: Math.ceil(applications.length / applicationsPerPage),
            },
            (_, index) => (
              <Button
                className={`border !px-0 !py-0 flex items-center justify-center border-orange-600 bg-transparent w-8 h-8 text-xs !rounded-full ${
                  currentPage === index + 1
                    ? "scale-125 !bg-orange-600 font-semibold border-none"
                    : ""
                }`}
                key={index}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Button>
            )
          )}
        </div>
      </section>

      
      <Modal
        isActive={isModalActive}
        onClose={() => setIsModalActive((isActive) => false)}
        data={applications}
        title="Applications Filter"
      >
        <div className="xl:hidden grid grid-cols-2 gap-4 mb-8">
          <Button
            onClick={(e) => sortByPrice("asc")}
            className="flex gap-2 text-xs items-center justify-center bg-transparent border border-orange-600"
          >
            <BsSortNumericDown size={18} />
            Lowest Price
          </Button>
          <Button
            onClick={(e) => sortByPrice("desc")}
            className="flex gap-2 text-xs items-center justify-center bg-transparent border border-orange-600"
          >
            <BsSortNumericUp size={18} />
            Highest Price
          </Button>
          <Button
            onClick={(e) => sortByDeadline("asc")}
            className="flex gap-2 text-xs items-center justify-center bg-transparent border border-orange-600"
          >
            <BsSortDown size={18} />
            Deadline (Earliest)
          </Button>
          <Button
            onClick={(e) => sortByDeadline("desc")}
            className="flex gap-2 text-xs items-center justify-center bg-transparent border border-orange-600"
          >
            <BsSortDownAlt size={18} />
            Deadline (Latest)
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <Dropdown
            data={applications}
            name="university"
            label="Choose University"
            onSelect={handleDropdownChange}
            placeholder="choose university..."
          />
          <Dropdown
            data={applications}
            name="country"
            label="Choose Country"
            onSelect={handleDropdownChange}
            placeholder="choose country..."
          />
          <Dropdown
            data={applications}
            name="duration"
            label="Choose Duration"
            onSelect={handleDropdownChange}
            placeholder="choose duration..."
          />
          <Dropdown
            data={applications}
            name="language"
            label="Choose Language"
            onSelect={handleDropdownChange}
            placeholder="choose language..."
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              onChange={handleInputChange}
              type="number"
              name="minCost"
              label="min $"
            />
            <Input
              onChange={handleInputChange}
              type="number"
              name="maxCost"
              label="max $"
            />
          </div>
        </div>
        <Button onClick={handleFilter} className="ml-auto block mt-4">
          Filter
        </Button>
      </Modal>
    </>
  );
};

export default Home;

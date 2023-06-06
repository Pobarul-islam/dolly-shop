import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuentity] = useState("");
  const [shipping, setShipping] = useState("");

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title="Dashboard - Create-Product">
      <div className="grid lg:grid-cols-4 gap-40">
        {" "}
        <div>
          {" "}
          <AdminMenu />
        </div>
        <div className="m-3">
          <h2>Create Product</h2>
          <select
            className="select select-primary form-select mb-3 w-96 max-w-xs"
            showSearch
           
          >
            <option disabled selected>
              <p>Select a category...</p>
            </option>
            {categories?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <h3 className="text-3xl">cat is {categories.length} </h3>
        </div>
        <div className="m-3 p-2"></div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

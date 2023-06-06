import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
const { Option } = Select;

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
          <Select
            bordered={false}
            placeholder="Select a category"
            size="large"
            showSearch
            className="form-select m-3 w-96 border"
            onChange={(value) => {
              setCategory(value);
            }}
          >
            {categories?.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
          <h3 className="text-3xl">cat is {categories.length} </h3>
        </div>
        <div className="m-3 p-2"></div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

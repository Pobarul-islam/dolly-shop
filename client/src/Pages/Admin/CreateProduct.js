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
            placeholder="Search to Select"
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
          <div className="mb-3">
            <label className="btn btn-outline w-96 ">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          <div className="hero container max-w-screen-lg mx-auto pb-10">
            {photo && (
              <div className="text-center">
                <img
               
                  src={URL.createObjectURL(photo)}
                  style={{ height: "200px" }}
                  alt="product_photo"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

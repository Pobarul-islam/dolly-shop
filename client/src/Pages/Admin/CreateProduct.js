import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
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
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

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
          <div className=" container ">
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
          <div>
            {" "}
            <input
              type="text"
              value={name}
              placeholder="write a name"
              className="input input-bordered w-96 mt-2"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            {" "}
            <input
              type="text"
              value={description}
              placeholder="Description"
              className="textarea textarea-bordered textarea-lg w-96 mt-2"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            {" "}
            <input
              type="number"
              value={price}
              placeholder="Price"
              className="input input-bordered w-96 mt-2 mt-2"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            {" "}
            <input
              type="number"
              value={quantity}
              placeholder="Quantity"
              className="input input-bordered w-96 mt-2"
              onChange={(e) => setQuentity(e.target.value)}
            />
          </div>
          <div>
            {" "}
            <Select
              bordered={false}
              type="text"
              value={shipping}
              placeholder="Shipping"
              showSearch
              className="input input-bordered w-96 mt-2"
              onChange={(value) => {
                setShipping(value);
              }}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
          </div>
          <div>
            <button className="btn btn-outline" onClick={handleCreate}>
              {" "}
              Create Product
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

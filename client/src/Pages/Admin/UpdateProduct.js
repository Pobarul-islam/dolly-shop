import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);

      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

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

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product DEleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
          <h2>Update Product</h2>
          <Select
            bordered={false}
            placeholder="Search to Select"
            size="large"
            showSearch
            className="form-select m-3 w-96 border"
            onChange={(value) => {
              setCategory(value);
            }}
            value={category}
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
            {photo ? (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  style={{ height: "200px" }}
                  alt="product_photo"
                />
              </div>
            ) : (
              <div className="text-center">
                <img
                  src={`/api/v1/product/product-photo/${id}`}
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
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div>
            {" "}
            <Select
              bordered={false}
              type="text"
              placeholder="Shipping"
              showSearch
              className="input input-bordered w-96 mt-2"
              onChange={(value) => {
                setShipping(value);
              }}
              value={shipping ? "Yes" : "No"}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
          </div>

          <div>
            <button className="btn btn-outline" onClick={handleUpdate}>
              {" "}
              Update Product
            </button>
          </div>
          <div>
            <button className="btn btn-outline" onClick={handleDelete}>
              {" "}
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;

import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/Cart";
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useCart()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get products

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // getTotal count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get filtered product

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Best offer"}>
      <div className="row p-4 flex">
        <div className="col-1 mt-0 sticky">
          <h1 className="text-center w-80">Filter by category</h1>
          <div className="flex flex-col-reverse">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}{" "}
              </Checkbox>
            ))}
          </div>
          {/* Price filter  */}
          <h1 className="text-center w-80 mt-4">Filter by Price</h1>
          <div className="flex flex-col-reverse">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name} </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="flex flex-col-reverse">
            <button
              className="btn w-52 mt-3 btn-warning"
              onClick={() => window.location.reload()}
            >
              Reset filters
            </button>
          </div>
        </div>
        <div className="col-2 m-2">
          <h1 className="text-center text-2xl">All Products</h1>
         
          <div className="row grid lg:grid-cols-3 gap-5 md:grid-cols-2 sm:grid-cols-1">
            {products.map((p) => (
              <div
                className="card card-compact bg-base-100 shadow-xl"
                key={p._id}
              >
                <figure>
                  <img
                    className="w-96 h-72"
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                </figure>
                <div className="card-body ">
                  <h2 className="card-title">{p.name} </h2>
                  <p>{p.description.substring(0, 70)}... </p>
                  <p>$ {p.price} </p>
                  <div className="row flex gap-4">
                    <div className="card-actions justify-end">
                      <button
                        onClick={() => navigate(`/product/${p.slug}`)}
                        className="btn btn-primary uppercase"
                      >
                        More Details
                      </button>
                    </div>
                    <div className="card-actions justify-end">
                      <button onClick={() => {
                        setCart([...cart, p])
                        toast.success("Item added to cart")
                      }} className="btn btn-primary uppercase">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-success"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

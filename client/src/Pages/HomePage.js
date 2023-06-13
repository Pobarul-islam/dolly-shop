import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../Context/auth";
import axios from "axios";
import { Checkbox } from "antd";
const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);

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
  }, []);

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

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title={"Best offer"}>
      <div className="row p-4 flex">
        <div className="col-1 mt-0 sticky">
          <h1 className="text-center text-2xl w-80">Filter by category</h1>
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
        </div>
        <div className="col-2 m-2">
          <h1 className="text-center text-2xl">All Products</h1>
          {JSON.stringify(checked, null, 4)};
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
                  <p>{p.description} </p>
                  <div className="row flex gap-4">
                    {" "}
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary uppercase">
                        More Details
                      </button>
                    </div>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary uppercase">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          ;
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

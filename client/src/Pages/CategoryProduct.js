
import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryProduct = () => {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([])
    const navigate = useNavigate();
    const getProductsByCat = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error)
            
        }
    }


    useEffect(() => {
      if (params?.slug) getProductsByCat();
    }, [params?.slug]);
    return (
      <Layout className="hero min-h-screen">
        <div>Category product</div>
        <h1 className="text-center text-2xl">Category - {category?.name} </h1>
        <h1 className="text-center text-2xl">
          {" "}
          {products?.length} results found{" "}
        </h1>
        <div className="row">
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
                      <button className="btn btn-primary uppercase">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="m-2 p-3">
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
          </div> */}
        </div>
      </Layout>
    );
};

export default CategoryProduct;
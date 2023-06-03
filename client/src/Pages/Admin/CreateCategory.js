import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../Components/Form/CategoryForm";

const CreateCategory = () => {
  const [name, setName] = useState([]);

  // handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  const [categories, setCategories] = useState([]);

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

  return (
    <Layout title="Dashboard - Create-category">
      <div className="grid lg:grid-cols-2 gap-40">
        <div>
          <AdminMenu />
        </div>

        <div className="table">
          <h2>Manage Category</h2>
          <div className="p-3">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <table className=" w-96 gap-4">
            <thead>
              <tr>
                <th> Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((c) => (
                <>
                  <tr>
                    <td key={c._id}>{c.name} </td>

                    <td className="btn btn-outline">Edit</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;

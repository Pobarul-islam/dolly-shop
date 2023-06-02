import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";

const CreateCategory = () => {
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
      toast.error("Something wen wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title="Dashboard - Create-category">
      <div className="grid lg:grid-cols-4 gap-40">
        <div>
          <AdminMenu />
        </div>
        <div>
          <h2 className="text-2xl font-bold p-2">Manage Category</h2>
          <div className="p-3 m-3">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                
                  <th>Name</th>
                  <th>Category</th>
              
                </tr>
              </thead>
              <tbody className="border">
                <tr>
                  {categories.map((c) => (
                    <td key={c._id}>{c.name} </td>
                  
                  ))}
                  <td></td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;



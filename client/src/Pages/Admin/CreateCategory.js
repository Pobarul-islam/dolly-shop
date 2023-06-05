import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../Components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, SetSelected] = useState(null);
  const [updateName, setUpdatedName] = useState("");

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
      toast.error("Something went wrong");
    }
  };

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

  // update category
  const handleUpdated = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updateName }
      );
      if (data.success) {
        toast.success(`${updateName} is updated`);
        SetSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
      console.log(e);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  // Delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`Category is deleted`);
          getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
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
          <table className=" w-96 gap-4 ">
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

                    <div>
                      <label
                        htmlFor="my_modal_6"
                        className="btn btn-outline m-2"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(c.name);
                          SetSelected(c);
                        }}
                      >
                        Edit
                      </label>

                      <button
                        className="btn btn-outline m-2"
                        onClick={() => {
                          handleDelete(c._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <CategoryForm
              value={updateName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdated}
            />
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn">
                Close!
              </label>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;

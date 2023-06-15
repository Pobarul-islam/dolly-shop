import React from "react";
import { useSearch } from "../../Context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
    const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  const [values, setValues] = useSearch();
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered input-primary w-full max-w-xs"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword:e.target.value })}
              />
              
      </div>
    </form>
  );
};

export default SearchInput;

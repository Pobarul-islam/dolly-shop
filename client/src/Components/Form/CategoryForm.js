import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded px-8 pt-6 pb-8 mb-4"
      >
        <input
          type="text"
          className="input input-bordered input-primary w-full max-w-xs"
          placeholder="Enter New category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;

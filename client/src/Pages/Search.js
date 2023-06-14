import Layout from '../Components/Layout/Layout';
import { useSearch } from '../Context/search';

const Search = () => {
    const [values, setValues] = useSearch();
    return (
      <Layout>
        <div className="text-center">
          {" "}
          <h1 className="text-2xl font-bold">Search Results</h1>
          <h5>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found${values?.results.length}`}{" "}
          </h5>
          <div className="row grid lg:grid-cols-3 gap-5 md:grid-cols-2 sm:grid-cols-1">
            {values?.results.map((p) => (
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
        </div>
      </Layout>
    );
};

export default Search;
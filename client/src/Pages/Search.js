import Layout from '../Components/Layout/Layout';
import { useSearch } from '../Context/search';

const Search = () => {
    const [values, setValues] = useSearch();
    return (
        <Layout>
            <h1>Search Results</h1>
            <h5>{values?.results.length <1? 'No Products Found': `Found${values?.results.length}`} </h5>
        </Layout>
    );
};

export default Search;
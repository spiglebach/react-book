import './App.css';
import Discovery from "./components/Discovery";
import schema from "./config/schema";
import DataFlow from "./components/DataFlow";

const isDiscovery = window.location.pathname.replace(/\//g, '')

let data = JSON.parse(localStorage.getItem('data'))
if (!data) {
    data = [{}]
    Object.keys(schema).forEach((key) => (data[0][key] = schema[key]))
}

function App() {
    if (isDiscovery) return <Discovery/>
    return <DataFlow schema={schema} initialData={data} />
}

export default App;

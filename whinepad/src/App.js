import './App.css';
import Excel from "./components/Excel";
import Discovery from "./components/Discovery";
import Logo from "./components/Logo";
import Body from "./components/Body";

const isDiscovery = window.location.pathname.replace(/\//g, '')

let headers = localStorage.getItem('headers')
let data = localStorage.getItem('data')
if (!headers) {
    headers = ['Title', 'Year', 'Rating', 'Comments']
    data = [['Red whine', '2021', '3', 'meh']]
}

function App() {
    if (isDiscovery) return <Discovery/>
    return (
        <Body>
            <Logo />
            <Excel headers={headers} initialData={data}/>
        </Body>
    );
}

export default App;

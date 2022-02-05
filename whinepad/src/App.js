import './App.css';
import Excel from "./components/Excel";

function App() {
  return (
    <div>
      <Excel headers={['Name', 'Year']} initialData={[
          ['Charles', '1859'],
          ['Antoine', '1943']
      ]}/>
    </div>
  );
}

export default App;

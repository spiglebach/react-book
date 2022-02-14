import schema from "../config/schema";
import {useState} from "react";
import DataContext from "../modules/DataContext";
import Excel from "./Excel";

function ExcelExample() {
    const initialData = schema.name.samples.map((_, idx) => {
        const element = {}
        for (let key in schema) {
            element[key] = schema[key].samples[idx]
        }
        return element
    })
    const [data, setData] = useState(initialData)

    function updateData(newData) {
        setData(newData)
    }
    return (
        <DataContext.Provider value={{data, updateData}}>
            <Excel />
        </DataContext.Provider>
    )
}

export default ExcelExample
import Header from "./Header";
import Body from "./Body";
import Excel from "./Excel";
import {useReducer, useRef, useState} from "react";
import clone from "./../modules/clone"
import schema from "../config/schema";
import DataContext from "../modules/DataContext";

function commitToStorage(data) {
    localStorage.setItem('data', JSON.stringify(data))
}

let initialData = JSON.parse(localStorage.getItem('data'))
if (!initialData) {
    initialData = [{}]
    Object.keys(schema).forEach((key) => (initialData[0][key] = schema[key].samples[0]))
}

function DataFlow() {
    const [data, setData] = useState(initialData)
    const [filter, setFilter] = useState(null)

    function updateData(newData) {
        newData = clone(newData)
        commitToStorage(newData)
        setData(newData)
    }

    function onSearch(e) {
        setFilter(e.target.value)
    }

    return (
        <div className="DataFlow">
            <DataContext.Provider value={{data, updateData}}>
                <Header onSearch={onSearch}/>
                <Body>
                    <Excel filter={filter}/>
                </Body>
            </DataContext.Provider>
        </div>
    )
}

export default DataFlow
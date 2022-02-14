import Header from "./Header";
import Body from "./Body";
import Excel from "./Excel";
import Dialog from "./Dialog";
import Form from "./Form";
import {useReducer, useRef, useState} from "react";
import clone from "./../modules/clone"

function commitToStorage(data) {
    localStorage.setItem('data', JSON.stringify(data))
}

function reducer(data, action) {
    if (action.type === 'save') {
        data = clone(data)
        data.unshift(action.payload.formData)
        commitToStorage(data)
        return data
    }
    if (action.type === 'excelchange') {
        commitToStorage(action.payload.updatedData)
        return action.payload.updatedData
    }
}

function DataFlow({schema, initialData}) {
    const [data, dispatch] = useReducer(reducer, initialData)
    const [addNew, setAddNew] = useState(false)
    const [filter, setFilter] = useState(null)

    const form = useRef(null)

    function saveNew(action) {
        setAddNew(false)
        if (action === 'dismiss') return
        const formData = {}
        Array.from(form.current).forEach((input) => formData[input.id] = input.value)
        dispatch({
            type: 'save',
            payload: {formData}
        })
    }

    function onExcelDataChange(updatedData) {
        dispatch({
            type: 'excelchange',
            payload: {updatedData}
        })
    }

    function onSearch(e) {
        setFilter(e.target.value)
    }

    return (
        <div className="DataFlow">
            <Header
                onAdd={() => setAddNew(true)}
                onSearch={onSearch}
                count={data.length}
            />
            <Body>
                <Excel
                    schema={schema}
                    initialData={data}
                    key={data}
                    onDataChange={(updatedData) => onExcelDataChange(updatedData)}
                    filter={filter}
                />
                {addNew ? (
                    <Dialog
                        modal={true}
                        header="Add new item"
                        confirmLabel="Add"
                        onAction={(action) => saveNew(action)}>
                        <Form ref={form} fields={schema}/>
                    </Dialog>
                ) : null}
            </Body>
        </div>
    )
}

export default DataFlow
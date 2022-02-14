import Logo from "./Logo";
import FormInput from "./FormInput";
import Button from "./Button";
import "./Header.css"
import {useContext, useRef, useState} from "react";
import DataContext from "../modules/DataContext";
import Dialog from "./Dialog";
import Form from "./Form";
import schema from "../config/schema";


const Header = ({onSearch}) => {
    const {data, updateData} = useContext(DataContext)
    const [addNew, setAddNew] = useState(false)

    const form = useRef(null)

    const count = data.length
    const placeholder = count > 1 ? `Search ${count} items` : 'Search'

    function saveNew(action) {
        setAddNew(false)
        if (action === 'dismiss') return
        const formData = {}
        Array.from(form.current).forEach(input => formData[input.id] = input.value)
        data.unshift(formData)
        updateData(data)
    }

    function onAdd() {
        setAddNew(true)
    }

    return (
        <div>
            <div className="Header">
                <Logo/>
                <div className="push-right">
                    <FormInput placeholder={placeholder} id="search" onChange={onSearch}/>
                </div>
                <div>
                    <Button onClick={onAdd}>
                        <strong>&#65291;</strong> Add whine
                    </Button>
                </div>
            </div>
            {addNew ? (
                <Dialog
                    modal={true}
                    header="Add new item"
                    confirmLabel="Add"
                    onAction={(action) => saveNew(action)}>
                    <Form ref={form} fields={schema}/>
                </Dialog>
            ) : null}
        </div>
    )
}

export default Header
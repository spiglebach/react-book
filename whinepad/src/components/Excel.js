import React, {useReducer, useRef} from 'react'
import {useState} from 'react'
import clone from '../modules/clone'
import './Excel.css'
import classNames from "classnames";
import Actions from "./Actions";
import Rating from "./Rating";
import Dialog from "./Dialog";
import Form from "./Form";

function Excel({schema, initialData, onDataChange, filter}) {
    const [data, dispatch] = useReducer(reducer, initialData)
    const [sorting, setSorting] = useState({
        column: '',
        descending: false
    })
    const [edit, setEdit] = useState(null)
    const [dialog, setDialog] = useState(null)
    const form = useRef(null)

    function sort(e) {
        const column = e.target.dataset.id
        if (!column) { // the last 'Action' column is not sortable
            return
        }
        const descending = sorting.column === column && !sorting.descending
        setSorting({column, descending})
        dispatch({type: 'sort', payload: {column, descending}})
    }

    function showEditor(e) {
        const config = e.target.dataset.schema
        if (!config || config === 'rating') {
            return
        }
        setEdit({
            row: parseInt(e.target.parentNode.dataset.row, 10),
            column: config
        })
    }

    function save(e) {
        e.preventDefault()
        const value = e.target.firstChild.value
        const valueType = schema[e.target.parentNode.dataset.schema].type
        dispatch({
            type: 'save',
            payload: {
                edit, value, onDataChange,
                int: valueType === 'year' || valueType === 'rating'
            }
        })
        setEdit(null)
    }

    function handleAction(rowIdx, type) {
        if (type === 'delete') {
            setDialog(
                <Dialog
                    modal
                    header="Confirm deletion"
                    confirmLabel="Delete"
                    onAction={(action) => {
                        setDialog(null)
                        if (action === 'confirm') {
                            dispatch({
                                type: 'delete',
                                payload: {rowIdx, onDataChange}
                            })
                        }
                    }}>
                    {`Are you sure you want to delete "${data[rowIdx].name}"`}
                </Dialog>
            )
        }
        const isEdit = type === 'edit'
        if (type === 'info' || isEdit) {
            const formPrefill = data[rowIdx]
            setDialog(
                <Dialog
                    modal
                    extendedDismiss={!isEdit}
                    header={isEdit ? 'Edit item' : 'Item details'}
                    confirmLabel={isEdit ? 'Save' : 'ok'}
                    hasCancel={edit}
                    onAction={(action) => {
                        setDialog(null)
                        if (isEdit && action === 'confirm') {
                            dispatch({
                                type: 'saveForm',
                                payload: {
                                    rowIdx,
                                    onDataChange,
                                    form
                                }
                            })
                        }
                    }} >
                    <Form
                        ref={form}
                        fields={schema}
                        initialData={formPrefill}
                        readonly={!isEdit}/>
                </Dialog>
            )
        }
    }

    function reducer(data, action) {
        if (action.type === 'sort') {
            const {column, descending} = action.payload
            return data.sort((a, b) => {
                if (a[column] === b[column]) {
                    return 0
                }
                return descending ?
                    a[column] < b[column] ? 1 : -1 :
                    a[column] < b[column] ? -1 : 1
            })
        }
        if (action.type === 'save') {
            const {int, edit} = action.payload
            data[edit.row][edit.column] = int ? parseInt(action.payload.value, 10)
                : action.payload.value
        }
        if (action.type === 'delete') {
            data = clone(data)
            data.splice(action.payload.rowIdx, 1)
        }
        if (action.type === 'saveForm') {
            Array.from(action.payload.form.current).forEach(
                (input) => (data[action.payload.rowIdx][input.id] = input.value)
            )
        }

        setTimeout(() => action.payload.onDataChange(data))
        return data
    }

    return (
        <div className="Excel">
            <table>
                <thead onClick={sort}>
                <tr>
                    {Object.keys(schema).map((key) => {
                        let {label, show} = schema[key]
                        if (!show) return null
                        if (sorting.column === key) {
                            label += sorting.descending ? ' \u2191' : ' \u2193'
                        }
                        return (
                            <th key={key} data-id={key}>
                                {label}
                            </th>
                        )
                    })}
                    <th className="ExcelNotSortable">Actions</th>
                </tr>
                </thead>
                <tbody onDoubleClick={showEditor}>
                {data.map((row, rowIdx) => {
                    if (filter) {
                        const needle = filter.toLowerCase()
                        let match = false
                        const fields = Object.keys(schema)
                        for (let f = 0; !match && f < fields.length; f++) {
                            if (row[fields[f]].toString().toLowerCase().includes(needle)) {
                                match = true
                            }
                        }
                        if (!match) {
                            return null
                        }
                    }

                    return (
                        <tr key={rowIdx} data-row={rowIdx}>
                            {Object.keys(row).map((cell, columnIdx) => {
                                const config = schema[cell]
                                if (!config.show) return null
                                let content = row[cell]

                                if (edit && edit.row === rowIdx && edit.column === cell) {
                                    content = (
                                        <form onSubmit={save}>
                                            <input type="text" defaultValue={content} />
                                        </form>
                                    )
                                } else if (config.type === 'rating') {
                                    content = (
                                        <Rating
                                            id={cell}
                                            readonly
                                            key={content}
                                            defaultValue={Number(content)}/>
                                    )
                                }

                                return (
                                    <td
                                        key={columnIdx}
                                        data-schema={cell}
                                        className={classNames({
                                            [`schema-${cell}`]: true,
                                            ExcelEditable: config.type !== 'rating',
                                            ExcelDataLeft: config.align === 'left',
                                            ExcelDataRight: config.align === 'right',
                                            ExcelDataCenter: config.align !== 'left' && config.align !== 'right'
                                        })}>
                                        {content}
                                    </td>
                                )
                            })}
                            <td>
                                <Actions onAction={handleAction.bind(null, rowIdx)} />
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            {dialog}
        </div>
    )
}

export default Excel
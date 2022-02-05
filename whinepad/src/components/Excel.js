import React from 'react'
import {useState} from 'react'
import clone from '../modules/clone'
import './Excel.css'

function Excel({headers, initialData}) {
    const [data, setData] = useState(clone(initialData).map((row, idx) => row.concat(idx)))
    const [sorting, setSorting] = useState({
        column: null,
        descending: false
    })
    const [edit, setEdit] = useState(null)
    const [isSearching, setSearch] = useState(false)
    const [preSearchData, setPreSearchData] = useState(null)
    const [needles, setNeedles] = useState(headers.map(() => ''))

    function toggleSearch() {
        setNeedles(needles.map(() => ''))
        const newSearch = !isSearching
        if (newSearch) {
            setPreSearchData(data)
        } else {
            setData(preSearchData)
        }
        setSearch(newSearch)
    }

    function search(e) {
        const idx = e.target.dataset.idx
        needles[idx] = e.target.value.toLowerCase()
        const searchData = preSearchData.filter((row) => {
            return row.every((element, index) => {
                if (!needles[index]) return true
                return element.toString().toLowerCase().indexOf(needles[index]) > -1
            })
        })
        setData(searchData)
    }

    function sort(e) {
        const column = e.target.cellIndex
        const descending = sorting.column === column && !sorting.descending
        const dataCopy = clone(data)
        dataCopy.sort((a, b) => {
            if (a[column] === b[column]) return 0
            const sortValue = a[column] < b[column] ? 1 : -1
            const sortDirectionMultiplier = descending ? 1 : -1
            return sortValue * sortDirectionMultiplier
        })
        setData(dataCopy)
        setSorting({column, descending})
    }

    function showEditor(e) {
        const row = parseInt(e.target.parentNode.dataset.row, 10)
        const column = e.target.cellIndex
        setEdit({
            row,
            column
        })
    }

    function save(e) {
        e.preventDefault()
        const input = e.target.firstChild
        const dataCopy = clone(data).map(row => {
            if (row[row.length - 1] === edit.row) row[edit.column] = input.value
            return row
        })
        setEdit(null)
        setData(dataCopy)
        let newPreSearchData = clone(preSearchData)
        newPreSearchData[edit.row][edit.column] = input.value
        setPreSearchData(newPreSearchData)
    }

    const searchRow = !isSearching ? null : (
        <tr onChange={search}>
            {headers.map((_, idx) => (
                <td key={idx}>
                    <input type="text" data-idx={idx}/>
                </td>
            ))}
        </tr>
    )
    return (
        <div className="Excel">
            <div className="toolbar" onClick={toggleSearch}>
                <button>{isSearching ? 'Hide search' : 'Show search'}</button>
            </div>
            <table>
                <thead onClick={sort}>
                <tr>
                    {headers.map((title, idx) => {
                        if (sorting.column === idx) title += sorting.descending ? ' \u2191' : ' \u2193'
                        return <th key={idx}>{title}</th>
                    })}
                </tr>
                </thead>
                <tbody onDoubleClick={showEditor}>
                {searchRow}
                {data.map((row, rowidx) => {
                    const recordId = row[row.length - 1]
                    return (
                        <tr key={rowidx} data-row={recordId}>
                            {row.map((cell, columnidx) => {
                                if (columnidx === headers.length) return
                                if (edit && edit.row === rowidx && edit.column === columnidx) {
                                    cell = (
                                        <form onSubmit={save}>
                                            <input type="text" defaultValue={cell}/>
                                        </form>
                                    )
                                }
                                return <td key={columnidx}>{cell}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Excel
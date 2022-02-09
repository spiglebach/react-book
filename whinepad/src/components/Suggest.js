
const Suggest = ({id, defaultValue = '', options=[]}) => {
    const randomId = Math.random().toString(16).substring(2)
    return (
        <>
            <input
                id={id}
                list={randomId}
                defaultValue={defaultValue}
                type=""/>
            <datalist id={randomId}>
                {options.map((item, index) => {
                    return <option value={item} key={index}/>
                })}
            </datalist>
        </>
    )
}

export default Suggest
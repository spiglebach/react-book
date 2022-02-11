import {forwardRef} from "react";
import Rating from "./Rating";
import FormInput from "./FormInput";

const Form = forwardRef(({fields, initialData = {}, readonly = false}, ref) => {
    return (
        <form className="Form" ref={ref}>
            {Object.keys(fields).map((id) => {
                const prefilled = initialData[id]
                const {label, type, options} = fields[id]
                if (readonly) {
                    if (!prefilled) return null
                    return (
                        <div className="FormRow" key={id}>
                            <span className="FormLabel">{label}</span>
                            {type === 'rating' ? (
                                <Rating readonly={true} defaultValue={parseInt(prefilled, 10)}/>
                            ) : (
                                <div>{prefilled}</div>
                            )}
                        </div>
                    )
                }
                return (
                    <div key={id} className="FormRow">
                        <label htmlFor={id} className="FormLabel">{label}</label>
                        <FormInput id={id} type={type} options={options} defaultValue={prefilled} />
                    </div>
                )
            })}
        </form>
    )
})

export default Form
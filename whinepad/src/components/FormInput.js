import Suggest from "./Suggest";
import Rating from "./Rating";


const FormInput = ({type = 'input', defaultValue = '', options = [], ...rest}) => {
    switch (type) {
        case 'year':
            return (
                <input
                    {...rest}
                    type="number"
                    defaultValue={
                        (defaultValue && parseInt(defaultValue, 10)) ||
                        new Date().getFullYear()
                    }
                />
            )
        case 'suggest':
            return (
                <Suggest defaultValue={defaultValue} options={options} {...rest} />
            )
        case 'rating':
            return (
                <Rating
                    {...rest}
                    defaultValue={defaultValue ? parseInt(defaultValue, 10) : 0}
                    />
            )
        case 'textarea':
            return <textarea defaultValue={defaultValue} {...rest} />
        default:
            return <input defaultValue={defaultValue} type="text" {...rest}/>
    }
}

export default FormInput
import Logo from "./Logo";
import FormInput from "./FormInput";
import Button from "./Button";
import "./Header.css"


const Header = ({onSearch, onAdd, count = 0}) => {
    const placeholder = count > 1 ? `Search ${count} items` : 'Search'
    return (
        <div className="Header">
            <Logo />
            <div className="push-right">
                <FormInput placeholder={placeholder} id="search" onChange={onSearch} />
            </div>
            <div>
                <Button onClick={onAdd}>
                    <strong>&#65291;</strong> Add whine
                </Button>
            </div>
        </div>
    )
}

export default Header
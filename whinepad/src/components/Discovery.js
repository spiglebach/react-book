import Excel from "./Excel";
import Logo from "./Logo";
import Body from "./Body";
import Button from "./Button";


const Discovery = () => {
    return (
        <div>
            <h2>Excel</h2>
            <Excel
                headers={['Name', 'Year']}
                initialData={[
                    ['Charles', '1859'],
                    ['Antoine', '1943']
                ]}
                />
            <h2>Logo</h2>
            <Logo />
            <h2>Body</h2>
            <Body>I am content inside the body</Body>
            <h2>Buttons</h2>
            <p>
                Button with onClick:{' '}
                <Button onClick={() => alert('ouch')}>Click me</Button>
            </p>
            <p>
                A link: <Button href="https://reactjs.org/">Follow me</Button>
            </p>
            <p>
                Custom class name: {' '}
                <Button className="Discovery-custom-button">I do nothing</Button>
            </p>
        </div>
    )
}

export default Discovery
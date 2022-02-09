import Excel from "./Excel";
import Logo from "./Logo";
import Body from "./Body";
import Button from "./Button";
import Suggest from "./Suggest";
import Rating from "./Rating";


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
            <h2>Suggest</h2>
            <p>
                <Suggest options={['eenie', 'meenie', 'miney', 'mo']} />
            </p>
            <h2>Rating</h2>
            <p>
                No initial value: <Rating />
            </p>
            <p>
                Initial value 4: <Rating defaultValue={4} />
            </p>
            <p>
                This one goes to 11: <Rating max={11} />
            </p>
            <p>
                Read-only: <Rating readonly={true} defaultValue={3} />
            </p>
        </div>
    )
}

export default Discovery
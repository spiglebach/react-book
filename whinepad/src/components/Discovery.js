import Excel from "./Excel";
import Logo from "./Logo";
import Body from "./Body";
import Button from "./Button";
import Suggest from "./Suggest";
import Rating from "./Rating";
import FormInput from "./FormInput";
import {useRef, useState} from "react";
import Form from "./Form";
import Actions from "./Actions";
import Dialog from "./Dialog";
import Header from "./Header";
import schema from "../config/schema";
import ExcelExample from "./ExcelExample";
import DataContext from "../modules/DataContext";


const Discovery = () => {
    const form = useRef()

    function DialogExample() {
        const [example, setExample] = useState(null)
        return (
            <>
                <p>
                    <Button onClick={() => setExample(1)}>Example 1</Button>
                    <Button onClick={() => setExample(2)}>Example 2</Button>
                </p>
                {example === 1 ? (
                    <Dialog
                        modal
                        header="Out of the box example"
                        onAction={(type) => {
                        alert(type)
                        setExample(null)
                    }}
                    >Hello, dialog!</Dialog>
                ) : null}

                {example === 2 ? (
                    <Dialog
                        header="Not modal, custom dismiss button"
                        hasCancel={false}
                        confirmLabel="Whatever"
                        onAction={(type) => {
                        alert(type)
                        setExample(null)
                    }}
                    >Anything goes here, like a <Button>button</Button></Dialog>
                ) : null}
            </>
        )
    }

    return (
        <div>
            <h2>Excel</h2>
            <ExcelExample/>
            <h2>Header</h2>
            <DataContext.Provider value={{data: [1, 2, 3], updateData: () => {}}}>
                <Header onSearch={(e) => console.log(e)}/>
            </DataContext.Provider>
            <h2>Logo</h2>
            <Logo/>
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
                <Suggest options={['eenie', 'meenie', 'miney', 'mo']}/>
            </p>
            <h2>Rating</h2>
            <p>
                No initial value: <Rating/>
            </p>
            <p>
                Initial value 4: <Rating defaultValue={4}/>
            </p>
            <p>
                This one goes to 11: <Rating max={11}/>
            </p>
            <p>
                Read-only: <Rating readonly={true} defaultValue={3}/>
            </p>
            <h2>Form inputs</h2>
            <table className="Discovery-pad">
                <tbody>
                <tr>
                    <td>Vanilla input</td>
                    <td><FormInput/></td>
                </tr>
                <tr>
                    <td>Prefilled</td>
                    <td><FormInput defaultValue="with a default"/></td>
                </tr>
                <tr>
                    <td>Year</td>
                    <td><FormInput type="year"/></td>
                </tr>
                <tr>
                    <td>Rating</td>
                    <td><FormInput type="rating" defaultValue={4}/></td>
                </tr>
                <tr>
                    <td>Suggest</td>
                    <td>
                        <FormInput
                            type="suggest"
                            options={['red', 'green', 'blue']}
                            defaultValue="green"/>
                    </td>
                </tr>
                <tr>
                    <td>Vanilla textarea</td>
                    <td><FormInput type="textarea"/></td>
                </tr>
                </tbody>
            </table>
            <Form
                ref={form}
                fields={{
                    rateme: {label: 'Rating', type: 'rating'},
                    freetext: {label: 'Greetings'}
                }}
                initialData={{rateme: 4, freetext: 'Hello'}}
            />
            <Button
                onClick={() => {
                    const data = {}
                    Array.from(form.current).forEach(
                        (input) => (data[input.id] = input.value)
                    )
                    alert(JSON.stringify(data))
                }}>Submit</Button>
            <br/>
            <Actions onAction={(type) => alert(type)}/>
            {DialogExample()}
        </div>
    )
}

export default Discovery
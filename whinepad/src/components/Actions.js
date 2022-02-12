import Button from "./Button";

import editImage from "./../images/edit.png"
import deleteImage from "./../images/delete.png"

const Actions = ({onAction = () => {}}) => {
    return (
        <span className="Actions">
            <Button className="ActionsInfo"
                    title="More info"
                    onClick={() => onAction('info')}>
                View Details
            </Button>
            <Button
                    title="Edit"
                    onClick={() => onAction('edit')}>
                <img width={20} src={editImage} alt="Edit"/>
            </Button>
            <Button
                tabIndex="0"
                    title="Delete"
                    onClick={onAction.bind(null, 'delete')}>
                <img width={20} src={deleteImage} alt="Delete"/>
            </Button>

        </span>
    )
}

export default Actions
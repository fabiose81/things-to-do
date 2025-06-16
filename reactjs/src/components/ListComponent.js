import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Constants } from '../utils/Constants'
import '../dist/style.css'

const ListComponent = (props) => {

    const suggestions = props.suggestions;
    const suggestionsSelected = props.suggestionsSelected;
    const actionLabel = props.actionLabel;
    const actionSuggestion = props.actionSuggestion;

    const [disableButton, setDisableButton] = useState({
        disableButton: props.disableButton,
        setDisableButton: props.setDisableButton
    });

    const addOrRemoveToList = (event) => {
        if (event.target.checked) {
            const objectFound = suggestions.find(obj => (actionLabel === Constants.DELETE ? obj._id : obj.name) === event.target.id);
            suggestionsSelected.push(objectFound)
        } else {
            const index = suggestionsSelected.findIndex(obj => (actionLabel === Constants.DELETE ? obj._id : obj.name) === event.target.id);
            if (index !== -1) {
                suggestionsSelected.splice(index, 1);
            }
        }

        setDisableButton(suggestionsSelected.length > 0 ? false : true);
    }

    return (
        <ListGroup as="ol">
            <ListGroup.Item>
                <Button style={{ width: "200px" }} variant="success" disabled={disableButton} onClick={actionSuggestion}>{actionLabel}</Button>
            </ListGroup.Item>
            {
                suggestions.map((item, index) => (
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start list-group-item" key={index}>
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.name}</div>
                            {item.description}
                        </div>
                        <div>
                            <Form.Check
                                reverse
                                name="group1"
                                type="checkbox"
                                id={actionLabel === Constants.DELETE ? item._id : item.name}
                                onChange={addOrRemoveToList} />
                        </div>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
}

export default ListComponent;
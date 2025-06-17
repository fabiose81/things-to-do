import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { Constants } from '../utils/Constants'
import '../dist/style.css'

const ListComponent = (props) => {

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const suggestions = props.suggestions;
    const suggestionsSelected = props.suggestionsSelected;
    const actionLabel = props.actionLabel;
    const actionSuggestion = props.actionSuggestion;
    const openModalScheduleSuggestion = props.openModalScheduleSuggestion;

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

    const formatDateISO = (date) => {
        const isoString = date.toISOString();
        return isoString.split("T")[0];
    };

    const checkDate = (date) => {
        date.setHours(0, 0, 0, 0);
        var colour;
        if (date.getTime() > currentDate.getTime()) {
           colour = 'green';
        } else if (date.getTime() < currentDate.getTime()) {
            colour = 'red';
        } else {
            colour = 'orange';
        }

        return colour;
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
                        <div className="grid-date-checkbox">
                            {
                                actionLabel === Constants.DELETE &&
                                <div>
                                    <div className="box1">
                                        <Button onClick={() => openModalScheduleSuggestion(index)} className="button-calendar">
                                            <Image src="calendar.png" style={{ width: "30px", height: "30px" }} ></Image>
                                        </Button>
                                    </div>

                                    <div className="box1 box2">
                                        <span style={{ color: checkDate(new Date(item.date)) }}>{item.date ? formatDateISO(new Date(item.date)) : Constants.NO_DATE_SET}</span>
                                    </div>
                                </div>
                            }
                            <div className="box1">
                                <Form.Check
                                    reverse
                                    name="group1"
                                    type="checkbox"
                                    id={actionLabel === Constants.DELETE ? item._id : item.name}
                                    onChange={addOrRemoveToList} />
                            </div>
                        </div>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
}

export default ListComponent;
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Request } from '../services/Request'
import { Constants } from '../utils/Constants'
import { uncheckCheckboxes, changeAlertState } from '../utils/UIUtils'
import { BodyRequest } from './graphql/BodyRequest'
import ModalComponent from '../components/ModalComponent'
import ListComponent from '../components/ListComponent'
import '../dist/style.css'

const Prompt = () => {

    const [age, setAge] = useState(20);

    const [showModal, setShowModal] = useState(false);
    const [disableButton, setDisableButton] = useState(true);

    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsSelected, setSuggestionsSelected] = useState([]);

    const [alert, setAlert] = useState({
        label: Constants.ALERT_MESSAGE,
        variant: '',
        hidden: true
    });

    const generate = () => {
        setSuggestions([]);
        setSuggestionsSelected([]);
        setShowModal(true);
        Request('generate/'.concat(age), Constants.GET)
            .then(result => {
                setSuggestions(result.bucketList);
                setShowModal(false);
            }).catch((error) => {
                setAlert(() => changeAlertState(error, Constants.ALERT_DANGER, false));
                setShowModal(false);
            });
    }

    const refreshSuggestionList = () => {
        const newSuugestioList = [];
        for (const suggestion of suggestions) {
            if (!suggestionsSelected.includes(suggestion)) {
                newSuugestioList.push(suggestion)
            }
        }
        setSuggestions(newSuugestioList);
        setSuggestionsSelected([]);

        uncheckCheckboxes();
    }

    const actionSuggestion = () => {
        refreshSuggestionList()
        setShowModal(true);

        const body = BodyRequest(suggestionsSelected, Constants.INSERT);

        Request(Constants.ENDPOINT_GRAPHQL, Constants.POST, body)
            .then(() => {
                refreshSuggestionList();
                setShowModal(false);
                setDisableButton(true);
                setAlert(() => changeAlertState(Constants.MESSAGE_SUGGESTION_INSERTED, Constants.ALERT_SUCCESS, false));
            }).catch((error) => {
                setAlert(() => changeAlertState(error, Constants.ALERT_DANGER, false));
            });
    }

    return (
        <div>
            <div className="prompt-control">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Your age: {age} years old</Form.Label>
                        <Form.Range
                            min={20}
                            max={100}
                            step={1}
                            defaultValue={20}
                            onChange={e => setAge(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                <Button variant="success" onClick={generate}>{Constants.BUTTON_GENERATE}</Button>

                <ModalComponent showModal={showModal} />
            </div>

            {
                suggestions.length > 0 ?
                    <div>
                        <Alert variant={alert.variant} hidden={alert.hidden}>
                            {alert.label}
                        </Alert>
                        <ListComponent suggestions={suggestions}
                            suggestionsSelected={suggestionsSelected}
                            disableButton={disableButton}
                            setDisableButton={setDisableButton}
                            actionSuggestion={actionSuggestion}
                            actionLabel={Constants.INSERT} />
                    </div> : <div>
                        <Alert variant={Constants.ALERT_INFO}>
                            {Constants.MESSAGE_NO_SUGGESTION_AVAILABLE}
                        </Alert></div>
            }
        </div>
    )
}

export default Prompt
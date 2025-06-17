import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import ModalComponent from '../components/ModalComponent'
import ListComponent from '../components/ListComponent'
import { Request } from '../services/Request'
import { Constants } from '../utils/Constants'
import { uncheckCheckboxes, changeAlertState } from '../utils/UIUtils'
import { BodyRequest } from './graphql/BodyRequest'

const Suggestion = () => {

    const [showModal, setShowModal] = useState(false);
    const [modeSchedule, setModeSchedule] = useState(false);
    const [disableButton, setDisableButton] = useState(true);

    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsSelected, setSuggestionsSelected] = useState([]);
    const [suggestionSelected, setSuggestionSelected] = useState(null);

    const [date, setDate] = useState(null);

    const [alert, setAlert] = useState({
        label: Constants.ALERT_MESSAGE,
        variant: '',
        hidden: true
    });

    const loadSuggestions = () => {
        const body = BodyRequest(null, Constants.LIST);

        Request(Constants.ENDPOINT_GRAPHQL, Constants.POST, body)
            .then(result => {
                setShowModal(false);
                setSuggestions(result.data.suggestions);
            }).catch((error) => {
                setShowModal(false);
                setAlert(() => changeAlertState(error, Constants.ALERT_DANGER, false));
            });
    };

    useEffect(() => {
        setShowModal(true);
        loadSuggestions();
    }, []);

    const actionSuggestion = () => {
        setShowModal(true);

        const body = BodyRequest(suggestionsSelected, Constants.DELETE);

        Request(Constants.ENDPOINT_GRAPHQL, Constants.POST, body)
            .then(() => {
                setSuggestionsSelected([]);
                loadSuggestions();
                setAlert(() => changeAlertState(Constants.MESSAGE_SUGGESTION_DELETED, Constants.ALERT_SUCCESS, false));
                uncheckCheckboxes();
            }).catch((error) => {
                setShowModal(false);
                setAlert(() => changeAlertState(error, Constants.ALERT_DANGER, false));
            });
    }

    const openModalScheduleSuggestion = (index) => {
        setSuggestionSelected(suggestions[index]);
        setModeSchedule(true)
        setShowModal(true);
    };

    const actionScheduleSuggestion = () => {
        suggestionSelected['date'] = date;

        const body = BodyRequest(suggestionSelected, Constants.SCHEDULE);

        Request(Constants.ENDPOINT_GRAPHQL, Constants.POST, body)
            .then(() => {
                closeModal();
            }).catch((error) => {
                setAlert(() => changeAlertState(error, Constants.ALERT_DANGER, false));
                closeModal();
            });
    };

    const closeModal = () => {
        setDate(null);
        setModeSchedule(false)
        setShowModal(false);
    };

    return (
        <div>
            <ModalComponent showModal={showModal}
                modeSchedule={modeSchedule}
                actionScheduleSuggestion={actionScheduleSuggestion}
                closeModal={closeModal}
                date={date}
                setDate={setDate} />
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
                            actionLabel={Constants.DELETE}
                            openModalScheduleSuggestion={openModalScheduleSuggestion} />
                    </div> : <div>
                        <Alert variant={Constants.ALERT_INFO}>
                            {Constants.MESSAGE_NO_SUGGESTION_RECORDED}
                        </Alert></div>
            }
        </div>
    )
}

export default Suggestion
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


const ModalComponent = (props) => {
    const showModal = props.showModal;
    const modeSchedule = props.modeSchedule;
    const actionScheduleSuggestion = props.actionScheduleSuggestion;
    const closeModal = props.closeModal;
    const date = props.date;
    const setDate = props.setDate;
    const modalHeight = modeSchedule ? "450px" : "205px";

    return (
        <Modal show={showModal} centered>
            <Modal.Body style={{ height: modalHeight }}>
                {
                    modeSchedule ?
                        <div >
                            <Button className="button-calendar" onClick={closeModal}>
                                <Image src="close.png" style={{ width: "30px", height: "30px" }} ></Image>
                            </Button>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar minDate={dayjs(Date.now())} onChange={(value) => {
                                        const year = value["$y"];
                                        const month = value["$M"] + 1;
                                        const day = value["$D"];
                                        const stringDate = year + "-" + month + "-" + day;
                                        setDate(new Date(stringDate));
                                }} />
                            </LocalizationProvider>
                            <Button style={{ width: "200px" }} variant="success" disabled={date === null} onClick={actionScheduleSuggestion}>Save</Button>
                        </div>
                        :
                        <div className="loader-container">
                            <div className="fading-bars">
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                            </div>
                        </div>
                }
            </Modal.Body>
        </Modal>
    )
}

export default ModalComponent;
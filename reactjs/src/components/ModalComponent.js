import Modal from 'react-bootstrap/Modal';

const ModalComponent = (props) => {
    const showModal = props.showModal;

    return (
        <Modal show={showModal} centered>
            <Modal.Body style={{ height: "205px" }}>
                <div className="loader-container">
                    <div className="fading-bars">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalComponent;
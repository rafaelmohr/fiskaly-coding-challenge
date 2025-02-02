import React, {useEffect, useState} from 'react';
import Modal from "../modal/modal";
import "./AddCustomerButton.css";
import {validateMail, validateName} from "../../helper/Validators";
import config from "../../config";
import axios from 'axios';

export default function AddCustomerButton({fetchCustomers}) {

    const [modalOpen, setModalOpen] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mail, setMail] = useState("");
    const [firstNameValid, setFirstNameValid] = useState(false);
    const [lastNameValid, setLastNameValid] = useState(false);
    const [mailValid, setMailValid] = useState(false);

    useEffect(() => {
        setFirstNameValid(validateName(firstName));
    }, [firstName]);
    useEffect(() => {
        setLastNameValid(validateName(lastName));
    }, [lastName])
    useEffect(() => {
        setMailValid(validateMail(mail));
    }, [mail])

    function submitForm(event) {
        event.preventDefault();

        const url = `${config.BACKEND_URL}:${config.BACKEND_PORT}/customer`;
        axios.post(url, {
            firstName: firstName,
            lastName: lastName,
            mail: mail,
        }).catch(error => console.error(error))
            .finally(() => {
                setModalOpen(false);
                fetchCustomers();
            });
    }

    return (
        <>
            <button onClick={() => setModalOpen(true)}>Add Customer</button>

            {modalOpen && (
                <Modal onClose={() => setModalOpen(false)}>
                    <form className="customer-form" onSubmit={submitForm}>

                        <div className="input-wrapper">
                            <h4>Firstname</h4>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                            {!firstNameValid &&
                                <span className="error-display">Invalid Firstname</span>
                            }
                        </div>
                        <div className="input-wrapper">
                            <h4>Lastname</h4>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                            {!lastNameValid &&
                                <span className="error-display">Invalid Lastname</span>
                            }
                        </div>
                        <div className="input-wrapper">
                            <h4>Mail</h4>
                            <input type="text" value={mail} onChange={(e) => setMail(e.target.value)}/>
                            {!mailValid &&
                                <span className="error-display">Invalid E-Mail address</span>
                            }
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </Modal>
            )}
        </>
    )
}

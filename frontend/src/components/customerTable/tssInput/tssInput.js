import React, {useEffect, useState} from 'react';
import config from "../../../config";
import axios from 'axios';

export default function TssInput({customerId, fetchCustomers}) {

    const [value, setValue] = useState('');
    const [validInput, setValidInput] = useState(false);

    useEffect(() => {
        // check if input is valid UUID
        // only UUIDs will be accepted by the DB later, since that is the specified datatype there
        setValidInput(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value));

    }, [value]);

    function formSubmit(e) {
        e.preventDefault();

        const requestData = {
            'customerId': customerId,
            'tssId': value
        };

        const url = `${config.BACKEND_URL}:${config.BACKEND_PORT}/addTss`;

        axios.post(url, requestData)
            .catch(error => {
                console.log(error)
            })
            .finally((res) => {
                // NOTE: there definetely is some error handling missing here, and also generally

                // call fetchCustomers of parent table
                fetchCustomers();
            });
    }

    return (
        <form onSubmit={e => formSubmit(e)}>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
            <button disabled={!validInput} type="submit">add TSS</button>
        </form>
    );
}

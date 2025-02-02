import React, {useEffect, useState} from 'react';
import config from '../../config';
import axios from 'axios';
import Modal from "../modal/modal";
import TssInput from "./tssInput/tssInput";
import './customerTable.css';

/*NOTES:
* wasn't sure if this was supposed to be client-side or server-side filtering
* I implemented some very basic client side filtering, since I'm displaying all rows from the database anyway
* I would usually search for a nice table library with built-in filtering function
* would look better and also work better probably
* but the purpose of this is probably not to show that I can use a library, so I did it from scratch
*/

export default function CustomerTable(props) {

    const [customers, setCustomers] = useState(null);
    const [filter, setFilter] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [filteredCustomers, setFilteredCustomers] = useState(null);
    const [uniqueLastNames, setUniqueLastNames] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchCustomers(customer_id) {
        setLoading(true);
        const url = `${config.BACKEND_URL}:${config.BACKEND_PORT}/customers`;
        axios.get(url)
            .then((res) => {
                setCustomers(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    // load customers once on component mount
    useEffect(() => {
        fetchCustomers();
    }, []);

    // set unique last names every time customers changes
    useEffect(() => {
        if (customers) {
            const uniqueLastNames = new Set(customers.map(customer => customer.last_name));
            setUniqueLastNames(Array.from(uniqueLastNames));
        }
    }, [customers])

    // filter customers on change of filter state variable
    useEffect(() => {
        if (customers) {
            setFilteredCustomers(customers.filter(
                customer => customer.last_name.toLowerCase() === filter.toLowerCase()
                    || filter === '' || filter === null
            ));
        }
    }, [customers, filter])


    if (loading) return <p className="text-gray-500">Loading customers...</p>;

    return (
        <div>
            <h2>Customer List</h2>
            {filter && (
                <h5>Filtering by last name: {filter} <button onClick={() => setFilter('')}>Remove filter</button></h5>
            )}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Firstname</th>
                    <th className="lastname_header">Lastname <button onClick={() => setShowFilter(true)}>Filter</button>
                    </th>
                    <th>E-Mail</th>
                    <th>tss ids</th>
                </tr>
                </thead>
                <tbody>
                {filteredCustomers.map((customer) => (
                    <tr key={customer.customer_id}>
                        <td>{customer.customer_id}</td>
                        <td>{customer.first_name}</td>
                        <td>{customer.last_name}</td>
                        <td>{customer.mail}</td>
                        <td className="tss-ids">
                            <ul>
                                {customer.tss_ids.map((tssId, index) => (
                                    <li key={index}>{tssId}</li>
                                ))}
                                <li key="input">
                                    <TssInput customerId={customer.customer_id} fetchCustomers={fetchCustomers} />
                                </li>
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showFilter && (
                <Modal onClose={() => setShowFilter(false)}>
                    <h1>Filter by Last Name</h1>
                    <ul>
                        <li key="no_filter">
                            <button onClick={() => {
                                setFilter('');
                                setShowFilter(false);
                            }}>No filter
                            </button>
                        </li>
                        {uniqueLastNames.map((name) => (
                            <li key={name}>
                                <button onClick={() => {
                                    setFilter(name);
                                    setShowFilter(false);
                                }}>{name}</button>
                            </li>
                        ))}
                    </ul>

                </Modal>
            )}
        </div>
    );
}

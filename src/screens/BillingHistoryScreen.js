import React from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function BillingHistoryScreen(props) {
    const billingMineList = useSelector((state) => state.billingMineList);
    const { loading, error, orders } = billingMineList;

    return (
        <div>
            <h1>My Bill History</h1>
            
            {loading ? <LoadingBox></LoadingBox> :
                error ? <MessageBox></MessageBox> :
                    (
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td colSpan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </Table>
                    )}
        </div>
    );
}

export default BillingHistoryScreen;
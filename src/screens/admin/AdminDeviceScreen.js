import React, { useEffect } from 'react';
import { Button, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listDevices } from '../../actions/deviceActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

export default function AdminDeviceScreen(props) {
  const dispatch = useDispatch();
  const deviceList = useSelector((state) => state.deviceList);
  const { loading, error, devices } = deviceList;

  useEffect(() => {
    dispatch(listDevices());
  }, [dispatch]);

  const deleteHandler = () => {
    //Todo Delete Dispatch
  };

  return (
    <div>
      <Container>
        <Row>
          
          {
            loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox>{error}</MessageBox>
            ) : (

              <Table striped bordered hover responsive>
                <thead>
                  <th>Device ID</th>
                  <th>Category</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>State</th>
                  <th>Actions</th>
                </thead>
                <tbody>
                  {devices.map((device) => (
                    <tr key={device.id}>
                      <td>{device.deviceId}</td>
                      <td>{device.deviceCategory}</td>
                      <td>{device.deviceAddress1 + ', ' + 
                           device.deviceAddress2 + ', ' +
                           device.deviceAddressLandmark + ', ' + 
                           device.deviceCity + ', ' +
                           device.deviceState + ', ' +
                           device.deviceCountry}</td>
                      <td>{device.isActive ? 'Active' : 'Inactive'}</td>
                      <td>{device.inUse ? 'Charging' : 'Idle'}</td>
                      <td>
                        <Button variant="primary" onClick={() => props.history.push(`/product/${device.deviceId}/edit`)}>
                          Edit
                        </Button>{' '}
                        <Button variant="danger" onClick={() => deleteHandler(device)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
        </Row>
      </Container>

    </div>
  );
}

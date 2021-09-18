import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listDevices, createDevice } from '../../actions/deviceActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { DEVICE_CREATE_RESET } from '../../constants/deviceConstants';

export default function AdminDeviceScreen(props) {
  const dispatch = useDispatch();
  const deviceList = useSelector((state) => state.deviceList);
  const { loading, error, devices } = deviceList;

  // const deviceCreate = useSelector(state => state.deviceCreate);
  // const {
  //   loading: loadingCreate, 
  //   error: errorCreate, 
  //   success: successCreate, 
  //   device: createdDevice
  //  } = createDevice;

  useEffect(() => {

    // if (sucessCreate){
    //   dispatch({
    //     type: DEVICE_CREATE_RESET
    //   })
    // }
    dispatch(listDevices());
  }, [dispatch]);

  const deleteHandler = () => {
    //Todo Delete Dispatch
  };

  const createHandler = () => {
    dispatch(createDevice());
  }

  return (
    <div>
      {
        loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          
              <div class="col-md-12">
                <div class="card">
                  <div class="card-body">
                    <h3 class="card-title">List of Devices
                    <button class="btn btn-light right-float" onClick={createHandler}>Add Device</button>
                    </h3>
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th class="formContent">Device ID</th>
                            <th class="formContent">Category</th>
                            <th class="formContent">Address</th>
                            <th class="formContent">Status</th>
                            <th class="formContent">State</th>
                            <th class="formContent">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {devices.map((device) => (
                            <tr key={device.id}>
                              <td class="formContent">{device.deviceId}</td>
                              <td class="formContent">{device.deviceCategory}</td>
                              <td class="formContent">{device.deviceAddress1 + ', ' +
                                device.deviceAddress2 + ', ' +
                                device.deviceAddressLandmark + ', ' +
                                device.deviceCity + ', ' +
                                device.deviceState + ', ' +
                                device.deviceCountry}</td>
                              <td class="formContent">{device.isActive ? 'Active' : 'Inactive'}</td>
                              <td class="formContent">{device.inUse ? 'Charging' : 'Idle'}</td>
                              <td class="formContent">
                                <button class="btn btn-light btn-block" onClick={() => props.history.push(`/product/${device.deviceId}/edit`)}>
                                  Edit
                                </button>{' '}
                                <button class="btn btn-light btn-block" onClick={() => deleteHandler(device)}>
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
       
        )}


    </div>
  );
}

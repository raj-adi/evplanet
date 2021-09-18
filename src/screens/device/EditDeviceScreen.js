import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import detailsDevice from '../../actions/deviceActions';

function EditDeviceScreen(props) {

    const deviceId = props.match.params.id;

    const [category, setCategory] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setaddress2] = useState('');
    const [addresslandmark, setAddressLandmark] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [isactive, setIsActive] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsDevice(deviceId))
    })

    return (
        <div>
            
        </div>
    );
}

export default EditDeviceScreen;
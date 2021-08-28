import React, { useEffect, useState } from 'react';


function HomeScreen(props) {

    //For Loading
    const [loading, setLoading] = useState(false);

    //For Error
    const [error, setError] = useState(false);


    return (
        <div>
            Welcome to EVPlanets
        </div>
    );
}

export default HomeScreen;
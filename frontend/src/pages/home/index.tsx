import React, { useEffect, useState } from 'react';
import PlayerClassRepository from '../../api/repository/playerClassRepository';

const Home = () => {
    const [classes, setClasses] = useState<string[]>([]);

    useEffect(() => {
        PlayerClassRepository.getPlayerClassNames().then(setClasses);
    }, []);

    return (
        <>
            <div>
                Home page
                <br />
            </div>
            <div>
                {classes.map((s) => (
                    <div key={s}>{s}</div>
                ))}
            </div>
        </>
    );
};

export default Home;

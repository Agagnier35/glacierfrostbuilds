import { useEffect, useState } from 'react';
import GameRepository from '../api/repository/gameRepository';

const useCurrentGameVersion = () => {
    const [gameVersion, setGameVersion] = useState<string>('');

    useEffect(() => {
        GameRepository.getCurrentGameVersion().then(setGameVersion);
    }, []);

    return gameVersion;
};

export default useCurrentGameVersion;

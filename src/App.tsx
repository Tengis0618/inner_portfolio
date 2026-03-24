import './App.css';
import { useState } from 'react';
import Desktop from './components/os/Desktop';
import WindowsXPLogin from './components/os/Login';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const handleLogin = (): void => {
        setIsLoggedIn(true);
    };

    return (
        <div className="App">
            {isLoggedIn ? <Desktop /> : <WindowsXPLogin onLogin={handleLogin} />}
        </div>
    );
}

export default App;
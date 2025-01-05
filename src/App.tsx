import React from 'react';
import './styles/App.css';
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Your Tasks</h1>
            <KanbanBoard/>
        </div>

    );
};

export default App;

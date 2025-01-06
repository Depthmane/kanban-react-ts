import React from 'react';
import './styles/App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";

const App: React.FunctionComponent = () => {
    return (
        <div className="App">
            <h1>Your Tasks</h1>
            <DndProvider backend={HTML5Backend}>
                <KanbanBoard />
            </DndProvider>
        </div>
    );
};

export default App;
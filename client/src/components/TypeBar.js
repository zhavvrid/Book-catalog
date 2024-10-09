import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap";
import "../index.css";

const TypeBar = observer(() => {
    const { book } = useContext(Context);

    const handleJanrClick = (janr) => {
        book.setSelectedJanr(janr);
    };

    return (
        <div style={{ position: 'absolute', left: '-45px', top:'100px', width:'170px', padding:'0'}}>
            <ListGroup>
                {book.janrs.map(janr =>
                    <ListGroup.Item
                        key={janr.id}
                        action 
                        active={janr.id === book.selectedJanr.id}
                        onClick={() => handleJanrClick(janr)} 
                        style={{ 
                            backgroundColor: janr.id === book.selectedJanr.id ? '#089da1' : 'inherit', 
                            color: janr.id === book.selectedJanr.id ? 'white' : 'inherit',
                            borderColor: janr.id === book.selectedJanr.id ? '#089da1' : 'inherit' 
                        }}
                    >
                        {janr.name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
});

export default TypeBar;

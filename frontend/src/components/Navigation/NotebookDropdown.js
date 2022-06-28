import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import NewNotebookForm from './newNotebook';

function NotebookDropdown() {

    const notebooks = useSelector((state) => state.notebooks);
    const notebooksList  = Object.values(notebooks);

    const [showModal, setShowModal] = useState(false);

    return (
        <div className="NavNotebookContainer">
            <ul>
                <li>
                {notebooksList.length > 0 &&
                    notebooksList.map((notebook) => (
                    <NavLink
                        to={`/notebooks/${notebook.id}`}>
                        <p className="navNotebooks">
                        <i className="fas fa-solid fa-book"></i>
                        {notebook.title}
                        </p>
                    </NavLink>
                    ))}
                </li>
            </ul>
            <>
            <i className="fas fa-plus-circle"></i>
                <button onClick={() => setShowModal(true)}
                    className='new-nb-button'> 
                    New Notebook
                </button>
                    {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <NewNotebookForm />
                    </Modal>
                 )}
            </>
        </div>
    );
}

export default NotebookDropdown;
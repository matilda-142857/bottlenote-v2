import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import NewNotebookFormModal from './NewNBModal';

function NotebookDropdown() {

    const notebooks = useSelector((state) => state.notebooks);
    const notebooksList  = Object.values(notebooks);

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
                <NewNotebookFormModal/>
            </ul>
        </div>
    );
}

export default NotebookDropdown;
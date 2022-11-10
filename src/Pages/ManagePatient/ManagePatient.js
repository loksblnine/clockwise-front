import "../../Assets/Styles/ManagePatient.css";
import {useState} from "react";
import Header from "../../Layouts/Header/Header";
import ManagePatientPending from "./ManagePatientPending";
import ManagePatientDone from "./ManagePatientDone";

export default function ManagePatient() {
    const [table, setTable] = useState("pending");

    const activeBtn = event => {
        const elements = document.getElementsByClassName("active-btn");
        for (let el of elements) {
            el.classList.remove("active-btn")
        }
        event.currentTarget.classList.add("active-btn");
    }

    return (
        <>
            <Header/>
            <main>
                <section className="sect manage-patient-sect">
                    <div className="manage-patient-heading">
                        <div className="manage-patient-buttons">
                            <div
                                id="pending"
                                className="manage-patient-btn active-btn"
                                onClick={(event) => {
                                    setTable("pending");
                                    activeBtn(event);
                                }}
                            >
                                Pending
                            </div>
                            <div
                                id="done"
                                className="manage-patient-btn"
                                onClick={(event) => {
                                    setTable("done");
                                    activeBtn(event);
                                }}
                            >
                                Done
                            </div>
                        </div>
                        {/*<div className="search">*/}
                        {/*    <input className="search-input" placeholder="Search" maxLength="30"*/}
                        {/*           onChange={debouncedChangeHandler}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                    <div className="manage-patient-table">
                        {
                            table === "pending" ?
                                <ManagePatientPending status={table}/>
                                :
                                <ManagePatientDone status={table}/>
                        }
                    </div>
                </section>
            </main>
        </>
    )
}

import "../../Assets/Styles/Loading.css";
import "../../Assets/Styles/ManagePatient.css";
import CircularProgress from "@mui/material/CircularProgress";
import {theme} from "../../Utils/constants";
import {ThemeProvider} from "@mui/material/styles";

export default function Loading() {
    return (
        <>
            <main>
                <section className="sect manage-patient-sect loader-sect">
                    <ThemeProvider theme={theme}>
                        <CircularProgress color="primary"/>
                    </ThemeProvider>
                </section>
            </main>
        </>
    );
}

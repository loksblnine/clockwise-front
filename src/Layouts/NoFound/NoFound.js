import "../../Assets/Styles/NoFound.css";

export default function NoFound() {
    return (
        <div className="no-found">
            <img
                alt="no_found"
                src="https://res.cloudinary.com/loksblnine/image/upload/v1663757535/PatientApp/assets_front/no_found_j6smhb.svg"
            />
            <div>
                <h1>No results found</h1>
                <p>Please check the correct spelling and search again</p>
            </div>
        </div>
    );
}

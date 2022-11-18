import React from "react";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ManageProfile from "../Pages/ManageProfile/ManageProfile";
import AddDoctor from "../Pages/AddDoctor/AddDoctor";
import EditDoctorInfo from "../Pages/EditDoctorInfo/EditDoctorInfo";
import ManageOffice from "../Pages/ManageOffice/ManageOffice";
import PatientInfo from "../Pages/PatientInfo/PatientInfo";
import ManagePatient from "../Pages/ManagePatient/ManagePatient";
import ManageDoctors from "../Pages/ManageDoctors/ManageDoctors";
import ListOfFeedbacks from "../Pages/ListOfFeedbacks/ListOfFeedbacks";
import Feedback from "../Pages/Feedback/Feedback";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import ResetPasswordSuccess from "../Pages/ResetPassword/ResetPasswordSuccess";
import NewPassword from "../Pages/ResetPassword/NewPassword";
import ManageManagers from "../Pages/ManageManagers/ManageManagers";
import AddManager from "../Pages/AddManager/AddManager";
import EditManagersInfo from "../Pages/EditManagersInfo/EditManagersInfo";

export const GuestRoutes = [
    {
        path: '/login',
        Component: <Login/>
    },
    {
        path: '/sign-up',
        Component: <SignUp/>
    },
    {
        path: '/reset/password',
        Component: <ResetPassword/>
    },
    {
        path: '/reset/password/success',
        Component: <ResetPasswordSuccess/>
    },
    {
        path: '/recover-password',
        Component: <NewPassword/>
    },
];

export const AdminRoutes = [
    {
        path: '/',
        Component: <ManageManagers/>
    },
    {
        path: '/managers/add',
        Component: <AddManager/>
    },
    {
        path: '/managers/:id/edit',
        Component: <EditManagersInfo/>
    },
    {
        path: '/doctors/add',
        Component: <AddDoctor/>
    },
    {
        path: '/doctors/:id/edit',
        Component: <EditDoctorInfo/>
    },
    {
        path: '/doctors',
        Component: <ManageDoctors/>
    },
    {
        path: '/profile/edit',
        Component: <ManageProfile/>
    },
    {
        path: '/feedbacks',
        Component: <ListOfFeedbacks/>
    },
]

export const ManagerRoutes = [
    {
        path: '/',
        Component: <ManageDoctors/>
    },
    {
        path: '/requests',
        Component: <ManagePatient/>
    },
    {
        path: '/profile/edit',
        Component: <ManageProfile/>
    },
    {
        path: '/doctors/add',
        Component: <AddDoctor/>
    },
    {
        path: '/doctors/:id/edit',
        Component: <EditDoctorInfo/>
    },
    {
        path: '/office/edit',
        Component: <ManageOffice/>
    },
    {
        path: '/patients/:id',
        Component: <PatientInfo/>
    },
    {
        path: '/feedbacks',
        Component: <ListOfFeedbacks/>
    },
];

export const DoctorRoutes = [
    {
        path: '/',
        Component: <ManagePatient/>
    },
    {
        path: '/profile/edit',
        Component: <ManageProfile/>
    },
    {
        path: '/office/edit',
        Component: <ManageOffice/>
    },
    {
        path: '/patients/:id',
        Component: <PatientInfo/>
    },
    {
        path: '/feedbacks',
        Component: <Feedback/>
    },
];
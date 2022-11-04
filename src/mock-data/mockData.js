export const database = [
    {
        id: "Lindsey_Herwitz",
        first_name: "Lindsey",
        last_name: "Herwitz",
        specialty: "manager",
        telephone: "+49 258 654 77",
        location: "Munich",
        role: "manager",
        clinic: "Harlaching Hospital",
        email: "user1",
        password: "pass1"
    },
    {
        id: "John_Doe",
        first_name: "John",
        last_name: "Doe",
        specialty: "manager",
        telephone: "+49 211 568 49 62",
        location: "City",
        role: "admin",
        clinic: "Harlaching Hospital",
        email: "user2",
        password: "pass2"
    },
    {
        id: "Lindsey_Herwitz_doc",
        first_name: "Lindsey",
        last_name: "Herwitz",
        specialty: "General Practitioner",
        telephone: "+49 258 654 77",
        location: "Munich",
        role: "doctor",
        clinic: "Harlaching Hospital",
        patients: "58",
        feedbacks: "124",
        email: "user3",
        password: "pass3"
    },
    {
        id: "Kadin_Botosh",
        first_name: "Kadin",
        last_name: "Botosh",
        specialty: "Cardiologist",
        telephone: "+49 258 654 77",
        location: "Munich",
        role: "doctor",
        clinic: "Harlaching Hospital",
        patients: "58",
        feedbacks: "124",
        email: "user4",
        password: "pass4"
    },
    {
        id: "John_Smith",
        first_name: "John",
        last_name: "Smith",
        specialty: "General Practitioner",
        telephone: "+49 258 654 77",
        location: "Munich",
        role: "doctor",
        clinic: "Harlaching Hospital",
        patients: "58",
        feedbacks: "124",
        email: "user5",
        password: "pass5"
    },
    {
        id: "Peter_Bergman",
        first_name: "Peter",
        last_name: "Bergman",
        specialty: "Urologist",
        telephone: "+49 258 654 77",
        location: "Munich",
        role: "doctor",
        clinic: "Harlaching Hospital",
        patients: "58",
        feedbacks: "124",
        email: "user6",
        password: "pass6"
    },
    {
        id: "Lora_Cooper",
        first_name: "Lora",
        last_name: "Cooper",
        specialty: "General Practitioner",
        telephone: "+49 258 654 77",
        location: "Munich",
        role: "doctor",
        clinic: "Harlaching Hospital",
        patients: "58",
        feedbacks: "124",
        email: "user7",
        password: "pass7"
    },
    {
        id: "Peter_Bergman",
        first_name: "Peter",
        last_name: "Bergman",
        specialty: "Urologist",
        telephone: "+49 258 654 77",
        location: "Munich",
        role: "doctor",
        clinic: "Harlaching Hospital",
        patients: "58",
        feedbacks: "124",
        email: "user8",
        password: "pass8"
    },
];

export const patients = [
    {
        id: "Davis_Bergson",
        first_name: "Davis",
        last_name: "Bergson",
        birth: "01.09.1986",
        location: "33487 Munich",
        telephone: "+49 8898 7854",
        content: [{
            category: "Medical Appointment",
            content: ["Ibuprofen 10mg", "Metformin 15mg"],
            date_approved: "20.05.2022",
            notice: "I need to talk to the doctor before approving this medicine",
            date: {
                date: "18.08.2022",
                block: "Morning block"
            }
        }],
    },
    {
        id: "Mira_Passaquindici_Arcand",
        first_name: "Mira",
        last_name: "Passaquindici Arcand",
        birth: "01.01.1986",
        location: "33487 Munich",
        telephone: "+49 8898 7854",
        content: [
            {
                category: "Drug Prescription",
                content: ["Meloxicam (Mobic) - 5 mg 30 capsules"],
                date_approved: "20.05.2022",
                notice: "I need to talk to the doctor before approving this medicine",
                date: {
                    date: "18.08.2022",
                    block: "Morning block"
                }
            },
            {
                category: "Drug Prescription",
                content: ["Meloxicam (Mobic) - 5 mg 30 capsules"],
                date_approved: "20.05.2022",
                notice: "I need to talk to the doctor before approving this medicine",
                date: {
                    date: "18.08.2022",
                    block: "Morning block"
                }
            },
            {
                category: "Drug Prescription",
                content: ["Meloxicam (Mobic) - 5 mg 30 capsules"],
                date_approved: "20.05.2022",
                notice: "I need to talk to the doctor before approving this medicine",
                date: {
                    date: "18.08.2022",
                    block: "Morning block"
                }
            }
        ],
    },
    {
        id: "Makenna_Lubin",
        first_name: "Makenna",
        last_name: "Lubin",
        birth: "01.01.1986",
        location: "33487 Munich",
        telephone: "+49 8898 7854",
        content: [{
            category: "Vaccination",
            content: ["Chickenpox Vaccine"],
            date_approved: "20.05.2022",
            notice: "Vaccine given",
            date: {
                date: "18.08.2022",
                time: "19:03"
            }
        }],
    },
    {
        id: "Makenna_Bergson",
        first_name: "Makenna",
        last_name: "Bergson",
        birth: "01.01.1986",
        location: "33487 Munich",
        telephone: "+49 8898 7854",
        content: [{
            category: "Drug Prescription",
            content: ["Cialis (Tatdldfil) 10mg"],
            date_approved: "20.05.2022",
            notice: "Reached and delivered",
            date: {
                date: "18.08.2022",
                message: "Ready to pick up"
            }
        }],
    },
    {
        id: "Martin_Botosh",
        first_name: "Martin",
        last_name: "Botosh",
        birth: "01.01.1986",
        location: "33487 Munich",
        telephone: "+49 8898 7854",
        content: [{
            category: "Specialist Transfer",
            content: ["To Cardiologist"],
            date_approved: "20.05.2022",
            notice: "Patient has a strange reason to transfer",
            date: {
                date: "18.08.2022"
            }
        }],
    },
];

export const feedbacks = [
    {
        id: "Makenna_Lubin",
        first_name: "Makenna",
        last_name: "Lubin",
        date: "20.07.2022",
        message: "“Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”"
    },
    {
        id: "Makenna_Bergson",
        first_name: "Makenna",
        last_name: "Bergson",
        date: "20.07.2022",
        message: "“Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”"
    },
    {
        id: "Martin_Botosh",
        first_name: "Martin",
        last_name: "Botosh",
        date: "20.07.2022",
        message: "“Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”"
    },
    {
        id: "Rosa_Macron",
        first_name: "Rosa",
        last_name: "Macron",
        date: "20.07.2022",
        message: "“Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”"
    },
    {
        id: "Mira_Passaquindici_Arcand",
        first_name: "Mira",
        last_name: "Passaquindici Arcand",
        date: "20.07.2022",
        message: "“Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”"
    },
    {
        id: "Rosa_Macron_2",
        first_name: "Rosa",
        last_name: "Macron",
        date: "20.07.2022",
        message: "“Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”"
    }
]



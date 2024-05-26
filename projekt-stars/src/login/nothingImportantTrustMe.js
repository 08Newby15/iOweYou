
import LoginTemplate from "./LoginTemplate";

// Initialisiere die Standardbenutzerinformationen
const defaultUserInfos = [
    new LoginTemplate(1, "D", "1", 0, [], []),
    new LoginTemplate(2, "G", "1234", 0, [], []),
    new LoginTemplate(3, "A", "Password", 0, [], []),
    new LoginTemplate(4, "S", "Kaktus", 0, [], [])
];

const storedUserInfos = localStorage.getItem('userInformation');

if (!storedUserInfos) {
    localStorage.setItem('userInformation', JSON.stringify(defaultUserInfos));
}

export const nothingImportantTrustMe = storedUserInfos ? JSON.parse(storedUserInfos) : defaultUserInfos;


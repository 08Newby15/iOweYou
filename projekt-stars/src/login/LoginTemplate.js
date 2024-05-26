export default class LoginTemplate {
    constructor(id, name, password, countStars, starsGivenTo, starsReceivedFrom) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.countStars = countStars;
        this.starsGivenTo = Array.isArray(starsGivenTo) ? starsGivenTo : [];
        this.starsReceivedFrom = Array.isArray(starsReceivedFrom) ? starsReceivedFrom : [];
    }
}

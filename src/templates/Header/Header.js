import { getFileContentSync } from "/tools/index.js";

const Header = () => {
    const template = getFileContentSync('/templates/Header/Header.html');



    return eval("`"+ template +"`");

}


export default Header;
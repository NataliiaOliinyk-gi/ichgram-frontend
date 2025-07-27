
import LegalPage from "../../modules/LegalPage/LegalPage";
import { cookiesData } from "../../shared/data/cookiesData";

const CookiesPolicyPage = ()=>{
    return (
        <main>
            <LegalPage data={cookiesData}/>
        </main>
    )
};

export default CookiesPolicyPage;
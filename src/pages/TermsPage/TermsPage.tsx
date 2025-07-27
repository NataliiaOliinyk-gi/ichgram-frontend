
import LegalPage from "../../modules/LegalPage/LegalPage";
import { termsData } from "../../shared/data/termsData";

const TermsPage = ()=>{
    return (
        <main>
            <LegalPage data={termsData}/>
        </main>
    )
};

export default TermsPage;
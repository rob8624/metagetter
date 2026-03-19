import LegalDocument from "../../components/legal/legalDocumets";

export default function PrivacyPolicy() {
    return(
        <LegalDocument queryKey={'privacy'} endpoint={'privacy/'} />
    )
}
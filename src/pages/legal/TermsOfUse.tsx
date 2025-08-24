import TermsOfUseHtml from "./terms.html?raw";
const TermsOfUse = () => {
	return (
		<div className="p-4" dangerouslySetInnerHTML={{ __html: TermsOfUseHtml }} />
	)

}

export default TermsOfUse;
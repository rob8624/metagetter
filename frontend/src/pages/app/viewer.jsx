import PageGridTitle from "../../components/custom/PageGridTitle";

import { FaCompressArrowsAlt } from "react-icons/fa";


export default function Viewer () {
    return (
        <>
        
        <PageGridTitle
                  title={"Viewer"}
                  descripition={"Here you can view and edit your data"}
                  subDescription={"Select an image to view options"}
                  icon={<FaCompressArrowsAlt />}
                  color={"grey"}
                />
        </>
    )
}
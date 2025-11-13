const PageGridTitle = ({title, descripition, subDescription, icon, color, className}) => {
        return (
            <div className={`inline-block`}>
                
                    <div className='flex text-xs sm:text-2xl w-fit'>
                        <h2>{title}</h2>
                        <div style={{ color: color }} className="icon-container">
                            
                        </div>
                    </div>
                
            </div>
        )
    }


export default PageGridTitle
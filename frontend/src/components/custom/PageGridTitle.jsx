const PageGridTitle = ({title, descripition, subDescription, icon, color}) => {
        return (
            <div className="grid grid-cols-[auto_1fr] gap-x-6 mb-5">
                <div className='sm:place-self-end'>
                    <div className='flex text-4xl sm:text-6xl'>
                        <h2>{title}</h2>
                        <div style={{ color: color }} className="icon-container">
                            {icon}
                        </div>
                    </div>
                    <p className='text-sm text-muted-foreground pt-2'>{subDescription}</p>
                </div>
                 
                <div className='col-span-full lg:col-start-2'>
                    <h3 className='mb-2 text-3xl lg:text-5xl font-bold  black'>{descripition}</h3>
                </div>
              
            </div>
        )
    }


export default PageGridTitle
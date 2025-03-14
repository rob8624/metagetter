import React, { createContext, useContext } from 'react';

const MenuDataContext = createContext()

const menuData = [

    {
      
      aboutContent: [{Label: 'About', title: 'Metagetter',
                      firstText : `A tool to view, edit and save file metadata. Harnesing the
                                  pwer of Exiftool, Metagetter enables you take control of the
                                  hidden dta within files.`,
                      subText: `improve SEO, add authenticity to AI
                                  images, help catalog and label images`,
                      secondTitle : 'MetaGetter Functionalities',
                      secondText : `MetaGetter lets you view and edit all exifdata fields available and all data types,
                                  incluing XMP (PhotoMechanic) IPTC (PHOTOSHOP).`}],
     
      
      usageContent: [{Label: 'Usage', text: 'Use the upload function below to add upto five images',
        foo: 'bar'
      }],

      signinContent: [{Label: 'Login & Signup', text: `Users can sign in here, or if not registered, please
        sign-up here!`, path: "/signin"}]
    }
  ]


  export function MenuDataProvider({children} ) {
        return(
            <MenuDataContext.Provider value={menuData}>
                {children}
            </MenuDataContext.Provider>
        )
  }


    export function UseMenuData() {
        const context = useContext(MenuDataContext);
        if (context === undefined) {
            throw new Error('useMenuData must be used within a MenuDataProvider');
        }
        return context
    }


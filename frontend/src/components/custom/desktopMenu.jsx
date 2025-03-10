import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

import {useMediaQuery } from '@react-hook/media-query'


export default function DesktopMenu() {

  const matches = useMediaQuery('only screen and (min-width: 600px)')

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
      },]
    }
  ]

  const topDropdownStyles = `
  [&>div.absolute]:bottom-full 
  [&>div.absolute]:top-auto 
  [&>div.absolute>*]:mb-1.5 
  [&>div.absolute>*]:mt-0
  [&>div.absolute>*]:origin-bottom-center
`;

const navMenuClassName = matches ? '' : topDropdownStyles;

  return (
    <>
    
    <NavigationMenu className={navMenuClassName}>
    {menuData.map((item, index) => (
      <NavigationMenuList key={index}>
      
        <NavigationMenuItem>
            
          {item.aboutContent && item.aboutContent.map((item, index) => (   
            <React.Fragment key={index}>
          <NavigationMenuTrigger>{item.Label}</NavigationMenuTrigger>
          <NavigationMenuContent>
              <div className="grid grid-cols-[repeat(2,auto)] auto-rows-auto gap-2 w-[300px] p-2">
                <div className="col-span-2 text-xl">
                  
                  <h1 className="font-bold" >{item.title}</h1>
                </div>
                <span  className="text-sm leading-tight">
                  {item.firstText}
                </span>
                <div  className="text-sm leading-tight">
                  {item.subText}
                </div>
                <hr className="col-span-2"></hr>
                <h2  className="col-span-2 text-lg font-bold">{item.secondTitle}</h2>
                <div className="text-sm leading-tight col-span-2">
                  {item.secondText}
                </div>
             </div>
          </NavigationMenuContent>
          </React.Fragment>
          ))}
        </NavigationMenuItem>
      
        {item.usageContent && item.usageContent.map((item, index) => (
          <React.Fragment key={index}>
        <NavigationMenuItem >
          <NavigationMenuTrigger className="">{item.Label}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-5 w-[300px]">
              <h1>{item.text}</h1>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="">Donate</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-5 w-[300px]">
              <h1>Upload images(s)</h1>
             
            </div>  
          </NavigationMenuContent>
        </NavigationMenuItem>
        </React.Fragment>
        ))}
      </NavigationMenuList>
     ))}
    </NavigationMenu>
   </>
  );
}

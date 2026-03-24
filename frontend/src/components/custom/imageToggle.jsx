
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"


export default function ImageToggle ({showImages, setShowImages}) {
    return (
      <div className="flex gap-2 items-center m-2">
       
        <Switch id="image-toggle" checked={showImages} onCheckedChange={(checked) => setShowImages(checked)} /> 
             <Label htmlFor="data-tools-menu" className={`${showImages ? 'text-bold p-2' : 'text-muted-foreground'} text-sm`}
               >Toggle Images</Label>
        
    </div>
    )
}
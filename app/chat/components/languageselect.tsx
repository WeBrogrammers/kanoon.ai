import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  Link,
  Youtube,
  PlusCircle,
  Plus,
  Settings,
  User,
  Languages,
  MoreVertical
} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuCheckboxes() {
  return (
    <div className="ml-2 flex items-center justify-center h-full w-15 right-0 top-0 text-gray-400 hover:text-gray-600 ">
      <DropdownMenu >
        <DropdownMenuTrigger asChild >
          <Button variant="outline"><MoreVertical /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Languages className="mr-2 h-4 w-4" />
                <span>Chat Language</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <span>English</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Hindi</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>More...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Youtube className="mr-2 h-4 w-4" />
                <span>Youtube</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="comfortable" id="r2" />
                      <Label htmlFor="r2">ON</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="compact" id="r3" />
                      <Label htmlFor="r3">OFF</Label>
                    </div>
                  </RadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Link className="mr-2 h-4 w-4" />
                <span>Link</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="comfortable" id="r2" />
                      <Label htmlFor="r2">ON</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="compact" id="r3" />
                      <Label htmlFor="r3">OFF</Label>
                    </div>
                  </RadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

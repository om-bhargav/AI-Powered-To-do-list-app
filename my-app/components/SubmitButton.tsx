import { useFormStatus } from "react-dom"
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
const SubmitButton = ({text}: {text:string}) => {
  const {pending} = useFormStatus();
  return <Button disabled={pending}>{pending ? <Loader2 className="animate-spin" size={30}/>:text}</Button>
}

export default SubmitButton
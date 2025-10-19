import { Loader2 } from "lucide-react"

const loading = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin textgra" />
        <p>Please wait ...</p>
    </div>
  )
}

export default loading
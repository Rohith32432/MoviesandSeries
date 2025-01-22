import { Skeleton } from "@/components/ui/skeleton"

export function Loading() {
  return (
    <>
        <Skeleton className="flex items-center min-h-[200px] flex-col justify-center gap-3 space-x-4">

      <Skeleton className="h-12 w-12 rounded-full" />
      
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
   
        </Skeleton>
    </>
  )
}

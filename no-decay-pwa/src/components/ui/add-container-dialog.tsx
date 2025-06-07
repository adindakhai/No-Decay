"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"

interface AddContainerDialogProps {
  onAddContainer: (name: string) => void
}

export function AddContainerDialog({ onAddContainer }: AddContainerDialogProps) {
  const [containerName, setContainerName] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    if (containerName.trim()) {
      onAddContainer(containerName.trim())
      setContainerName("")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Plus className="text-green-900 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Container</DialogTitle>
          <DialogDescription>
            Enter a name for your new container.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              placeholder="Container name"
              className="col-span-4"
              value={containerName}
              onChange={(e) => setContainerName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} className="bg-green-900 hover:bg-green-800">
            Add Container
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 
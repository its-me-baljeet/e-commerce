// 1. Add 'use client' at the top
'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useState } from "react"
import { Textarea } from "./ui/textarea"
import { addProductToDB } from "@/actions/prismaClient"

export default function AddProductDialog() {
  // 2. State to control the dialog's open/close status
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [category, setCategory] = useState("");

  // 3. Correct the event type to React.FormEvent
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      title,
      description,
      price,
      imgUrl,
      category
    }
    console.log(await addProductToDB(data));
    
    // 4. Close the dialog after successful submission
    setOpen(false);
  }

  return (
    // 5. Pass the state to the Dialog component
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">+ add product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {/* 6. Move the <form> tag inside DialogContent */}
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>Enter product details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="img">Image URL</Label>
              <Input id="img" value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <Input id="category" value={category} onChange={e => setCategory(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            {/* The cancel button will now be handled by onOpenChange */}
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
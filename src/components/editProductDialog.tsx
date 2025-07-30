'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProductObj } from "@/types"
import { updateProduct } from "@/utils/actions"
import { Edit } from "lucide-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

export function EditProductDialog({ productData, updateItem }: {
  productData: ProductObj;
  updateItem: (data: ProductObj) => void;
}) {
  const [title, setTitle] = useState(productData.title);
  const [description, setDescription] = useState(productData.description);
  const [category, setCategory] = useState(productData.category);
  const [price, setPrice] = useState(productData.price);
  const [discount, setDiscount] = useState(productData.discountPercentage);
  const [thumbnail, setThumbnail] = useState(productData.thumbnail);
  const [images, setImages] = useState(productData.images);

  // const handleImages = (e: )=>{
  //   const updateImages = e.target.value;
  // }

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !category.trim() || !thumbnail.trim()) {
      toast.error("Fields can't be empty!");
      return;
    }
    const updatedProduct = {
      title,
      description,
      price,
      category,
      discountPercentage: discount,
      thumbnail,
      images
    }
    const resp = await updateProduct(updatedProduct, productData.id);
    const obj ={
      ...updatedProduct, id: productData.id
    }
    console.log("hi")
    if (resp.success) {
      toast.success(resp.message);
      updateItem(obj)
    } else {
      toast.error(resp.message);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><Edit className="text-gray-900" /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleUpdate}>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Enter the product details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <Label htmlFor="title">description</Label>
            <Input id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="grid gap-3">
            <div className="grid gap-3">
              <Label htmlFor="description">description</Label>
              <Input id="description" name="description" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">category</Label>
              <Input id="category" name="category" value={category} onChange={e => setCategory(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">price</Label>
              <Input type="number" id="price" name="price" value={price} onChange={e => setPrice(Number(e.target.value))} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="discount">discount % </Label>
              <Input type="number" id="discount" name="discount" value={discount ?? 0} onChange={e => setDiscount(Number(e.target.value))} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="thumbnail">thumbnail</Label>
              <Input id="thumbnail" name="thumbnail" value={thumbnail} onChange={e => setThumbnail(e.target.value)} />
            </div>
            {/* <div className="grid gap-3">
              <Label htmlFor="images">images</Label>
              <Input id="images" name="images" value={images} onChange={e=>handleImages(e)} />
            </div> */}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

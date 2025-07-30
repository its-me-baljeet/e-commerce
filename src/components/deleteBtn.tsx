'use client';

import { deleteProductFromDB } from "@/actions/prismaClient";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteButton({id, deleteItem}:{
    id: string;
    deleteItem: (id: string)=>void
}){
    const router = useRouter();
    async function handleDelete() {
        deleteItem(id);
        const resp = await deleteProductFromDB(id);
    }
    return(
        <button onClick={handleDelete}><Trash2 className="text-red-500"/></button>
    )
}
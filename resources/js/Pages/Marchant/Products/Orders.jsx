import DashboardLayout from "@/Layouts/marchant-layout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function MarchantOrders({  }) {
    const { toast } = useToast();
 



    return (
        <DashboardLayout>
            <Card className="mx-auto max-w-6xl">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold" >Merchant Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}

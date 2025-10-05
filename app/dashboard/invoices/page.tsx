import { fetchInvoicesPages } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import Pagination from "@/app/ui/invoices/pagination";
import InvoicesTable from "@/app/ui/invoices/table";
import Search from "@/app/ui/search";
import { Suspense } from "react";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Invoices',
};

interface InvoicePageProps {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>
}

const InvoicesPage = async ({ searchParams }: InvoicePageProps) => {
    const query = (await searchParams)?.query || '';
    const currentPage = Number((await searchParams)?.page) || 1;
    const totalPages = await fetchInvoicesPages(query)

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2x1`}>
                    Invoices
                </h1>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search inovices..." />
                <CreateInvoice/>
            </div>
            <Suspense>
                <InvoicesTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
 
export default InvoicesPage;
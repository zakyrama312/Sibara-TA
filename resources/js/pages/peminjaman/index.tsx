// resources/js/Pages/PeminjamanPage.tsx

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';

interface Peminjaman {
    id: number;
    tanggal_pinjam: string;
    nama_barang: string;
    jumlah: number;
    peminjam: string;
    kelas: string;
    keperluan: string;
    tanggal_kembali: string;
    status: 'Dipinjam' | 'Dikembalikan';
}

export default function PeminjamanPage() {
    const [globalFilter, setGlobalFilter] = useState('');
    const [data, setData] = useState<Peminjaman[]>([
        {
            id: 1,
            tanggal_pinjam: '2024-05-10',
            nama_barang: 'Laptop ASUS',
            jumlah: 2,
            peminjam: 'Budi Santoso',
            kelas: 'XII RPL 1',
            keperluan: 'Praktek',
            tanggal_kembali: '2024-05-12',
            status: 'Dipinjam',
        },
        {
            id: 2,
            tanggal_pinjam: '2024-05-09',
            nama_barang: 'Proyektor',
            jumlah: 1,
            peminjam: 'Sari Melati',
            kelas: 'XI MM 2',
            keperluan: 'Presentasi',
            tanggal_kembali: '2024-05-10',
            status: 'Dikembalikan',
        },
    ]);

    const handleStatusChange = (id: number) => {
        setData((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          status: item.status === 'Dipinjam' ? 'Dikembalikan' : 'Dipinjam',
                      }
                    : item,
            ),
        );
    };

    const columns: ColumnDef<Peminjaman>[] = [
        {
            id: 'no',
            header: 'No',
            cell: ({ row }) => row.index + 1,
        },
        { accessorKey: 'tanggal_pinjam', header: 'Tanggal Pinjam' },
        { accessorKey: 'nama_barang', header: 'Nama Barang' },
        { accessorKey: 'jumlah', header: 'Jumlah' },
        { accessorKey: 'peminjam', header: 'Peminjam' },
        { accessorKey: 'kelas', header: 'Kelas' },
        { accessorKey: 'keperluan', header: 'Keperluan' },
        { accessorKey: 'tanggal_kembali', header: 'Tanggal Kembali' },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                        row.original.status === 'Dipinjam' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                    }`}
                >
                    {row.original.status}
                </span>
            ),
        },
        {
            id: 'aksi',
            header: 'Opsi',
            cell: ({ row }) => (
                <Button variant="outline" size="sm" onClick={() => handleStatusChange(row.original.id)}>
                    Ubah Status
                </Button>
            ),
        },
    ];

    const table = useReactTable({
        data,
        columns,
        state: { globalFilter },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Peminjaman', href: '/peminjaman' }]}>
            <Head title="Peminjaman" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <Input
                        placeholder="Cari data peminjaman..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="max-w-md"
                    />
                </div>

                <div className="overflow-x-auto rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((group) => (
                                <TableRow key={group.id}>
                                    {group.headers.map((header) => (
                                        <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="text-center">
                                        Tidak ada data.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}

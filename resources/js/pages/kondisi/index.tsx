import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';

interface Kondisi {
    id: number;
    jumlah?: number;
    nama_kondisi: string;
}

export default function KondisiPage() {
    const [globalFilter, setGlobalFilter] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // ✅ Data dummy kondisi
    const [kondisis, setkondisis] = useState<Kondisi[]>([
        { id: 1, jumlah: 12, nama_kondisi: 'Baik' },
        { id: 2, jumlah: 27, nama_kondisi: 'Kurang Baik' },
        { id: 3, jumlah: 12, nama_kondisi: 'Rusak' },
    ]);

    const form = useForm({
        nama_kondisi: '',
    });

    const openCreateModal = () => {
        form.reset();
        setEditMode(false);
        setModalOpen(true);
    };

    const openEditModal = (kondisi: Kondisi) => {
        form.setData({ nama_kondisi: kondisi.nama_kondisi });
        setSelectedId(kondisi.id);
        setEditMode(true);
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editMode && selectedId !== null) {
            // ✅ Simulasi update data dummy
            setkondisis((prev) => prev.map((k) => (k.id === selectedId ? { ...k, nama_kondisi: form.data.nama_kondisi } : k)));
        } else {
            // ✅ Simulasi tambah data dummy
            setkondisis((prev) => [...prev, { id: Date.now(), nama_kondisi: form.data.nama_kondisi }]);
        }

        setModalOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus kondisi ini?')) {
            // ✅ Simulasi hapus data dummy
            setkondisis((prev) => prev.filter((k) => k.id !== id));
        }
    };

    const columns: ColumnDef<Kondisi>[] = [
        {
            id: 'nomor',
            header: 'No',
            cell: ({ row }) => row.index + 1,
        },
        { accessorKey: 'nama_kondisi', header: 'Nama Kondisi' },
        {
            accessorKey: 'jumlah',
            header: 'Jumlah Barang',
            cell: ({ row }) => (row.original.jumlah ? row.original.jumlah : 0),
        },
        {
            id: 'aksi',
            header: 'Aksi',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button onClick={() => openEditModal(row.original)} size="sm">
                        Edit
                    </Button>
                    <Button onClick={() => handleDelete(row.original.id)} size="sm" variant="destructive">
                        Hapus
                    </Button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: kondisis,
        columns,
        state: { globalFilter },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'kondisi', href: '/kondisi' }]}>
            <Head title="kondisi" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <Input
                        placeholder="Cari Kondisi..."
                        value={globalFilter ?? ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="max-w-sm"
                    />
                    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreateModal}>Tambah kondisi</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editMode ? 'Edit kondisi' : 'Tambah Kondisi'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    placeholder="Nama kondisi"
                                    value={form.data.nama_kondisi}
                                    onChange={(e) => form.setData('nama_kondisi', e.target.value)}
                                    required
                                />
                                <Button type="submit" disabled={form.processing}>
                                    Simpan
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
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

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';

interface Kategori {
    id: number;
    jumlah?: number;
    nama_kategori: string;
}

export default function KategoriPage() {
    const [globalFilter, setGlobalFilter] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // ✅ Data dummy kategori
    const [kategoris, setKategoris] = useState<Kategori[]>([
        { id: 1, jumlah: 12, nama_kategori: 'Komputer' },
        { id: 2, jumlah: 27, nama_kategori: 'Meja' },
        { id: 3, jumlah: 12, nama_kategori: 'Barang Habis Pakai' },
        { id: 4, jumlah: 12, nama_kategori: 'AC' },
    ]);

    const form = useForm({
        nama_kategori: '',
    });

    const openCreateModal = () => {
        form.reset();
        setEditMode(false);
        setModalOpen(true);
    };

    const openEditModal = (kategori: Kategori) => {
        form.setData({ nama_kategori: kategori.nama_kategori });
        setSelectedId(kategori.id);
        setEditMode(true);
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editMode && selectedId !== null) {
            // ✅ Simulasi update data dummy
            setKategoris((prev) => prev.map((k) => (k.id === selectedId ? { ...k, nama_kategori: form.data.nama_kategori } : k)));
        } else {
            // ✅ Simulasi tambah data dummy
            setKategoris((prev) => [...prev, { id: Date.now(), nama_kategori: form.data.nama_kategori }]);
        }

        setModalOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus kategori ini?')) {
            // ✅ Simulasi hapus data dummy
            setKategoris((prev) => prev.filter((k) => k.id !== id));
        }
    };

    const columns: ColumnDef<Kategori>[] = [
        {
            id: 'nomor',
            header: 'No',
            cell: ({ row }) => row.index + 1,
        },
        { accessorKey: 'nama_kategori', header: 'Nama Kategori' },
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
        data: kategoris,
        columns,
        state: { globalFilter },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'kategori', href: '/kategori' }]}>
            <Head title="Kategori" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <Input
                        placeholder="Cari kategori..."
                        value={globalFilter ?? ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="max-w-sm"
                    />
                    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreateModal}>Tambah Kategori</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editMode ? 'Edit Kategori' : 'Tambah Kategori'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    placeholder="Nama Kategori"
                                    value={form.data.nama_kategori}
                                    onChange={(e) => form.setData('nama_kategori', e.target.value)}
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

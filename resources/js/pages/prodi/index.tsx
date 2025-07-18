import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';

interface Prodi {
    id: number;
    jumlah?: number;
    nama_prodi: string;
}

export default function ProdiPage() {
    const [globalFilter, setGlobalFilter] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // ✅ Data dummy prodi
    const [prodis, setprodis] = useState<Prodi[]>([
        { id: 1, jumlah: 12, nama_prodi: 'Pengembangan Perangkat Lunak dan Gim' },
        { id: 2, jumlah: 27, nama_prodi: 'Broadcasting Perfilman' },
        { id: 3, jumlah: 12, nama_prodi: 'Teknik Jaringan Komputer dan Telekomunikasi' },
    ]);

    const form = useForm({
        nama_prodi: '',
    });

    const openCreateModal = () => {
        form.reset();
        setEditMode(false);
        setModalOpen(true);
    };

    const openEditModal = (prodi: Prodi) => {
        form.setData({ nama_prodi: prodi.nama_prodi });
        setSelectedId(prodi.id);
        setEditMode(true);
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editMode && selectedId !== null) {
            // ✅ Simulasi update data dummy
            setprodis((prev) => prev.map((k) => (k.id === selectedId ? { ...k, nama_prodi: form.data.nama_prodi } : k)));
        } else {
            // ✅ Simulasi tambah data dummy
            setprodis((prev) => [...prev, { id: Date.now(), nama_prodi: form.data.nama_prodi }]);
        }

        setModalOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus prodi ini?')) {
            // ✅ Simulasi hapus data dummy
            setprodis((prev) => prev.filter((k) => k.id !== id));
        }
    };

    const columns: ColumnDef<Prodi>[] = [
        {
            id: 'nomor',
            header: 'No',
            cell: ({ row }) => row.index + 1,
        },
        { accessorKey: 'nama_prodi', header: 'Nama Prodi' },
        {
            accessorKey: 'jumlah',
            header: 'Jumlah Ruang',
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
        data: prodis,
        columns,
        state: { globalFilter },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Prodi', href: '/prodi' }]}>
            <Head title="Prodi" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <Input
                        placeholder="Cari prodi..."
                        value={globalFilter ?? ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="max-w-sm"
                    />
                    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreateModal}>Tambah prodi</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editMode ? 'Edit Prodi' : 'Tambah Prodi'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    placeholder="Nama Prodi"
                                    value={form.data.nama_prodi}
                                    onChange={(e) => form.setData('nama_prodi', e.target.value)}
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

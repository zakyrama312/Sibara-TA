import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';

interface Pengguna {
    id: number;
    nama_lengkap: string;
    username: string;
    role: string;
}

export default function PenggunaPage() {
    const [globalFilter, setGlobalFilter] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [penggunas, setPenggunas] = useState<Pengguna[]>([
        { id: 1, nama_lengkap: 'Zaky Nurfauzan', username: 'zaky', role: 'admin' },
        { id: 2, nama_lengkap: 'Dina Safitri', username: 'dina123', role: 'anggota' },
        { id: 3, nama_lengkap: 'Nazarudin Zen', username: 'zen', role: 'kaprodi' },
    ]);

    const form = useForm({
        nama_lengkap: '',
        username: '',
        role: '',
    });

    const openCreateModal = () => {
        form.reset();
        setEditMode(false);
        setModalOpen(true);
    };

    const openEditModal = (pengguna: Pengguna) => {
        form.setData({
            nama_lengkap: pengguna.nama_lengkap,
            username: pengguna.username,
            role: pengguna.role,
        });
        setSelectedId(pengguna.id);
        setEditMode(true);
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editMode && selectedId !== null) {
            setPenggunas((prev) => prev.map((p) => (p.id === selectedId ? { ...p, ...form.data } : p)));
        } else {
            setPenggunas((prev) => [...prev, { id: Date.now(), ...form.data }]);
        }

        setModalOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus pengguna ini?')) {
            setPenggunas((prev) => prev.filter((p) => p.id !== id));
        }
    };

    const columns: ColumnDef<Pengguna>[] = [
        {
            id: 'nomor',
            header: 'No',
            cell: ({ row }) => row.index + 1,
        },
        { accessorKey: 'nama_lengkap', header: 'Nama Lengkap' },
        { accessorKey: 'username', header: 'Username' },
        { accessorKey: 'role', header: 'Role' },
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
        data: penggunas,
        columns,
        state: { globalFilter },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Pengguna', href: '/pengguna' }]}>
            <Head title="Pengguna" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <Input
                        placeholder="Cari pengguna..."
                        value={globalFilter ?? ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="max-w-sm"
                    />
                    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreateModal}>Tambah Pengguna</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editMode ? 'Edit Pengguna' : 'Tambah Pengguna'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    placeholder="Nama Lengkap"
                                    value={form.data.nama_lengkap}
                                    onChange={(e) => form.setData('nama_lengkap', e.target.value)}
                                    required
                                />
                                <Input
                                    placeholder="Username"
                                    value={form.data.username}
                                    onChange={(e) => form.setData('username', e.target.value)}
                                    required
                                />
                                <Select value={form.data.role} onValueChange={(value) => form.setData('role', value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="operator">Operator</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                    </SelectContent>
                                </Select>
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

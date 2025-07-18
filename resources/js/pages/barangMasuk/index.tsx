import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';

interface BarangMasuk {
    id: number;
    tanggal_masuk: string;
    nama_barang: string;
    merk: string;
    jumlah: number;
    kondisi: string;
    ruang: string;
    keterangan: string;
}

export default function BarangMasukPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [filterTanggal, setFilterTanggal] = useState('');

    const [barangMasukList, setBarangMasukList] = useState<BarangMasuk[]>([
        {
            id: 1,
            tanggal_masuk: '2025-05-10',
            nama_barang: 'Laptop',
            merk: 'Asus',
            jumlah: 5,
            kondisi: 'Baik',
            ruang: 'Ruang 1',
            keterangan: 'Baru dibeli',
        },
        {
            id: 2,
            tanggal_masuk: '2025-05-11',
            nama_barang: 'Monitor',
            merk: 'LG',
            jumlah: 3,
            kondisi: 'Baik',
            ruang: 'Ruang 2',
            keterangan: 'Tambahan',
        },
        // Tambahkan maksimal 10 data dummy agar ringan
    ]);

    const form = useForm({
        tanggal_masuk: '',
        nama_barang: '',
        merk: '',
        jumlah: 1,
        kondisi: '',
        ruang: '',
        keterangan: '',
    });

    const openCreateModal = () => {
        form.reset();
        setEditMode(false);
        setModalOpen(true);
    };

    const openEditModal = (barang: BarangMasuk) => {
        form.setData({ ...barang });
        setSelectedId(barang.id);
        setEditMode(true);
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editMode && selectedId !== null) {
            setBarangMasukList((prev) => prev.map((b) => (b.id === selectedId ? { ...b, ...form.data } : b)));
        } else {
            setBarangMasukList((prev) => [...prev, { id: Date.now(), ...form.data }]);
        }
        setModalOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus data ini?')) {
            setBarangMasukList((prev) => prev.filter((b) => b.id !== id));
        }
    };

    const filteredData = filterTanggal ? barangMasukList.filter((b) => b.tanggal_masuk === filterTanggal) : barangMasukList;

    const columns: ColumnDef<BarangMasuk>[] = [
        { id: 'no', header: 'No', cell: ({ row }) => row.index + 1 },
        { accessorKey: 'tanggal_masuk', header: 'Tanggal Masuk' },
        { accessorKey: 'nama_barang', header: 'Nama Barang' },
        { accessorKey: 'merk', header: 'Merk' },
        { accessorKey: 'jumlah', header: 'Jumlah' },
        { accessorKey: 'kondisi', header: 'Kondisi' },
        { accessorKey: 'ruang', header: 'Ruang' },
        { accessorKey: 'keterangan', header: 'Keterangan' },
        {
            id: 'aksi',
            header: 'Opsi',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button size="sm" onClick={() => openEditModal(row.original)}>
                        Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(row.original.id)}>
                        Hapus
                    </Button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Barang Masuk', href: '/barang-masuk' }]}>
            <Head title="Barang Masuk" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between gap-4">
                    <Input type="date" value={filterTanggal} onChange={(e) => setFilterTanggal(e.target.value)} className="max-w-xs" />
                    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreateModal}>Tambah Data</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editMode ? 'Edit Barang Masuk' : 'Tambah Barang Masuk'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <Input
                                    type="date"
                                    value={form.data.tanggal_masuk}
                                    onChange={(e) => form.setData('tanggal_masuk', e.target.value)}
                                    required
                                />
                                <Input
                                    placeholder="Nama Barang"
                                    value={form.data.nama_barang}
                                    onChange={(e) => form.setData('nama_barang', e.target.value)}
                                    required
                                />
                                <Input placeholder="Merk" value={form.data.merk} onChange={(e) => form.setData('merk', e.target.value)} />
                                <Input
                                    type="number"
                                    min={1}
                                    value={form.data.jumlah}
                                    onChange={(e) => form.setData('jumlah', parseInt(e.target.value))}
                                    required
                                />
                                <Input placeholder="Kondisi" value={form.data.kondisi} onChange={(e) => form.setData('kondisi', e.target.value)} />
                                <Input placeholder="Ruang" value={form.data.ruang} onChange={(e) => form.setData('ruang', e.target.value)} />
                                <Input
                                    placeholder="Keterangan"
                                    value={form.data.keterangan}
                                    onChange={(e) => form.setData('keterangan', e.target.value)}
                                />
                                <Button type="submit" disabled={form.processing}>
                                    Simpan
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="overflow-x-auto rounded-md border">
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
                            {table.getRowModel().rows.length === 0 && (
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

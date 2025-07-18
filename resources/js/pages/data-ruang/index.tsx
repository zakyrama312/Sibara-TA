import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

interface Barang {
    id: number;
    nama_barang: string;
    merk: string;
    jumlah_masuk: number;
    kondisi: string;
    kategori: string;
    ruang: string;
    tanggal_masuk: string;
}

// Dummy data
const dummyData: Barang[] = [
    {
        id: 1,
        nama_barang: 'Komputer',
        merk: 'Asus',
        jumlah_masuk: 10,
        kondisi: 'Baik',
        kategori: 'Elektronik',
        ruang: 'Lab Komputer',
        tanggal_masuk: '2025-05-01',
    },
    {
        id: 2,
        nama_barang: 'Meja',
        merk: 'IKEA',
        jumlah_masuk: 5,
        kondisi: 'Cukup',
        kategori: 'Furnitur',
        ruang: 'Ruang Guru',
        tanggal_masuk: '2025-04-20',
    },
    {
        id: 3,
        nama_barang: 'Proyektor',
        merk: 'Epson',
        jumlah_masuk: 2,
        kondisi: 'Rusak',
        kategori: 'Elektronik',
        ruang: 'Ruang Kelas',
        tanggal_masuk: '2025-03-15',
    },
    {
        id: 4,
        nama_barang: 'AC',
        merk: 'Daikin',
        jumlah_masuk: 3,
        kondisi: 'Baik',
        kategori: 'Elektronik',
        ruang: 'Lab Komputer',
        tanggal_masuk: '2025-02-10',
    },
    // Tambahkan lebih banyak dummy sesuai kebutuhan
];

export default function RuangPage() {
    const [selectedRuang, setSelectedRuang] = useState<string>('');

    const filteredData = useMemo(() => {
        return selectedRuang ? dummyData.filter((item) => item.ruang === selectedRuang) : dummyData;
    }, [selectedRuang]);

    const columns: ColumnDef<Barang>[] = [
        { id: 'no', header: 'No', cell: ({ row }) => row.index + 1 },
        { accessorKey: 'nama_barang', header: 'Nama Barang' },
        { accessorKey: 'merk', header: 'Merk' },
        { accessorKey: 'jumlah_masuk', header: 'Jumlah Masuk' },
        { accessorKey: 'kondisi', header: 'Kondisi' },
        { accessorKey: 'kategori', header: 'Kategori' },
        { accessorKey: 'ruang', header: 'Ruang' },
        { accessorKey: 'tanggal_masuk', header: 'Tanggal Masuk' },
    ];

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const ruangOptions = Array.from(new Set(dummyData.map((item) => item.ruang)));

    return (
        <AppLayout breadcrumbs={[{ title: 'Ruang', href: '/ruang' }]}>
            <Head title="Data Ruang" />
            <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <select
                            value={selectedRuang}
                            onChange={(e) => setSelectedRuang(e.target.value)}
                            className="rounded-md border px-3 py-2 text-sm"
                        >
                            <option value="">Semua Ruang</option>
                            {ruangOptions.map((ruang) => (
                                <option key={ruang} value={ruang}>
                                    {ruang}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button onClick={() => window.print()}>Print</Button>
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
                                        Tidak ada data untuk ruang ini.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}

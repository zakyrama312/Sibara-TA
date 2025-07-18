import PeminjamanChart from '@/components/dashboard/peminjamanChart';
import { Calendar } from '@/components/ui/calendar';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative col-span-2 min-h-[300px] flex-1 overflow-hidden rounded-xl border p-2 md:min-h-min">
                        <PeminjamanChart />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[300px] flex-1 overflow-hidden rounded-xl border p-2">
                        <Calendar mode="single" selected={date} onSelect={setDate} className="w-full" captionLayout="dropdown" />
                    </div>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative min-h-[300px] overflow-hidden rounded-xl border border-gray-300 bg-[#d5d2f5] p-4 shadow-sm dark:border-gray-600">
                        <div className="flex items-start justify-between text-sm font-medium text-gray-600">
                            <span>Total Barang</span>
                            <span className="rounded-full px-2 py-0.5 text-xs text-black">
                                <SquareArrowOutUpRight />
                            </span>
                        </div>
                        <div className="mt-2 text-3xl font-semibold text-black">20 Barang</div>
                        <div className="mt-4 space-y-2">
                            <button className="flex w-full items-center justify-between rounded-lg bg-[#bfbaf7] px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300">
                                Baik
                                <span>17</span>
                            </button>
                            <button className="flex w-full items-center justify-between rounded-lg bg-[#bfbaf7] px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300">
                                Kurang Baik
                                <span>2</span>
                            </button>
                            <button className="flex w-full items-center justify-between rounded-lg bg-[#bfbaf7] px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300">
                                Rusak
                                <span>1</span>
                            </button>
                        </div>
                    </div>

                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[300px] overflow-hidden rounded-xl border">
                        <div className="relative min-h-[300px] overflow-hidden rounded-xl border border-gray-300 bg-[#7bdcff] p-4 shadow-sm dark:border-gray-600">
                            <div className="flex items-start justify-between text-sm font-medium text-gray-600">
                                <span>Total Peminjam Aktif</span>
                                <span className="rounded-full px-2 py-0.5 text-xs text-black">
                                    <SquareArrowOutUpRight />
                                </span>
                            </div>
                            <div className="mt-2 text-3xl font-semibold text-black">120 Peminjam</div>
                            <div className="mt-4 space-y-2">
                                <button className="flex w-full items-center justify-between rounded-lg bg-[#59d1fd] px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300">
                                    XII PPLG 1<span>50</span>
                                </button>
                                <button className="flex w-full items-center justify-between rounded-lg bg-[#59d1fd] px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300">
                                    XI PPLG 2<span>60</span>
                                </button>
                                <button className="flex w-full items-center justify-between rounded-lg bg-[#59d1fd] px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300">
                                    X PPLG 1<span>40</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[300px] overflow-hidden rounded-xl border">
                        <div className="relative min-h-[300px] overflow-hidden rounded-xl border bg-[#ffe66b] p-4 shadow-sm dark:border-gray-600">
                            <div className="flex items-start justify-between text-sm font-medium text-gray-600">
                                <span>Total Jurusan</span>
                                <span className="rounded-full px-2 py-0.5 text-xs text-black">
                                    <SquareArrowOutUpRight />
                                </span>
                            </div>
                            <div className="mt-2 text-3xl font-semibold text-black">6 Jurusan</div>
                            <div className="custom-scroll mt-4 max-h-40 space-y-2 overflow-y-auto pr-1 pb-5">
                                <button className="flex w-full items-center justify-between rounded-lg bg-[#fbd92d] px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300">
                                    Pengembangan Perangkat Lunak dan GIM<span>4 Ruang</span>
                                </button>
                                <button className="flex w-full items-center justify-between rounded-lg bg-[#fbd92d] px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300">
                                    Broadcasting Perfilman<span>5 Ruang</span>
                                </button>
                                <button className="flex w-full items-center justify-between rounded-lg bg-[#fbd92d] px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300">
                                    Teknik Jaringan Komputer dan Telekomunikasi<span>4 Ruang</span>
                                </button>
                                <button className="flex w-full items-center justify-between rounded-lg bg-[#fbd92d] px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300">
                                    Manajemen Perkantoran dan Layanan Bisnis <span>4 Ruang</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

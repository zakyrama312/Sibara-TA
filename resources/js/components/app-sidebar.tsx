import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    Blocks,
    Building,
    Building2,
    ChartBarStacked,
    Dock,
    LayoutGrid,
    Package,
    PanelBottomCloseIcon,
    SquareActivity,
    UserRound,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItemsBeranda: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    // {
    //     title: 'Data Ruang',
    //     icon: Building2,
    //     children: [
    //         {
    //             title: 'Lab RPL',
    //             href: '/ruang/1',
    //         },
    //         {
    //             title: 'Lab ICT',
    //             href: '/ruang/2',
    //         },
    //     ],
    // },
];
const mainNavItemsData: NavItem[] = [
    {
        title: 'Data Ruang',
        href: '/data-ruang',
        icon: Building2,
    },
    {
        title: 'Barang Masuk',
        href: '/barang-masuk',
        icon: Package,
    },
    {
        title: 'Peminjaman Barang',
        href: '/peminjaman-barang',
        icon: Dock,
    },
    {
        title: 'Permintaan Barang',
        href: '/permintaan-barang',
        icon: PanelBottomCloseIcon,
    },
];

const mainNavItemsMenu: NavItem[] = [
    {
        title: 'Pengguna',
        href: '/pengguna',
        icon: UserRound,
    },
    {
        title: 'Prodi',
        href: '/prodi',
        icon: Blocks,
    },
    {
        title: 'Ruang',
        href: '/ruang',
        icon: Building,
    },
    {
        title: 'Kondisi',
        href: '/kondisi',
        icon: SquareActivity,
    },
    {
        title: 'Kategori',
        href: '/kategori',
        icon: ChartBarStacked,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain label="Beranda" items={mainNavItemsBeranda} />
                <NavMain label="Menu" items={mainNavItemsMenu} />
                <NavMain label="Manajemen Data" items={mainNavItemsData} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

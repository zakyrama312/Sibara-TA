import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
export function NavMain({ items = [], label = '' }: { items: NavItem[]; label?: string }) {
    const page = usePage();
    const [openDropdown, setOpenDropDown] = useState<string | null>(null);
    return (
        <SidebarGroup className="px-2 py-0">
            {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
            <SidebarMenu>
                {items.map((item) => {
                    const isDropdown = item.children && item.children.length > 0;
                    const isOpen = openDropdown === item.title;

                    return (
                        <div key={item.title}>
                            <SidebarMenuItem>
                                {isDropdown ? (
                                    <SidebarMenuButton asChild onClick={() => setOpenDropDown(isOpen ? null : item.title)}>
                                        <button className="flex w-full items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                {item.icon && <item.icon className="h-4 w-4" />}
                                                {item.title}
                                            </span>
                                            <span className="text-xs">{isOpen ? '▾' : '▸'}</span>
                                        </button>
                                    </SidebarMenuButton>
                                ) : (
                                    <SidebarMenuButton asChild isActive={item.href === page.url} tooltip={{ children: item.title }}>
                                        <Link href={item.href!}>
                                            {item.icon && <item.icon className="h-4 w-4" />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                )}
                            </SidebarMenuItem>

                            {/* Submenu */}
                            {isDropdown && isOpen && (
                                <div className="ml-4">
                                    {item.children?.map((child) => (
                                        <SidebarMenuItem key={child.title}>
                                            <SidebarMenuButton asChild isActive={child.href === page.url} tooltip={{ children: child.title }}>
                                                <Link href={child.href!}>
                                                    {child.icon && <child.icon className="h-4 w-4" />}
                                                    <span>{child.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}

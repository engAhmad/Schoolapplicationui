"use client";

import * as React from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal, Search } from "lucide-react";

import { cn } from "@/app/components/ui/utils";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/app/components/ui/pagination";

export interface Column<T> {
    key: keyof T;
    title: string;
    sortable?: boolean;
    render?: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    searchKey?: keyof T;
    pageSize?: number;
    className?: string;
    onRowClick?: (item: T) => void;
    enableSelection?: boolean;
    onSelectionChange?: (selectedItems: T[]) => void;
}

export function DataTable<T extends { id?: string | number }>({
    data,
    columns,
    searchKey,
    pageSize = 10,
    className,
    onRowClick,
    enableSelection = false,
    onSelectionChange,
}: DataTableProps<T>) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedRows, setSelectedRows] = React.useState<Set<string | number>>(new Set());
    const [sortConfig, setSortConfig] = React.useState<{
        key: keyof T;
        direction: "asc" | "desc";
    } | null>(null);

    // Initial Selection Sync
    React.useEffect(() => {
        if (onSelectionChange) {
            const selectedItems = data.filter(item => item.id && selectedRows.has(item.id));
            onSelectionChange(selectedItems);
        }
    }, [selectedRows, data, onSelectionChange]);

    // Filter
    const filteredData = React.useMemo(() => {
        if (!searchKey || !searchTerm) return data;
        return data.filter((item) => {
            const value = item[searchKey];
            return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [data, searchKey, searchTerm]);

    // Sort
    const sortedData = React.useMemo(() => {
        if (!sortConfig) return filteredData;
        return [...filteredData].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
    }, [filteredData, sortConfig]);

    // Paginate
    const totalPages = Math.ceil(sortedData.length / pageSize);
    const currentData = sortedData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleSort = (key: keyof T) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const toggleAll = (checked: boolean) => {
        if (checked) {
            const newSelected = new Set(currentData.map(item => item.id!).filter(Boolean));
            setSelectedRows(newSelected);
        } else {
            setSelectedRows(new Set());
        }
    };

    const toggleRow = (id: string | number) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedRows(newSelected);
    };

    return (
        <div className={cn("space-y-4", className)} dir="rtl">
            {searchKey && (
                <div className="flex items-center justify-between gap-4">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="بحث..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset to first page on search
                            }}
                            className="pr-9"
                        />
                    </div>
                    {enableSelection && selectedRows.size > 0 && (
                        <div className="text-sm text-muted-foreground">
                            تم تحديد {selectedRows.size} عنصر
                        </div>
                    )}
                </div>
            )}

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {enableSelection && (
                                <TableHead className="w-[40px] text-right">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => toggleAll(e.target.checked)}
                                        checked={currentData.length > 0 && currentData.every(item => item.id && selectedRows.has(item.id))}
                                    />
                                </TableHead>
                            )}
                            {columns.map((column) => (
                                <TableHead key={String(column.key)} className="text-right">
                                    {column.sortable ? (
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleSort(column.key)}
                                            className="-mr-3 h-8 data-[state=open]:bg-accent"
                                        >
                                            <span>{column.title}</span>
                                            {sortConfig?.key === column.key ? (
                                                sortConfig.direction === "asc" ? (
                                                    <ArrowUp className="mr-2 h-4 w-4" />
                                                ) : (
                                                    <ArrowDown className="mr-2 h-4 w-4" />
                                                )
                                            ) : (
                                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                            )}
                                        </Button>
                                    ) : (
                                        column.title
                                    )}
                                </TableHead>
                            ))}
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentData.length > 0 ? (
                            currentData.map((item, i) => (
                                <TableRow
                                    key={item.id || i}
                                    className={cn("cursor-pointer", onRowClick && "hover:bg-muted/50", item.id && selectedRows.has(item.id) && "bg-muted/50")}
                                    onClick={() => onRowClick?.(item)}
                                >
                                    {enableSelection && (
                                        <TableCell className="text-right">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                                checked={!!item.id && selectedRows.has(item.id)}
                                                onChange={() => item.id && toggleRow(item.id)}
                                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                            />
                                        </TableCell>
                                    )}
                                    {columns.map((column) => (
                                        <TableCell key={String(column.key)}>
                                            {column.render ? column.render(item) : (item[column.key] as React.ReactNode)}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>عرض التفاصيل</DropdownMenuItem>
                                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>تعديل</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600" onClick={(e) => e.stopPropagation()}>حذف</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (enableSelection ? 2 : 1)}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className="cursor-pointer"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    className="cursor-pointer"
                                    isActive={page === currentPage}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                className="cursor-pointer"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}

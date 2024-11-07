import React, {useRef} from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TableSortLabel
} from "@mui/material";
import {visuallyHidden} from '@mui/utils';

type Order = 'asc' | 'desc';

export interface HeadCell<T> {
    id: keyof T;
    label: string;
    numeric: boolean;
}

interface EnhancedTableProps<T> {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
    order: Order;
    orderBy: keyof T;
    headCells: HeadCell<T>[];
}

function EnhancedTableHead<T>(props: EnhancedTableProps<T>) {
    const {order, orderBy, onRequestSort, headCells} = props;
    const createSortHandler = (property: keyof T) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={String(headCell.id)}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding='normal'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface UniversalTableProps<T> {
    data: T[];
    headCells: HeadCell<T>[];
    comparator: (a: T, b: T, orderBy: keyof T) => number;
    formatCellData: (columnId: keyof T, data: T[keyof T]) => React.ReactNode;
    updateFormRef: React.RefObject<{ handleClickOpen: (id: number) => void }>;
}

const UniversalTable = <T extends { id: number }>({
                                                      data,
                                                      headCells,
                                                      comparator,
                                                      formatCellData,
                                                      updateFormRef,
                                                  }: UniversalTableProps<T>) => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof T>(headCells[0].id);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof T,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedData = [...data].sort((a, b) => {
        return order === 'desc'
            ? comparator(a, b, orderBy)
            : -comparator(a, b, orderBy);
    });

    const visibleRows = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleUpdateItem = (id: number) => {
        if (updateFormRef.current) {
            updateFormRef.current.handleClickOpen(id);
        }
    };

    return (
        <Box>
            <TableContainer>
                <Table aria-labelledby="tableTitle" size='medium'>
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        headCells={headCells}
                    />
                    <TableBody>
                        {visibleRows.map((row) => (
                            <TableRow hover key={row.id} onDoubleClick={() => handleUpdateItem(row.id)}>
                                {headCells.map((column) => (
                                    <TableCell key={String(column.id)} align={column.numeric ? 'right' : 'left'}>
                                        {formatCellData(column.id, row[column.id])}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows,
                                }}
                            >
                                <TableCell colSpan={headCells.length}/>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};


export default UniversalTable;
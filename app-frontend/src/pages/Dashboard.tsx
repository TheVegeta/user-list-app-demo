import { rankItem } from "@tanstack/match-sorter-utils";
import {
  ColumnFiltersState,
  FilterFn,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import moment from "moment";
import { FC, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { DebouncedInput } from "../component/Forms";
import { User, useGetAllUserQuery } from "../generated/graphql";
import { useAppState } from "../store";
import { Navbar, Table, TableFooter } from "../styles";

const AppNavbar = () => {
  const { username, removeAuth } = useAppState();

  const { push } = useHistory();

  const handleLogout = () => {
    removeAuth();
    push("/login");
  };

  return (
    <Navbar>
      <div>
        <h4>Users</h4>
      </div>
      <div>
        <p>{username} | admin</p>
        <a href="#" onClick={handleLogout}>
          Logout
        </a>
      </div>
    </Navbar>
  );
};

const columnHelper = createColumnHelper<User>();

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({ itemRank });

  return itemRank.passed;
};

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    size: 0,
    enableColumnFilter: true,
    enableGlobalFilter: true,
  }),
  columnHelper.accessor("username", {
    cell: (info) => info.getValue(),
    filterFn: fuzzyFilter,
    enableColumnFilter: true,
    enableGlobalFilter: true,
  }),
  columnHelper.accessor("mobile", {
    cell: (info) => info.getValue(),
    filterFn: fuzzyFilter,
    enableColumnFilter: true,
    enableGlobalFilter: true,
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
    filterFn: fuzzyFilter,
    enableColumnFilter: true,
    enableGlobalFilter: true,
  }),
  columnHelper.accessor("age", {
    cell: (info) => info.getValue(),
    filterFn: fuzzyFilter,
    enableColumnFilter: true,
    enableGlobalFilter: true,
  }),
  columnHelper.accessor("registerDate", {
    cell: (info) => moment(info.getValue()).format("DD/MM/YYYY"),
  }),
];

const RenderTable: FC<{ getAllUser: User[] }> = ({ getAllUser }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: getAllUser,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: { sorting, globalFilter },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <DebouncedInput
        value={globalFilter ?? ""}
        onChange={(value) => setGlobalFilter(String(value))}
        placeholder="Search all columns..."
      />
      <Table>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: (
                          <>
                            {" "}
                            <i className="bi bi-sort-alpha-up"></i>
                          </>
                        ),
                        desc: (
                          <>
                            {" "}
                            <i className="bi bi-sort-alpha-down"></i>
                          </>
                        ),
                      }[header.column.getIsSorted() as string] ?? (
                        <>
                          {" "}
                          <i className="bi bi-funnel-fill"></i>
                        </>
                      )}
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        ))}

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <TableFooter>
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>

        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>

        <span>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </TableFooter>
    </>
  );
};

const Dashboard = () => {
  const { data } = useGetAllUserQuery();

  const memoData = useMemo(() => data, [data]);

  return (
    <div style={{ margin: "1rem" }}>
      <AppNavbar />

      {memoData &&
        memoData.getAllUser &&
        Array.isArray(memoData.getAllUser) && (
          <RenderTable
            getAllUser={memoData?.getAllUser.map((item, index) => ({
              ...item,
              id: (index + 1).toString().trim(),
            }))}
          />
        )}
    </div>
  );
};

export default Dashboard;

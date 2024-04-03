import { ChangeEvent, useState } from "react";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Search,
  MoreHorizontal,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { attendees } from "../data/attendees";
import { IconButton } from "./icon-button";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function AttendeeList() {
  const totalPages = Math.ceil(attendees.length / 10);

  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [page, setPage] = useState(1);

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function goToNextPage() {
    setPage(page + 1);
  }

  function goToPreviousPage() {
    setPage(page - 1);
  }

  function goToFirstPage() {
    setPage(1);
  }

  function goToLastPage() {
    setPage(totalPages);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>

        <div
          className={`px-3 w-72 py-1.5 border rounded-lg flex items-center gap-3 ${
            searchFocus ? "border-lime-500" : "border-white/10"
          }`}
        >
          <Search className="size-4 text-lime-300" />
          <input
            onChange={onSearchInputChanged}
            className="bg-transparent flex-1 outline-none outline-0 border-0 p-0 text-sm focus:ring-transparent"
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            placeholder="Buscar participante..."
          />
        </div>

        {search}
      </div>

      {/* Não da pra colocar borda arredondada em tabela, então colocamos a tabela numa div e o arredondamento na div */}
      <Table className="w-dvh">
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="size-4 bg-transparent hover:bg-zinc-800 duration-200 rounded border border-zinc-600 focus-visible:outline-none checked:text-lime-600 checked:hover:text-lime-500 focus:ring-0 focus:ring-offset-0 enabled:text-lime-600"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader className="w-[64px]"></TableHeader>
          </tr>
        </thead>

        <tbody>
          {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
            return (
              <tr
                key={attendee.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <TableCell>
                  <input
                    type="checkbox"
                    className="size-4 bg-transparent hover:bg-zinc-800 duration-200 checked:hover:text-lime-500 rounded border border-zinc-600 focus-visible:outline-none checked:text-lime-600 focus:ring-0 focus:ring-offset-0 enabled:text-lime-600"
                  />
                </TableCell>
                <TableCell>{attendee.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {attendee.name}
                    </span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
                <TableCell>
                  <button className="bg-lime-700 hover:bg-lime-600 duration-200 border border-white/10 rounded-md p-1.5">
                    <MoreHorizontal className="size-4" />
                  </button>
                </TableCell>
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr className="max-[425px]:flex max-[425px]:flex-col-reverse">
            <TableCell colSpan={3} className="max-[425px]:hidden">
              Mostrando 10 de {attendees.length} itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8 max-[425px]:flex-col-reverse max-[425px]:gap-4">
                <span>
                  Página {page} de {totalPages}
                </span>

                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>

                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

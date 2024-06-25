import type { Header } from "@tanstack/react-table";

type DataTableResizerProps<TData> = {
  header: Header<TData, unknown>;
};

export const DataTableResizer = <TData,>({
  header,
}: DataTableResizerProps<TData>) => {
  if (header.column.getCanResize() === false) return <></>;

  return (
    <div
      {...{
        onMouseDown: header.getResizeHandler(),
        onTouchStart: header.getResizeHandler(),
        className: `absolute top-0 right-[-1px] cursor-col-resize w-px h-full bg-[#473e57] hover:bg-primary hover:right-[-4px] hover:w-2`,
        style: {
          userSelect: "none",
          touchAction: "none",
        },
      }}
    />
  );
};

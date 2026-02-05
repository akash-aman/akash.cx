import React from "react";

export const Table = ({
    children,
    ...props
}: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8 border border-(--border-color) rounded-lg">
        <table className="w-full text-left border-collapse" {...props}>
            {children}
        </table>
    </div>
);

export const Thead = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-(--card-bg)" {...props}>
        {children}
    </thead>
);

export const Tbody = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props}>{children}</tbody>
);

export const Tr = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-(--border-color) last:border-b-0" {...props}>
        {children}
    </tr>
);

export const Th = ({
    children,
    ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="para-lg text-center font-bold p-4 border-r border-(--border-color) last:border-r-0" {...props}>
        {children}
    </th>
);

export const Td = ({
    children,
    ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="para-md p-4 border-r border-(--border-color) last:border-r-0" {...props}>
        {children}
    </td>
);

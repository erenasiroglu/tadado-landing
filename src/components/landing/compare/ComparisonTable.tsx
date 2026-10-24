import Image from "next/image";

import { ComparisonCell } from "./ComparisonCell";

interface ComparisonTableProps {
  rows: { feature: string; tadado: string; other: string }[];
  featureLabel: string;
  tadadoLabel: string;
  otherLabel: string;
  labels: { yes: string; no: string; partial: string; varies: string };
}

/** Feature-by-feature table with the Tadado column carried on a tinted band. */
export function ComparisonTable({
  rows,
  featureLabel,
  tadadoLabel,
  otherLabel,
  labels,
}: ComparisonTableProps) {
  return (
    <div className="overflow-hidden rounded-lg surface-paper">
      <table className="w-full table-fixed border-collapse text-start">
        <colgroup>
          <col />
          <col className="w-[28%] sm:w-[26%]" />
          <col className="w-[28%] sm:w-[26%]" />
        </colgroup>
        <thead>
          <tr>
            <th
              scope="col"
              className="px-4 pt-5 pb-4 text-start text-[0.6875rem] font-bold tracking-[0.08em] text-muted-foreground uppercase sm:px-7"
            >
              {featureLabel}
            </th>
            <th scope="col" className="bg-lilac/60 px-2 pt-5 pb-4 sm:px-4">
              <span className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
                <Image
                  src="/images/tadado_icon.png"
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 rounded-[0.5rem] ring-1 ring-ink/10"
                />
                <span className="text-sm font-extrabold tracking-tight text-foreground">
                  {tadadoLabel}
                </span>
              </span>
            </th>
            <th scope="col" className="px-2 pt-5 pb-4 sm:px-4">
              <span className="block text-center text-sm leading-tight font-extrabold tracking-tight text-muted-foreground">
                {otherLabel}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-t border-border">
              <th
                scope="row"
                className="px-4 py-4 text-start text-sm leading-snug font-semibold text-foreground sm:px-7 sm:text-[0.9375rem]"
              >
                {row.feature}
              </th>
              <td className="bg-lilac/60 px-2 py-4 text-center sm:px-4">
                <ComparisonCell value={row.tadado} labels={labels} emphasis />
              </td>
              <td className="px-2 py-4 text-center sm:px-4">
                <ComparisonCell value={row.other} labels={labels} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

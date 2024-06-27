"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function BreadcrumbNavigation() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  // TODO: Make breadcrumb responsive

  return (
    <div className="flex items-center gap-2 bg-[#202026] px-5 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          {pathSegments.map((segment, index) => {
            if (index === pathSegments.length - 1) {
              return (
                <BreadcrumbItem key={segment}>
                  <BreadcrumbPage className="capitalize">
                    {segment.split("-").join(" ")}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              );
            }

            return (
              <Fragment key={segment}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="capitalize"
                    href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                  >
                    {segment.split("-").join(" ")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

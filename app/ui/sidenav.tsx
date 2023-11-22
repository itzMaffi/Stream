"use client";
import NavLinks from "./nav-links";
import Link from "next/link";
import {
  IRecentThought,
  RecentThoughtService,
} from "./services/recent-service";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Sidenav() {
  const recentThoughtService = new RecentThoughtService();

  const [recentThoughts, setRecentThoughts] = useState<IRecentThought[]>([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    setRecentThoughts((prev) => recentThoughtService.read());
  }, [searchParams]);

  return (
    <div className="md:w-48 md:h-full p-4 flex flex-col gap-2">
      <div className="md:h-40 p-4 rounded-2xl bg-dawn-pattern flex">
        <h1 className="text-white self-end text-4xl leading font-semibold">
          stream
        </h1>
      </div>

      <div className="flex gap-2 md:flex-col flex-row">
        <NavLinks />
      </div>

      <div className="hidden md:flex flex-col list-none ">
        <div className={`md:block grow rounded-2xl bg-stream-50`}>
          <div className="p-4 text-center font-bold ">Recent</div>

          <ul>
            {recentThoughts.map((t) => {
              return (
                <li className="mb-3 bg-stream-100 pt-1 pd-1 text-gray-600">
                  <Link href={`/history/${t.id}/visit`}>{t.digest}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Spinner } from "@nextui-org/react";
import Error from "next/error";

export default function NotFoundPage() {
  return <Error statusCode={404} />;
}

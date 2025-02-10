"use client";

import { Button, ButtonGroup, EmptyState, VStack } from "@chakra-ui/react";
import { Layers2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className=" fixed w-full h-full flex justify-center items-center">
      <EmptyState.Root size="lg">
        <EmptyState.Content>
          <EmptyState.Indicator>
            <Layers2 />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>NOT FOUND 404</EmptyState.Title>
          </VStack>
          <ButtonGroup>
            <Button
              onClick={() => router.push("/")}
              className="inline-flex shrink-0 justify-center items-center border select-none rounded-md px-[15px] hover:opacity-75 active:scale-95 transition-all duration-200 ease-in-out"
            >
              HOME
            </Button>
          </ButtonGroup>
        </EmptyState.Content>
      </EmptyState.Root>
    </div>
  );
}

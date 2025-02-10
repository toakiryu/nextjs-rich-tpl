"use client";

import { Button, ButtonGroup, EmptyState, VStack } from "@chakra-ui/react";
import { OctagonAlert } from "lucide-react";

export default function Error({ error, reset }: { error: any; reset: any }) {
  console.log(error);

  return (
    <div className=" fixed w-full h-full flex justify-center items-center">
      <EmptyState.Root size="lg">
        <EmptyState.Content>
          <EmptyState.Indicator>
            <OctagonAlert />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>ERROR 500</EmptyState.Title>
            <EmptyState.Description>{error}</EmptyState.Description>
          </VStack>
          <ButtonGroup>
            <Button
              variant="outline"
              onClick={reset}
              className="inline-flex shrink-0 justify-center items-center border select-none rounded-md px-[15px] hover:opacity-75 active:scale-95 transition-all duration-200 ease-in-out"
            >
              Retry
            </Button>
          </ButtonGroup>
        </EmptyState.Content>
      </EmptyState.Root>
    </div>
  );
}

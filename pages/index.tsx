import { MainMenu, getNonDeletedElements } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import {
  AppState,
  BinaryFiles,
  Gesture,
  PointerDownState,
  UIAppState,
} from "@excalidraw/excalidraw/types/types";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);
export default function App() {
  const [elements, setElements] = useState<readonly ExcalidrawElement[]>([]);
  const [appState, setAppState] = useState<AppState | any>({});
  return (
    <div
      className="  w-screen h-screen bg-white"
      onClick={() => {
        console.log(getNonDeletedElements(elements));
        console.log(appState, "appState");
      }}
    >
      <Excalidraw
        renderTopRightUI={(isMobile: boolean, appState: UIAppState) => (
          <>
            <button
              onClick={() => {
                console.log(appState, "appState");
              }}
            >
              ASDSA
            </button>
          </>
        )}
        onChange={(
          elements: readonly ExcalidrawElement[],
          appState: AppState,
          files: BinaryFiles
        ) => {
          setElements(elements);
          setAppState(appState);
        }}
        onPointerDown={(
          activeTool: AppState["activeTool"],
          pointerDownState: PointerDownState
        ) => {
          console.log(activeTool, pointerDownState);
        }}
        // onPointerUpdate={(payload: {
        //   pointer: {
        //     x: number;
        //     y: number;
        //     tool: "pointer" | "laser";
        //   };
        //   button: "down" | "up";
        //   pointersMap: Gesture["pointers"];
        // }) => {
        //   console.log(payload, "payload");
        // }}
      >
        <MainMenu>
          <MainMenu.ItemLink href="https://google.com">
            Google
          </MainMenu.ItemLink>
          <MainMenu.ItemLink href="https://excalidraw.com">
            Excalidraw
          </MainMenu.ItemLink>

          <MainMenu.Item
            onSelect={(e) => {
              console.log(e, "e");
            }}
          >
            <div>test</div>
            <div>test</div>
            <div>test</div>
          </MainMenu.Item>
          <MainMenu.Group title="Icons">
            <div className="flex flex-col">
              <span>icon1</span>
              <span>icon2</span>
            </div>
          </MainMenu.Group>
        </MainMenu>
      </Excalidraw>
      ;
    </div>
  );
}

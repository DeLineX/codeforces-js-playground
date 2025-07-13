import { create } from "zustand";
import { persist } from "zustand/middleware";
import code from "../config/initial-code.json";
import type { Test } from "../types";
import { nanoid } from "nanoid";

interface AppState {
  code: string;
  activeTestId: string;
  tests: Test[];

  changeCode: (code: string) => void;
  addTest: () => void;
  deleteTest: (deleteId: Test["id"]) => void;
  resetTests: () => void;
  selectTest: (testId: Test["id"]) => void;
}

const createTest = (): Test => ({ id: nanoid(), input: "" });

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => {
      const initialTest = createTest();

      return {
        code,
        activeTestId: initialTest.id,
        tests: [initialTest],

        changeCode: (code) => set({ code }),

        addTest: () => {
          const test = createTest();
          set((state) => ({
            tests: [...state.tests, test],
            activeTestId: test.id,
          }));
        },

        deleteTest: (deleteId) => {
          const { tests } = get();

          const deleteIndex = tests.findIndex((test) => test.id === deleteId);

          if (deleteIndex === -1) return;

          let { activeTestId } = get();
          if (tests[deleteIndex].id === activeTestId) {
            activeTestId = tests[deleteIndex === 0 ? 1 : deleteIndex - 1].id;
          }

          set({
            tests: tests.filter((test) => test.id !== deleteId),
            activeTestId,
          });
        },

        resetTests: () => {
          const newTest = createTest();
          set({ tests: [newTest], activeTestId: newTest.id });
        },

        selectTest: (activeTestId) => set({ activeTestId }),
      };
    },
    {
      name: "app-storage",
    }
  )
);

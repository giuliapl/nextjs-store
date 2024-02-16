"use client";
import { Snackbar } from "@mui/material";
import { createContext, useState } from "react";

interface SnackbarContextData {
  state: boolean;
  setState: (val: boolean) => void;
}

export const SnackbarContenxt = createContext<SnackbarContextData | null>(null);

interface SnackbarContextProviderProps {
  children: JSX.Element[];
}
function SnackbarContextProvider(props: SnackbarContextProviderProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <SnackbarContenxt.Provider
      value={{
        state: open,
        setState: setOpen,
      }}
    >
      {props.children}
      <Snackbar
        autoHideDuration={1000}
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        color={"success"}
        onClose={() => {
          setOpen(false);
        }}
        message="Success"
      />
    </SnackbarContenxt.Provider>
  );
}
export default SnackbarContextProvider;

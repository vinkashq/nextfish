"use client";
import { createContext, useState, useContext, ReactNode } from "react";

const BreadcrumbContext = createContext({
  heading: "",
  // eslint-disable-next-line no-unused-vars
  setHeading: (heading: string) => {},
});

export const useBreadcrumb = () => useContext(BreadcrumbContext);

export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
  const [heading, setHeading] = useState("");
  return (
    <BreadcrumbContext.Provider value={{ heading, setHeading }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

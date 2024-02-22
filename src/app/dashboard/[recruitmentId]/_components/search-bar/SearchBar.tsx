"use client";

import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import ClearInput from "~/ui/clear-input/ClearInput";

export default function SearchBar() {
  return (
    <ClearInput name="searchBar" placeholder="Search" Icon={RiSearch2Line} />
  );
}

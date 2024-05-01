"use client";

import { useState } from "react";

interface Props {
  probability: number;
}

export function TargetSchoolsProbability({ probability }: Props) {
  return <div className="border border-[blue] w-[50px] h-[50px] flex items-center justify-center">{probability * 100}%</div>;
}

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

type SettingsCardProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

const SettingsCard = ({ children, title, description }: SettingsCardProps) => {
  return (
    <Card className="border border-slate-100 shadow-sm rounded-3xl overflow-hidden bg-white">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-5">
        {title && description && (
          <>
            <CardTitle className="text-xl text-slate-800">{title}</CardTitle>
            <CardDescription className="text-slate-500">{description}</CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent className="px-6 py-6">
        {children}
      </CardContent>
    </Card>
  );
};

export default SettingsCard;

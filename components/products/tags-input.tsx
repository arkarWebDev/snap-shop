import React, { Dispatch, forwardRef, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { X } from "lucide-react";

type TagsInputProps = {
  value: string[];
  handleOnChange: Dispatch<SetStateAction<string[]>>;
};
const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
  ({ value, handleOnChange, ...props }) => {
    const [tagData, setTagData] = useState("");

    const addNewTag = () => {
      if (tagData) {
        const newTagsData = new Set([...value, tagData]);
        handleOnChange(Array.from(newTagsData));
        setTagData("");
      }
    };
    return (
      <div>
        <Input
          placeholder="Enter to save"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addNewTag();
            }
          }}
          value={tagData}
          {...props}
          onChange={(e) => setTagData(e.target.value)}
        />

        <div className="flex gap-1 my-2">
          {value.map((tag, index) => (
            <div
              key={index}
              className="border-gray-400 border-2 p-1 rounded-md text-xs font-semibold flex items-center gap-1"
            >
              <span>{tag}</span>
              <X
                className="w-4 h-4 cursor-pointer"
                onClick={() =>
                  handleOnChange(value.filter((_, i) => i !== index))
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default TagsInput;

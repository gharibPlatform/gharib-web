import { useState, useRef, useEffect } from "react";
import CreateDMListingBrothers from "../create dm/CreateDMListingBrothers";
import CreateDMConfirmation from "./settings/GroupSettings";
import Instagram from "@/components/common/iconButtons/Instagram";
import Facebook from "@/components/common/iconButtons/Facebook";
import Messanger from "@/components/common/iconButtons/Messanger";
import Pinterest from "@/components/common/iconButtons/Pinterest";
import Copy from "@/components/common/iconButtons/Copy";
import Tooltip from "@/components/common/tooltip/Tooltip";
import {
  generateGroupCode,
  getGroupCodeInfo,
  patchGroupCodeInfo,
  updateGroupCodeInfo,
  deleteGroupCodeInfo,
} from "@/utils/apiGroup";
export default function ShareGroup() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
  const [text, setText] = useState("KOJSXBCP9CS2");
  const [copied, setCopied] = useState(false); // State to show "Copied" message

  const toggleUser = (brother) => {
    setSelectedUsers((prev) =>
      prev.includes(brother)
        ? prev.filter((name) => name !== brother)
        : [...prev, brother],
    );
    setSearchQuery("");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedUsers]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="max-h-[400px] pb-4 bg-[var(--main-color)] pt-4 px-4 rounded-sm border border-[var(--g-color)] flex flex-col">
      <div className="flex-col gap-3">
        <h2 className="py-4 text-[var(--w-color)] text-lg px-4">
          Share your group in{" "}
        </h2>
        <div className="px-4 flex gap-4">
          <Instagram height={"75"} width={"75"} />
          <Facebook height={"75"} width={"75"} />
          <Messanger height={"75"} width={"75"} />
          <Pinterest height={"75"} width={"75"} />
        </div>
      </div>

      <div className="flex items-center gap-8 w-full pt-4">
        <div
          style={{ height: "1px" }}
          className="w-1/2 bg-[var(--main-color-hover)]"
        ></div>
        <p className="text-[var(--w-color)] text-xl">Or</p>
        <div
          style={{ height: "1px" }}
          className="w-1/2 bg-[var(--main-color-hover)]"
        ></div>
      </div>

      <div className="flex items-center justify-center gap-6 pt-4">
        <h2 className="text-[var(--w-color)] text-lg">Share code</h2>
        <div className="gap-2 flex items-center justify-center bg-[var(--dark-color)] p-4 text-[var(--g-color)] rounded-md relative">
          {text}
          <Tooltip text="Copy" top={-30} right={-15}>
            <div onClick={copyToClipboard} className="cursor-pointer">
              <Copy height={"30"} width={"30"} color={"#585858"} />
            </div>
          </Tooltip>
          {copied && (
            <span className="text-[var(--w-color)] absolute top-12 right-0 bg-[var(--darker-color)] p-1 px-2 rounded-md">
              Copied!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

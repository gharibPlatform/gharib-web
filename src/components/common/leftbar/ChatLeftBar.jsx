import { useWidth } from "@/components/context/WidthContext";

export default function ChatLeftBar() {
    const { width } = useWidth();
    return(
        <div style={{width}} class=" border-l border-[var(--g-color)] bg-[var(--main-color)] h-screen"></div>
    )
}

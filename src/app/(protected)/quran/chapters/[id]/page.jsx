import { redirect } from "next/navigation";

export default function Page({ params }) {
  const { id } = params;
  redirect(`/quran/chapters/${id}/1`);
}

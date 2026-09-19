import { redirect } from "next/navigation";

export default function LegacyTermsRedirect() {
  redirect("/en/terms-of-use");
}

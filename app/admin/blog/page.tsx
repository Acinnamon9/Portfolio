import type { Metadata } from "next";
import BlogEditor from "../../../components/blog/BlogEditor";

export const metadata: Metadata = {
  title: "Blog Editor | Abhijeet Singh",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BlogEditorPage() {
  return <BlogEditor />;
}

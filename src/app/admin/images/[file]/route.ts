import { getImageResponse } from "@/lib/image";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;
  if (!file) {
    return new Response("Missing file parameter", { status: 400 });
  }

  const id = file.split(".")[0]
  const response = await getImageResponse(id)
  return response
}

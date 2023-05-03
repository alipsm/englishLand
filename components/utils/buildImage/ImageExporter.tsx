import Image from "next/image"
import { imageType } from "./imageType"

export default function ImageExporter(data:imageType) {
  return (
    <Image
      loader={data.loader}
      src={data.src}
      alt={data.alt}
      width={data.width||500}
      height={data.height||500}
      // {...props}
    />
    )
}

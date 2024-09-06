import { setCmContent } from "./setCmContent";

export async function setExample(ex) {
    let response = await fetch("examples/" + ex + ".js");
    let sketchContent = await response.text();
    setCmContent(sketchContent);
  }
import type { PageServerLoad } from "./$types";

export const ssr = false;

export const load: PageServerLoad = async () => {
  const imgSources = import.meta.glob("/static/images/*.jpg")
  const sourceList: string[] = []
  Object.keys(imgSources).forEach(imgSrc => {
    sourceList.push(imgSrc.replace(/^\/static/g, ""))
  })
  const sortedSourceList = sourceList.sort((file1, file2) => {
    const number1 = (file1.match(/\d+/g) ?? ["0"])[0];
    const number2 = (file2.match(/\d+/g) ?? ["0"])[0];
    return parseInt(number1) - parseInt(number2)
  })
  // console.log(sourceList)
  return {sourceList: sortedSourceList}
};
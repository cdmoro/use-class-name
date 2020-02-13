import { useEffect, useState } from "react";

const isObject = (a: any): boolean => !!a && a.constructor === Object;

const getClassesFromObject = (obj: object): string => {
  return Object.keys(obj)
    .filter(keyObj => obj[keyObj])
    .filter(Boolean)
    .join(" ")
    .trim();
};

const parseItem = (item: any): string => {
  if (Array.isArray(item)) {
    return item
      .filter(Boolean)
      .map((el: any) => parseItem(el))
      .join(' ')
      .trim()
  }
  else if (isObject(item)) {
    return getClassesFromObject(item as object);
  } else if (typeof item === "string") {
    return item;
  } else {
    return '';
  }
}

const useClassName = (...classesObj: Array<any>): string => {
  const [classes, setClasses] = useState<string>('');

  useEffect(() => {
    setClasses(
      parseItem(classesObj)
    )
  }, [classesObj]);

  return classes;
};

export { useClassName };


// if (Array.isArray(classesObj)) {
    //   setClasses(
    //     classesObj
    //       .map(item => {
    //         if (isObject(item)) {
    //           return getClassesFromObject(item as object);
    //         } else if (typeof item === "string") {
    //           return item;
    //         } else {
    //           return "";
    //         }
    //       })
    //       .join(" ")
    //       .trim()
    //   );
    // } else if (isObject(classesObj)) {
    //   setClasses(getClassesFromObject(classesObj));
    // } else setClasses("");
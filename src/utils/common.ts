function trimStartBy(target: string, seperator: string): string {
  let index = target.indexOf(seperator);
  while (index == 0) {
    target = target.substring(1);
    index = target.indexOf(seperator);
  }
  return target;
}

function getTimestamp(): string {
  return Date.now().toString();
}

/** 查找 */
function find(
  source: Array<Record<string, any>>,
  compareFunc: (item: Record<string, any>) => boolean,
  subArrayPropertyName: string = "children"
): Record<string, any> | null {
  if (!source || source.length < 1) {
    return null;
  }
  for (let index = 0; index < source.length; index++) {
    const item = source[index];
    if (compareFunc(item)) {
      return item;
    }
    if (item[subArrayPropertyName] && item[subArrayPropertyName].length > 0) {
      const tmp = find(
        item[subArrayPropertyName],
        compareFunc,
        subArrayPropertyName
      );
      if (tmp) {
        return tmp;
      }
      continue;
    }
  }
  return null;
}

export { trimStartBy, getTimestamp, find };

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

/** 查找, 并返回子项对应所有上级 */
function findWithTrace(
  source: Array<Record<string, any>>,
  compareFunc: (item: Record<string, any>) => boolean,
  traces?: Array<Record<string, any>>,
  subArrayPropertyName: string = "children"
): { result: Record<string, any>; traces?: Array<Record<string, any>> } | null {
  if (!source || source.length < 1) {
    return null;
  }
  console.log("1==>", source, traces);
  let _traces = traces ?? [];
  for (let index = 0; index < source.length; index++) {
    const item = source[index];
    console.log("2,item==>", item);

    if (compareFunc(item)) {
      console.log("FINISH==>", item);

      return { result: item, traces: _traces };
    }
    console.log(
      "3,continue==> item[subArrayPropertyName]:",
      item[subArrayPropertyName]
    );

    if (item[subArrayPropertyName] && item[subArrayPropertyName].length > 0) {
      console.log("item", item._traces);
      _traces?.push(item);

      console.log("4.====> _traces", _traces);
      const tmp = findWithTrace(
        item[subArrayPropertyName],
        compareFunc,
        _traces,
        subArrayPropertyName
      );
      console.log("5.====> tmp", tmp);
      if (tmp?.result) {
        console.log("6.====> tmp.result", tmp.result);
        _traces.push(tmp.result);
        console.log("7.====> FINISH", tmp);
        return { result: tmp.result, traces: _traces };
      }
      if (
        !item[subArrayPropertyName] ||
        item[subArrayPropertyName].length < 1
      ) {
        console.log("8.====> clear", item);
        _traces = [];
      }
      console.log("continue");
      continue;
    } else {
      console.log("found nothing, []");
      _traces = [];
    }
  }
  return null;
}

export { trimStartBy, getTimestamp, find, findWithTrace };

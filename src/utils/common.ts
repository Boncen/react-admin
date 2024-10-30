function trimStartBy(target: string, seperator: string): string {
  let index = target.indexOf(seperator);
  while (index == 0) {
    target = target.substring(1);
    index = target.indexOf(seperator);
  }
  return target;
}

export { trimStartBy };
